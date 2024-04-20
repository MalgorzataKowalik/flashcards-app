import { useSelector } from 'react-redux'
import styles from './UsersCollectionsSection.module.css'
import { Link } from 'react-router-dom'

export default function UsersCollectionsSection() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <section className={styles.section}>
      <h3>YOUR COLLECTIONS</h3>
      {isLoggedIn ? <p>Collections</p> : <p><Link to="/flashcards-app/login">Log in</Link> to add your own collections</p>}
    </section>
  )
}