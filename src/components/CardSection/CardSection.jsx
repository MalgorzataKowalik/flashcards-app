import { useDispatch, useSelector } from 'react-redux'
import Card from '../Card/Card'
import Button from '../UI/Button/Button'
import styles from './CardSection.module.css'
import { stageActions } from '../../store/stage-slice'

const CardSection = () => {
  const dispatch = useDispatch()
  const selectedCollection = useSelector(state => state.stage.selectedCollection)

  const backHandler = () => {
    dispatch(stageActions.setDefaultStage())
  }

  return (
    <section className={styles.section}>
      {(selectedCollection.cards && selectedCollection.cards.length > 0) ? <Card/> : <p>This collection is empty.</p>}
      <Button onClick={backHandler}>{'<'}  Back to collections</Button>
    </section>
  )
}

export default CardSection