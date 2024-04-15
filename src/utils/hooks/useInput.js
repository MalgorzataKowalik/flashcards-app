import { useState } from "react"

export default function useInput(defaultValue, validatorFunction) {
  const [enteredValue, setEnteredValue] = useState(defaultValue)
  const [valueIsValid, setValueIsValid] = useState(true)

  function changeHandler(event) {
    setEnteredValue(event.target.value)
    setValueIsValid(true)
  }

  function blurHandler() {
    setValueIsValid(validatorFunction(enteredValue))
  }

  return {
    enteredValue,
    valueIsValid,
    changeHandler,
    blurHandler
  }
}