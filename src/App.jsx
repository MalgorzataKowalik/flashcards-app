import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/Pages/HomePage/HomePage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";


function App() {
  const router = createBrowserRouter([
    {path: '/', element: <HomePage/>},
    {path: '/login', element: <LoginPage/>}
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
