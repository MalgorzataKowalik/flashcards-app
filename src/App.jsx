import { RouterProvider, createHashRouter } from "react-router-dom";
import HomePage from "./components/Pages/HomePage/HomePage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import CreateAccountPage, { existingNamesLoader } from "./components/Pages/CreateAccountPage/CreateAccountPage";
import NewCollectionPage from "./components/Pages/NewCollectionPage/NewCollectionPage";
import { ROUTES, baseUrl } from "./utils/consts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";
import RootLayout from "./components/Pages/RootLayout/RootLayout";
import ErrorPage from "./components/Pages/ErrorPage/ErrorPage";
import { action as loginAction } from './components/Pages/LoginPage/LoginPage'


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      getUser(user)
    }
  }, [])

  async function getUser(userName) {
    const response = await fetch(baseUrl + `users/existing-users/${userName}.json`)
    if (!response.ok) {
      return
    }
    const data = await response.json()
    if (data) {
      dispatch(authActions.setLoggedIn({
        name: data.name,
        collections: data.collections || []
      }))
    }
  }

  const router = createHashRouter([
    {
      path: ROUTES.HOME,
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {index: true, element: <HomePage/>},
        {path: ROUTES.LOGIN, element: <LoginPage/>, action: loginAction(dispatch)},
        {path: ROUTES.CREATE_ACCOUNT, element: <CreateAccountPage/>, loader: existingNamesLoader},
        {path: ROUTES.NEW_COLLECTION, element: <NewCollectionPage/>}
      ]
    },
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;

