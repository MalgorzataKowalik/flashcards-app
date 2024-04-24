import StyledButton from "../UI/Button/StyledButton";
import Input from "../UI/Input/Input";
import styles from './NewCollectionForm.module.css'

export default function NewCollectionForm({onCollectionTitleSubmit}) {
  function titleSubmitHandler(event) {
    event.preventDefault()
    const formData = new FormData(event.target);
    const inputsData = Object.fromEntries(formData.entries())
    onCollectionTitleSubmit(inputsData['collection-title'].trim())
  }

  return (
    <form className={styles.form} onSubmit={titleSubmitHandler}>
      <Input
        className='wide'
        id="collection-title"
        name="collection-title"
        type="text"
        label="Enter collection title"
        isValid={true}
        maxLength="60"
        required/>
      <StyledButton>OK</StyledButton>
    </form>
  )
}