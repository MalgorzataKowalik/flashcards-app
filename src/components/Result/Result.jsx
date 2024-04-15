import { useDispatch, useSelector } from 'react-redux'
import styles from './Result.module.css'
import StyledButton from '../UI/Button/StyledButton'
import { stageActions } from '../../store/stage-slice'

const Result = () => {
  const dispatch = useDispatch()
  const stageResult = useSelector(state => state.stage.result)

  const tryAgainHandler = () => {
    dispatch(stageActions.setCardsStage(stageResult.wrongAnswers))
  }

  return (
    <div className={styles.result}>
      <p className={styles.score}>Score: {stageResult.score}/{stageResult.totalNumber}</p>
      {stageResult.score === stageResult.totalNumber ?
      <p className={styles.congratulations}>CONGRATULATIONS!</p> :
      <StyledButton onClick={tryAgainHandler}>Try again with the questions you got wrong</StyledButton>}
    </div>
  )
}

export default Result