import { useState } from "react";
import Header from "../../Header/Header";
import NewCollectionForm from "../../NewCollectionForm/NewCollectionForm";
import FlashcardsEditor from "../../FlashcardsEditor/FlashcardsEditor";
import { useSelector } from "react-redux";


export default function NewCollectionPage() {
  const collections = useSelector(state => state.auth.userData.collections)
  const userName = useSelector(state => state.auth.userData.name)
  const [enteredCollectionTitle, setEnteredCollectionTitle] = useState('')

  let collectionId
  if (collections) {
    const str = "" + (collections.length + 1)
    const pad = "-0000"
    collectionId = userName + pad.substring(0, pad.length - str.length) + str
  } else {
    collectionId = userName + "-0001"
  }

  return (
    <>
      {
        enteredCollectionTitle ?
        <FlashcardsEditor collectionTitle={enteredCollectionTitle} collectionId={collectionId}/> :
        <NewCollectionForm onCollectionTitleSubmit={setEnteredCollectionTitle}/>
      }
    </>
  )
}