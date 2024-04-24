import Header from "../../Header/Header";
import Input from "../../UI/Input/Input";
import StyledButton from "../../UI/Button/StyledButton";
import styles from './LoginPage.module.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/consts";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [enteredLogin, setEnteredLogin] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function changeLoginHandler(event) {
    setErrorMessage('')
    setEnteredLogin(event.target.value)
  }

  function changePasswordHandler(event) {
    setErrorMessage('')
    setEnteredPassword(event.target.value)
  }

  function submitHandler(event) {
    event.preventDefault()
    
    async function sendRequest() {
      try {
        const response = await fetch(baseUrl + `users/existing-users/${enteredLogin}.json`)

        if (!response.ok) {
          throw new Error('Can not log in')
        }
  
        const data = await response.json()
        if (data && data.password === enteredPassword) {
          dispatch(authActions.setLoggedIn({
            name: data.name,
            collections: data.collections || []
          }))

          navigate('/flashcards-app/')
        }
        if (!data) {
          setErrorMessage('Invalid login or password')
        }
  
        
      } catch(error) {
        setErrorMessage(error.message)
      }
    }

    sendRequest()
  }

  return (
    <>
      <Header logoOnly={true}/>
      <form className={styles.form} onSubmit={submitHandler}>
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
            value={enteredLogin}
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