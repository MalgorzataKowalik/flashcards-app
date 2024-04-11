import styles from './Button.module.css'

const Button = ({children, ...props}) => {
  return (
    <button className={`${styles.button} ${props.className || ''}`} {...props}>
      <span>
        {children}
      </span>
    </button>
  )
}

export default Button

