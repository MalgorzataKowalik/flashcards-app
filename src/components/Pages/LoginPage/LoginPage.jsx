import { json, redirect } from "react-router-dom";
import { ROUTES, baseUrl } from "../../../utils/consts";
import LoginForm from "../../LoginForm/LoginForm";
import { authActions } from "../../../store/auth-slice";

export default function LoginPage() {
  return (
    <LoginForm/>
  );
}

export const action = (dispatch) => async function ({request}) {
  const formData = await request.formData();
  const enteredLogin = formData.get('login')
  const enteredPassword = formData.get('password')

  const response = await fetch(baseUrl + `users/existing-users/${enteredLogin}.json`)
  
  if (!response.ok) {
    throw new Error('Something went wrong. Please try again later.')
  }

  const resData = await response.json()

  if (resData && resData.password === enteredPassword) {

    dispatch(authActions.setLoggedIn({
      name: resData.name,
      collections: resData.collections || []
    }))

    localStorage.setItem('user', resData.name)
    return redirect(ROUTES.HOME)

  } else {
    return json({ message: 'Invalid login or password' })
  }
}