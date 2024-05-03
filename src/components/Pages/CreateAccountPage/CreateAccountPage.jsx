import Modal from "../../UI/Modal/Modal";
import StyledButton from "../../UI/Button/StyledButton";
import styles from './CreateAccountPage.module.css'
import { ROUTES, baseUrl } from "../../../utils/consts";
import { getInvalidNameError, getInvalidPasswordError, isNotEmptyString } from "../../../utils/validation";
import { useEffect, useState } from "react";
import { json, useActionData, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";
import CreateAccountForm from "../../CreateAccountForm/CreateAccountForm";


export default function CreateAccountPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [enteredName, setEnteredName] = useState('')
  const [isError, setIsError] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const loaderData = useLoaderData()
  const existingNames = (loaderData && loaderData.names) || []
  const actionData = useActionData()

  useEffect(() => {
    if (actionData && (actionData.enteredName || actionData.message)) {
      setIsDialogOpen(true)
      if (actionData.enteredName) {
        setEnteredName(actionData.enteredName)
      } else if (actionData.message) {
        setIsError(actionData.message)
      }
    }
  }, [actionData])


  function closeModalHandler(event) {
    if (!isError) {
      dispatch(authActions.setLoggedIn({
        name: enteredName,
        collections: []
      }))

      localStorage.setItem('user', enteredName)
    }

    setIsError(false)
    setIsDialogOpen(false)
    navigate(ROUTES.HOME)
  }

  let modalContent = <p>Hello {enteredName}! Your account has been created.</p>
  if (isError) {
    modalContent = <p className={styles.error}>Error occured, please try again later.</p>
  }


  return (
    <>
      <Modal open={isDialogOpen} onCancel={closeModalHandler}>
        {modalContent}
        <StyledButton isDark={true} onClick={closeModalHandler}>
          OK
        </StyledButton>
      </Modal>
      <CreateAccountForm existingNames={existingNames}/>
    </>
  );
}

export async function existingNamesLoader() {
  const response = await fetch(baseUrl + 'users/existing-users.json')

  if (!response.ok) {
    throw new Error('Something went wrong. Please try again later.')
  }

  const resData = await response.json()
  const names = []
  for (const name in resData) {
    names.push(name)
  }

  return json({
    names: names
  })
}

export async function action({request}) {
  const formData = await request.formData();
  const enteredLogin = formData.get('login')
  const enteredPassword = formData.get('password')
  const enteredConfirmation = formData.get('confirm-password')

  const response = await fetch(baseUrl + 'users/existing-users.json')

  if (!response.ok) {
    return json({ message: 'Something went wrong. Please try again later.' })
  }

  const resData = await response.json()
  const names = []
  for (const name in resData) {
    names.push(name)
  }

  const data = {
    enteredName: enteredLogin,
    enteredPassword: enteredPassword,
    enteredConfirmation: enteredConfirmation,
    existingNames: names
  }

  if (checkAllInputs(data)) {
    const response = await fetch(baseUrl + `users/existing-users/${enteredLogin}.json`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": enteredLogin,
        "password": enteredPassword
      })
    })
    if (!response.ok) {
      return json({ message: 'Something went wrong. Please try again later.' })
    }
    return json({ enteredName: enteredLogin })
  } else {
    return json({ invalidInputs: true })
  }
}

function checkAllInputs(data) {
  const nameOk = !isNotEmptyString(getInvalidNameError(data.enteredName, data.existingNames))
  const passwordOk = !isNotEmptyString(getInvalidPasswordError(data.enteredPassword))
  const confirmationOk = (data.enteredPassword === data.enteredConfirmation)

  if (nameOk && passwordOk && confirmationOk) {
    return true
  } else {
    return false
  }
}