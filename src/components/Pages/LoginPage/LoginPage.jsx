import Header from "../../Header/Header";
import Input from "../../UI/Input/Input";
import StyledButton from "../../UI/Button/StyledButton";
import styles from './LoginPage.module.css'
import { useState } from "react";
import { Link } from "react-router-dom";

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
    //TODO: send login requst
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
          required/>
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          isValid={true}
          onChange={changePasswordHandler}
          value={enteredPassword}
          required/>
        </div>

        <StyledButton>Login</StyledButton>
        <p className={styles["create-account"]}>
          <span>New to flashcards?</span>
          <Link to="/flashcards-app/create-account">Create an account.</Link>
        </p>
        
      </form>
    </>
  );
}

export default LoginPage