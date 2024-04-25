import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from './Card.module.css'
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { stageActions } from '../../store/stage-slice';

const Card = () => {
  const dispatch = useDispatch()
  const selectedCollection = useSelector(state => state.stage.selectedCollection)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [cardState, setCardState] = useState('question')
  const [score, setScore] = useState(0)
  const [wrongAnswersCollection, setWrongAnswersCollection] = useState({
    id: 'temp',
    title: 'Wrong answers',
    cards: []
  })

  if (!selectedCollection.cards) {
    return <p>This collection does't containany flashcard</p>
  }

  useEffect(() => {
    if (currentCardIndex === selectedCollection.cards.length) {
      dispatch(stageActions.setResultStage({
        score: score,
        totalNumber: selectedCollection.cards.length,
        wrongAnswers: wrongAnswersCollection
      }))
    }
  }, [currentCardIndex])

  if (currentCardIndex === selectedCollection.cards.length) {
    return
  }

  const currentCard = selectedCollection.cards[currentCardIndex]
  const counterText = `${(currentCardIndex + 1)} / ${selectedCollection.cards.length}`

  const clickQuestionHandler = () => {
    setCardState('answer')
  }

  const clickAnswerHandler = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 1)
    } else {
      setWrongAnswersCollection(prev => {
        return {
          ...prev,
          cards: [
            ...prev.cards,
            currentCard
          ]
        }
      })
    }
    
      setCardState('question')
      setCurrentCardIndex(prev => prev + 1)
  }

  let content = (
    <div onClick={clickQuestionHandler} className={styles.question}>
      <p className={styles.counter}>
        <span>{counterText}</span>
        <span>QUESTION:</span>
      </p>
      <h3>{currentCard.question}</h3>
      <p>Click to show the answer.</p>
    </div>
  )

  if (cardState === 'answer') {
    content = (
      <div>
        <p className={styles.counter}>
          <span>{counterText}</span>
          <span>ANSWER:</span>
        </p>
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