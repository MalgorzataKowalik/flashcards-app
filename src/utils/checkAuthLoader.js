import { redirect } from "react-router-dom"
import { ROUTES } from "./consts"

export function checkAuthLoader() {
  const user = localStorage.getItem('user')
  if (!user) {
    return redirect(ROUTES.LOGIN)
  }
}