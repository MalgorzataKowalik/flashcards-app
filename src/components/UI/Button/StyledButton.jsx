import styles from './StyledButton.module.css'
import Button from './Button'

const StyledButton = ({children, ...props}) => {
  return (
    <Button className={`${styles.button} ${props.className || ''}`} {...props}>
      <span>
        {children}
      </span>
    </Button>
  )
}

export default StyledButton

