import Header from "../../Header/Header";
import Input from "../../UI/Input/Input";
import StyledButton from "../../UI/Button/StyledButton";
import styles from './LoginPage.module.css'
import useInput from "../../../utils/hooks/useInput";
import { isNotEmptyString } from "../../../utils/validation";
import { useState } from "react";

function LoginPage() {
  const [eneteredLogin, setEnteredLogin] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')

  function changeLoginHandler(event) {
    setEnteredLogin(event.target.value)
  }

  function changePasswordHandler(event) {
    setEnteredPassword(event.target.value)
  }

  function submitHandler(event) {
    event.preventDefault()
    //TODO: send logi requst
  }

  return (
    <>
      <Header logoOnly={true}/>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2>Login</h2>
        <div className={styles.wrapper}>
        <Input
          id="login"
          name="login"
          type="text"
          label="Login"
          isValid={true}
          onChange={changeLoginHandler}
          value={eneteredLogin}
          required
          errorText="Please enter a valid email address"/>
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          isValid={true}
          onChange={changePasswordHandler}
          value={enteredPassword}
          required
          errorText="Please enter a valid password"/>
        </div>

        <StyledButton>Login</StyledButton>
        <p>New to flashcards? Create an account.</p>
      </form>
    </>
  );
}

export default LoginPage