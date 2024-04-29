import { RouterProvider, createHashRouter } from "react-router-dom";
import HomePage from "./components/Pages/HomePage/HomePage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import CreateAccountPage from "./components/Pages/CreateAccountPage/CreateAccountPage";
import NewCollectionPage from "./components/Pages/NewCollectionPage/NewCollectionPage";
import { ROUTES, baseUrl } from "./utils/consts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";
import RootLayout from "./components/Pages/RootLayout/RootLayout";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('checking local storage')
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
      children: [
        {index: true, element: <HomePage/>},
        {path: ROUTES.LOGIN, element: <LoginPage/>},
        {path: ROUTES.CREATE_ACCOUNT, element: <CreateAccountPage/>},
        {path: ROUTES.NEW_COLLECTION, element: <NewCollectionPage/>}
      ]
    },
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;

