import { useRouteError } from "react-router-dom";
import Header from "../../Header/Header";
import styles from "./ErrorPage.module.css"

export default function ErrorPage() {
  const error = useRouteError()

  let message = 'An error occurred!';
  let errorCode = 'unknown'

  if (error.error && error.error.message) {
    message = error.error.message;
  }

  if (error.status) {
    errorCode = error.status;
  }

  return (
    <>
      <Header/>
      <main className={styles.content}>
        <h3>{message}</h3>
        <p>{errorCode}</p>
      </main>
    </>
  )
}