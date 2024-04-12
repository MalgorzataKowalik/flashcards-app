import Collection from '../Collection/Collection'
import styles from './DefaultCollectionsSection.module.css'

const DefaultCollectionsSection = ({status, collections}) => {
  let renderableResult = (
    <ul>
      {collections.map(item => <Collection key={item.id} collection={item}/>)}
    </ul>
  )

  if (status === 'loading') {
    renderableResult = <p>Loading collections...</p>
  } else if (status === 'error') {
    renderableResult = <p className={styles.error}>Fetching default collections failed.</p>
  }

  return (
    <section className={styles.section}>
      <p>Pick collection to start</p>
      {renderableResult}
    </section>
  )
}

export default DefaultCollectionsSection