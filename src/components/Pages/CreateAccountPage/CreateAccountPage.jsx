import Header from "../../Header/Header";
import Input from "../../UI/Input/Input";
import StyledButton from "../../UI/Button/StyledButton";
import styles from './CreateAccountPage.module.css'
import { baseUrl } from "../../../utils/consts";
import useInput from "../../../utils/hooks/useInput";
import { getInvalidNameError, getInvalidPasswordError } from "../../../utils/validation";
import { useEffect, useState } from "react";

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
  const [existingNames, setExistingNames] = useState([])
  const {enteredValue: enteredName, valueIsValid: nameIsValid, errorMessage: nameErrorMessage, changeHandler: nameChangeHandler, blurHandler: nameBlurHandler} = useInput('', (value) => getInvalidNameError(value, existingNames))
  const {enteredValue: enteredPassword, valueIsValid: passwordIsValid, errorMessage: passwordErrorMessage, changeHandler: passwordChangeHandler, blurHandler: passwordBlurHandler} = useInput('', (value) => getInvalidPasswordError(value, passwordError))
  const [enteredConfirmation, setEnteredConfirmation] = useState('')
  const [confirmationIsValid, setConfirmationIsValid] = useState(true)
  const [isLoading, setIsLoadin] = useState(false)
  const [isError, setIsError] = useState(false)


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
    nameBlurHandler(enteredName)
    passwordBlurHandler(enteredPassword)
    confirmationBlurHandler()

    if (nameIsValid && passwordIsValid && confirmationIsValid) {
      console.log('inputs ok')
      return true
    } else {
      console.log('inputs invalid', nameIsValid, passwordIsValid, confirmationIsValid)
      return false
    }
  }

  useEffect(confirmationBlurHandler, [enteredPassword])

  useEffect(() => {
    async function fetchNames() {
      try {
        const response = await fetch(baseUrl + 'users/existing-users.json')

        if (!response.ok) {
          throw new Error('Can not fetch existing users')
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
      console.log("SEND REQUEST")
      
      async function sendRequest() {
        try {
          response = await fetch(baseUrl + `users/existing-users/${enteredName}.json`, {
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
            throw new Error('Can not post user')
          }

        } catch(error) {
          setIsError(true)
        }
      }

      sendRequest()
    }
  }

  return (
    <>
      <Header />
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