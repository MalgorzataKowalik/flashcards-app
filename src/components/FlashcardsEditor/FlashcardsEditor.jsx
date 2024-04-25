import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import StyledButton from '../UI/Button/StyledButton'
import Input from "../UI/Input/Input";
import CardInEditor from "../CardInEditor/CardInEditor";
import Modal from "../UI/Modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import styles from './FlashcardsEditor.module.css'
import { ROUTES, baseUrl } from "../../utils/consts";
import { authActions } from "../../store/auth-slice";

export default function FlashcardsEditor({collectionTitle, collectionId}) {
  const userName = useSelector(state => state.auth.userData.name)
  const collections = useSelector(state => state.auth.userData.collections)
  const [cards, setCards] = useState(() => {
    if (collections) {
      const selectedCollection = collections.find(col => col.id === collectionId)
      if (selectedCollection) {
        return selectedCollection.cards.reverse()
      } else {
        return []
      }
    } else {
      return []
    }
  })
  const [enteredQuestion, setEnteredQuestion] = useState('')
  const [enteredAnswer, setEnteredAnswer] = useState('')
  const [questionIsValid, setQuestionIsValid] = useState(true)
  const [answerIsValid, setAnswerIsValid] = useState(true)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function submitCardHandler(event) {
    event.preventDefault()
    
    if (!validateInputs()) {
      return
    }

    setCards(prevCards => {
      const id =  Math.floor(Math.random() * Math.random() * 10000)
      return [
        {
          id: id,
          question: enteredQuestion,
          answer: enteredAnswer
        },
        ...prevCards,
      ]
    })
    setEnteredQuestion('')
    setEnteredAnswer('')

  }

  function validateInputs() {
    const qIsValid = enteredQuestion.trim() !== ''
    const aIsValid = enteredAnswer.trim() !== ''
    setQuestionIsValid(qIsValid)
    setAnswerIsValid(aIsValid)
    return qIsValid && aIsValid
  }

  function saveChangesHandler() {
    const existingCollections = collections || []
    const newCollection = {
      "id": collectionId,
      "title": collectionTitle,
      "cards": cards.reverse()
    }
    const body = JSON.stringify([
        ...existingCollections,
        newCollection
      ])
    async function sendRequest() {
      try {
        const response = await fetch(baseUrl + `users/existing-users/${userName}/collections.json`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: body
        })

        if (!response.ok) {
          throw new Error('Can not post user')
        }

        dispatch(authActions.addCollection(newCollection))
        navigate(ROUTES.HOME)
      } catch(error) {
        setIsError(true)
      }
    }

    sendRequest()
  }

  function closeModalHandler() {
    setIsError(false)
  }

  return (
    <>
      <Modal open={isError} onCancel={closeModalHandler}>
        <p className={styles.error}>Error occured, please try again later.</p>
        <StyledButton as={Link} to={ROUTES.HOME} isDark={true} onClick={closeModalHandler}>
          OK
        </StyledButton>
      </Modal>
      <div className={styles.editor}>
        <form className={styles.form} onSubmit={submitCardHandler}>
          <h2>{collectionTitle}</h2>
          <div className={styles["input-wrapper"]}>
            <Input
              id="question"
              name="question"
              type="text"
              label="Question"
              value={enteredQuestion}
              isTextArea={true}
              onChange={event => setEnteredQuestion(event.target.value)}
              isValid={questionIsValid}
              maxLength="190" 
              required
              errorText='required'/>
            <Input
              id="answer"
              name="answer"
              type="text"
              label="Answer"
              value={enteredAnswer}
              isTextArea={true}
              onChange={event => setEnteredAnswer(event.target.value)}
              isValid={answerIsValid}
              maxLength="190"
              required
              errorText='required'/>
          </div>
          <div className={styles.actions}>
            <StyledButton>+ Add flashcard</StyledButton>
          </div>
        </form>
        <div className={styles.cards}>
          <h2>flashcards:</h2>
          <ul>
            {cards.map(card => <CardInEditor key={card.id} id={card.id} question={card.question} answer={card.answer}/>)}
          </ul>
          <StyledButton onClick={saveChangesHandler}>Save changes</StyledButton>
        </div>
      </div>
    </>
  )
}
