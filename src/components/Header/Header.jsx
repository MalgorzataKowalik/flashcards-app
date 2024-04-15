import styles from './Header.module.css'
import logo from '../../assets/logo.png'
import StyledButton from '../UI/Button/StyledButton'
import { Link } from 'react-router-dom'

const Header = ({logoOnly}) => {
  return (
    <header className={styles['main-header']}>
      <Link to='/' id={styles.title}>
        <img src={logo} alt='app logo'/>
        <h1>flashcards app</h1>
      </Link>

      {!logoOnly && <nav>
        <StyledButton as={Link} to='/login'>Login</StyledButton>
      </nav>}
    </header>
  )
}

export default Header