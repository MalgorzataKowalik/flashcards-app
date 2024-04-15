import { useDispatch } from 'react-redux'
import StyledButton from '../Button/StyledButton'
import styles from './SectionWithBack.module.css'
import { stageActions } from '../../../store/stage-slice'

const SectionWithBack = ({children}) => {
  const dispatch = useDispatch()

  const backHandler = () => {
    dispatch(stageActions.setDefaultStage())
  }

  return (
    <section className={styles.section}>
      {children}
      <StyledButton onClick={backHandler}>{'<'}  Back to collections</StyledButton>
    </section>
  )
}

export default SectionWithBack