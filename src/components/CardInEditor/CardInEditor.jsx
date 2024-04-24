import styles from './CardInEditor.module.css'

export default function CardInEditor({id, question, answer}) {
  return (
    <li className={styles.card}>
      <p>
        <span className={styles.category}>question: </span>
        <span>{question}</span>
      </p>
      <p>
        <span className={styles.category}>answer: </span>
        <span>{answer}</span>
      </p>
    </li>
  )
}