import { useDispatch } from 'react-redux'
import styles from './Collection.module.css'
import { stageActions } from '../../store/stage-slice'

const Collection = ({collection}) => {
  const dispatch = useDispatch()
  const selectCollectionHandler = () => {
    dispatch(stageActions.setCardsStage(collection))
  }

  return (
    <article className={styles.collection} onClick={selectCollectionHandler}>
      <p>{collection.title}</p>
    </article>
  )
}

export default Collection