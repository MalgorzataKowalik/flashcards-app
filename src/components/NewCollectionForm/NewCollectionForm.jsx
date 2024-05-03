import { Form } from "react-router-dom";
import StyledButton from "../UI/Button/StyledButton";
import Input from "../UI/Input/Input";
import styles from './NewCollectionForm.module.css'

export default function NewCollectionForm() {
  return (
    <Form method='post' className={styles.form}>
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
    </Form>
  )
}