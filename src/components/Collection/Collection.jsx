import styles from './Collection.module.css'

const Collection = ({collection}) => {
  return (
    <article className={styles.collection}>
      <p>{collection.title}</p>
    </article>
  )
}

export default Collection