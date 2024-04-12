import { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './Card.module.css'
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Card = () => {
  const selectedCollection = useSelector(state => state.stage.selectedCollection)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [cardState, setCardState] = useState('question')
  const [result, setResult] = useState(0)

  const currentCard = selectedCollection.cards[currentCardIndex]
  const counterText = `${(currentCardIndex + 1)} / ${selectedCollection.cards.length}`

  const clickQuestionHandler = () => {
    setCardState('answer')
  }

  const clickAnswerHandler = (isCorrect) => {
    if (currentCardIndex + 1 < selectedCollection.cards.length) {
      isCorrect && setResult(prev => prev + 1)
      setCurrentCardIndex(prev => prev + 1)
      setCardState('question')
    } else {
      //set results stage
    }
  }

  let content = (
    <div onClick={clickQuestionHandler} className={styles.question}>
      <p>{counterText}</p>
      <h3>{currentCard.question}</h3>
      <p>Click to show the answer.</p>
    </div>
  )

  if (cardState === 'answer') {
    content = (
      <div>
        <p>{counterText}</p>
        <h3>{currentCard.answer}</h3>
        <p className={styles['answer-check']}>
          <span>Did you know the answer?</span>
          <span className={styles.icons}>
            <FaCheckCircle className={styles.green} onClick={() => clickAnswerHandler(true)}/>
            <FaTimesCircle className={styles.red} onClick={() => clickAnswerHandler(false)}/>
          </span>
        </p>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      {content}
    </div>
  )
}

export default Card