import Header from "../../Header/Header";
import Input from "../../UI/Input/Input";
import StyledButton from "../../UI/Button/StyledButton";
import Modal from "../../UI/Modal/Modal";
import styles from './CreateAccountPage.module.css'
import { ROUTES, baseUrl } from "../../../utils/consts";
import useInput from "../../../utils/hooks/useInput";
import { getInvalidNameError, getInvalidPasswordError, isNotEmptyString } from "../../../utils/validation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";

const passwordError = (
  <>
    <span>Password must</span>
    <span>• be 8 to 15 characters long,</span>
    <span>• contain no spaces,</span>
    <span>• contain at least one lowercase letter and at least one uppercase letter,</span>
    <span>• contain at least one number,</span>
    <span>• contain at least one special character.</span>
  </>
)


function CreateAccountPage() {
  const dispatch = useDispatch()
  const [existingNames, setExistingNames] = useState([])
  const {enteredValue: enteredName, valueIsValid: nameIsValid, errorMessage: nameErrorMessage, changeHandler: nameChangeHandler, blurHandler: nameBlurHandler} = useInput('', (value) => getInvalidNameError(value, existingNames))
  const {enteredValue: enteredPassword, valueIsValid: passwordIsValid, errorMessage: passwordErrorMessage, changeHandler: passwordChangeHandler, blurHandler: passwordBlurHandler} = useInput('', (value) => getInvalidPasswordError(value, passwordError))
  const [enteredConfirmation, setEnteredConfirmation] = useState('')
  const [confirmationIsValid, setConfirmationIsValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)


  function confirmationChangeHandler(event) {
    setEnteredConfirmation(event.target.value)
    setConfirmationIsValid(true)
  }

  function confirmationBlurHandler() {
    if (enteredConfirmation.length > 0 && enteredPassword.length > 0) {
      const val = enteredConfirmation === enteredPassword
      setConfirmationIsValid(val)
    }
  }

  function checkAllInputs() {
    const nameOk = !isNotEmptyString(getInvalidNameError(enteredName, existingNames))
    const passwordOk = !isNotEmptyString(getInvalidPasswordError(enteredPassword, passwordError))
    const confirmationOk = (enteredPassword === enteredConfirmation)
    nameBlurHandler(enteredName)
    passwordBlurHandler(enteredPassword)
    confirmationBlurHandler()

    if (nameOk && passwordOk && confirmationOk) {
      return true
    } else {
      return false
    }
  }

  useEffect(confirmationBlurHandler, [enteredPassword])

  useEffect(() => {
    async function fetchNames() {
      try {
        const response = await fetch(baseUrl + 'users/existing-users.json')

        if (!response.ok) {
          throw new Error('Something went wrong. Please try again later.')
        }

        const resData = await response.json()
        const names = []
        for (const name in resData) {
          names.push(name)
        }
        setExistingNames(names)
      } catch(error) {
        setExistingNames(null)
      }
    }

    fetchNames()
  }, [])


  function submitHandler(event) {
    event.preventDefault()

    if (checkAllInputs()) {
      setIsLoading(true)
      setIsDialogOpen(true)
      
      async function sendRequest() {
        try {
          const response = await fetch(baseUrl + `users/existing-users/${enteredName}.json`, {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "name": enteredName,
              "password": enteredPassword
            })
          })
          if (!response.ok) {
            throw new Error('Something went wrong. Please try again later.')
          }

          setIsLoading(false)

        } catch(error) {
          setIsLoading(false)
          setIsError(true)
        }
      }

      sendRequest()
    }
  }

  function closeModalHandler(event) {
    if (isLoading) {
      event.preventDefault()
      return
    }

    if (!isError) {
      dispatch(authActions.setLoggedIn({
        name: enteredName,
        collections: []
      }))

      localStorage.setItem('user', enteredName)
    }

    setIsLoading(false)
    setIsError(false)
    setIsDialogOpen(false)
  }


  let modalContent = <p>Hello {enteredName}! Your account has been created.</p>
  if (isError) {
    modalContent = <p className={styles.error}>Error occured, please try again later.</p>
  } else if (isLoading) {
    modalContent = <p>Loading...</p>  
  }


  return (
    <>
      <Modal open={isDialogOpen} onCancel={closeModalHandler}>
        {modalContent}
        <StyledButton as={Link} to={ROUTES.HOME} isDark={true} onClick={closeModalHandler} disabled={isLoading}>
          OK
        </StyledButton>
      </Modal>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2>Create Account</h2>
        <div className={styles.wrapper}>
        <Input
          id="login"
          name="login"
          type="text"
          label="Login"
          isValid={nameIsValid}
          onChange={nameChangeHandler}
          value={enteredName}
          onBlur={nameBlurHandler}
          required
          errorText={nameErrorMessage}/>
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          value={enteredPassword}
          onBlur={passwordBlurHandler}
          required
          errorText={passwordErrorMessage}/>
        <Input
          id="confirm-password"
          name="confirm-password"
          type="password"
          label="Confirm Password"
          isValid={confirmationIsValid}
          onChange={confirmationChangeHandler}
          value={enteredConfirmation}
          onBlur={confirmationBlurHandler}
          required
          errorText='Passwords do not match.'/>
        </div>

        <StyledButton>Create Account</StyledButton>
      </form>
    </>
  );
}

export default CreateAccountPage