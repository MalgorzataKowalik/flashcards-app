import styles from './StyledButton.module.css'
import Button from './Button'

const StyledButton = ({children, isDark, ...props}) => {
  return (
    <Button className={`${styles.button} ${isDark ? styles.dark : ''}`} {...props}>
      <span>
        {children}
      </span>
    </Button>
  )
}

export default StyledButton

