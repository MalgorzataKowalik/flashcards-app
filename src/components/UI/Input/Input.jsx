import styles from './Input.module.css'

export default function Input({id, label, isValid, errorText, className, isTextArea, ...props}) {
  return (
    <div className={`${styles.input} ${className ? styles[className] : ''}`}>
      <label htmlFor={id}>{label}</label>
      {isTextArea ?
        <textarea
          id={id}
          {...props}/> :
        <input
          id={id}
          {...props}/>}
      <div className={styles.error}>
        {!isValid && <p>{errorText}</p>}
      </div>
    </div>
  )
}