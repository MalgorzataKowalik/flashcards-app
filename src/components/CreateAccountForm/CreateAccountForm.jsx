import Input from "../UI/Input/Input";
import StyledButton from "../UI/Button/StyledButton";
import styles from './CreateAccountForm.module.css'
import useInput from "../../utils/hooks/useInput";
import { getInvalidNameError, getInvalidPasswordError } from "../../utils/validation";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

export default function CreateAccountForm({existingNames}) {
  const {enteredValue: enteredName, valueIsValid: nameIsValid, errorMessage: nameErrorMessage, changeHandler: nameChangeHandler, blurHandler: nameBlurHandler} = useInput('', (value) => getInvalidNameError(value, existingNames))
  const {enteredValue: enteredPassword, valueIsValid: passwordIsValid, errorMessage: passwordErrorMessage, changeHandler: passwordChangeHandler, blurHandler: passwordBlurHandler} = useInput('', (value) => getInvalidPasswordError(value))
  const [enteredConfirmation, setEnteredConfirmation] = useState('')
  const [confirmationIsValid, setConfirmationIsValid] = useState(true)
  const actionData = useActionData('/create-account')
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  useEffect(confirmationBlurHandler, [enteredPassword])

  useEffect(() => {
    if (actionData && actionData.invalidInputs) {
      nameBlurHandler(enteredName)
      passwordBlurHandler(enteredPassword)
      confirmationBlurHandler()
    }
  }, [actionData])

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

  return (
    <Form className={styles.form} method="post">
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

      <StyledButton>{isSubmitting ? 'Submitting...' : 'Create Account'}</StyledButton>
    </Form>
  );
}
