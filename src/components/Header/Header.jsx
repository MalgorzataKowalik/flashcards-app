import styles from './Header.module.css'
import logo from '../../assets/logo.png'
import Button from '../UI/Button/Button'

const Header = () => {
  return (
    <header className={styles['main-header']}>
      <div id={styles.title}>
        <img src={logo} alt='app logo'/>
        <h1>flashcards app</h1>
      </div>

      <nav>
        <Button>Login</Button>
      </nav>
    </header>
  )
}

export default Header