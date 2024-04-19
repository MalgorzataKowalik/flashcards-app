import { useSelector } from 'react-redux'
import styles from './UsersCollectionsSection.module.css'

export default function UsersCollectionsSection() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <section className={styles.section}>
      <h3>YOUR COLLECTIONS</h3>
      {isLoggedIn ? <p>Collections</p> : <p>Log in to add your own collections</p>}
    </section>
  )
}