import styles from './Header.module.css'
import logo from '../../assets/logo.png'
import StyledButton from '../UI/Button/StyledButton'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth-slice'
import { ROUTES } from '../../utils/consts'

const Header = ({logoOnly}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  function logoutHandler() {
    dispatch(authActions.setLoggedOut())

    localStorage.removeItem('user')
  }

  return (
    <header className={styles['main-header']}>
      <Link to={ROUTES.HOME} id={styles.title}>
        <img src={logo} alt='app logo'/>
        <h1>flashcards app</h1>
      </Link>

      {!logoOnly && <nav>
        {isLoggedIn ? 
        <StyledButton as={Link} to={ROUTES.HOME} onClick={logoutHandler}>Logout</StyledButton> :
        <StyledButton as={Link} to={ROUTES.LOGIN}>Login</StyledButton>}
      </nav>}
    </header>
  )
}

export default Header