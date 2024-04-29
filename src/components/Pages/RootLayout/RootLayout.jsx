import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../../Header/Header";
import styles from './RootLayout.module.css'
import { ROUTES } from "../../../utils/consts";

export default function RootLayout() {
  const {pathname} = useLocation()
  const isLoginPage = pathname === ROUTES.LOGIN

  return (
    <>
      <Header logoOnly={isLoginPage}/>
      <main className={styles.main}>
        <Outlet/>
      </main>
    </>
  )
}