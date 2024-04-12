import { useDispatch } from 'react-redux'
import Button from '../Button/Button'
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
      <Button onClick={backHandler}>{'<'}  Back to collections</Button>
    </section>
  )
}

export default SectionWithBack