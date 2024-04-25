import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/Pages/HomePage/HomePage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import CreateAccountPage from "./components/Pages/CreateAccountPage/CreateAccountPage";
import NewCollectionPage from "./components/Pages/NewCollectionPage/NewCollectionPage";
import { baseUrl } from "./utils/consts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";


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

  const router = createBrowserRouter([
    {path: '/flashcards-app/', element: <HomePage/>},
    {path: '/flashcards-app/login', element: <LoginPage/>},
    {path: '/flashcards-app/create-account', element: <CreateAccountPage/>},
    {path: '/flashcards-app/new-collection', element: <NewCollectionPage/>}
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;

