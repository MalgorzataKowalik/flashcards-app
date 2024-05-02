import Input from "../UI/Input/Input";
import StyledButton from "../UI/Button/StyledButton";
import styles from './LoginForm.module.css'
import { useEffect, useState } from "react";
import { Link, Form, useActionData } from "react-router-dom";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('')
  const actionData = useActionData('/login')

  useEffect(() => {
    if (actionData && actionData.message) {
      setErrorMessage(actionData.message)
    }
  }, [actionData])


  function changeLoginHandler(event) {
    setErrorMessage('')
  }

  function changePasswordHandler(event) {
    setErrorMessage('')
  }

  return (
    <Form className={styles.form} method='post'>
      <h2>Login</h2>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <div>
        <Input
          id="login"
          name="login"
          type="text"
          label="Login"
          isValid={true}
          onChange={changeLoginHandler}
          required/>
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          isValid={true}
          onChange={changePasswordHandler}
          required/>
      </div>

      <StyledButton>Login</StyledButton>
      <p className={styles["create-account"]}>
        <span>New to flashcards?</span>
        <Link to="/create-account">Create an account.</Link>
      </p>
      
    </Form>
  );
}