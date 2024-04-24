import { useSelector } from 'react-redux'
import styles from './UsersCollectionsSection.module.css'
import { Link } from 'react-router-dom'
import Collection from '../Collection/Collection'
import StyledButton from '../UI/Button/StyledButton'

export default function UsersCollectionsSection() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const collections = useSelector(state => state.auth.userData.collections)

  let content = <p><Link to="/flashcards-app/login">Log in</Link> to add your own collections</p>
  if (isLoggedIn) {
    collections ?
    content = (
      <ul>
        {collections.map(item => <Collection key={item.id} collection={item}/>)}
      </ul>
    ) :
    content = <p>You don't have any collection yet.</p>
  }

  return (
    <section className={styles.section}>
      <h3>YOUR COLLECTIONS</h3>
      {content}
      {isLoggedIn && <StyledButton as={Link} to={`/flashcards-app/${isLoggedIn ? 'new-collection' : 'login'}`}>+ Add collection</StyledButton>}
    </section>
  )
}