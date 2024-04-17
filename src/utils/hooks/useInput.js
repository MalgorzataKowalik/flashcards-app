import { useEffect, useState } from "react"
import { isNotEmptyString } from "../validation"

export default function useInput(defaultValue, validatorFunction) {
  const [enteredValue, setEnteredValue] = useState(defaultValue)
  const [valueIsValid, setValueIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  function changeHandler(event) {
    setEnteredValue(event.target.value)
    setErrorMessage('')
  }

  function blurHandler() {
    setErrorMessage(validatorFunction(enteredValue))
  }

  useEffect(() => {
    setValueIsValid(!isNotEmptyString(errorMessage))
  }, [errorMessage])

  return {
    enteredValue,
    valueIsValid,
    errorMessage,
    changeHandler,
    blurHandler
  }
}