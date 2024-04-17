import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/Pages/HomePage/HomePage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import CreateAccountPage from "./components/Pages/CreateAccountPage/CreateAccountPage";


function App() {
  const router = createBrowserRouter([
    {path: '/flashcards-app/', element: <HomePage/>},
    {path: '/flashcards-app/login', element: <LoginPage/>},
    {path: '/flashcards-app/create-account', element: <CreateAccountPage/>}
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;

