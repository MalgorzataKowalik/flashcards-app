import styles from './Input.module.css'

export default function Input({id, label, isValid, errorText, ...props}) {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...props}/>
      <div className={styles.error}>
        {!isValid && <p>{errorText}</p>}
      </div>
    </div>
  )
}