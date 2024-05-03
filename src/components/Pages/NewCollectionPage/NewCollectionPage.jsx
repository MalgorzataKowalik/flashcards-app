import { useEffect, useState } from "react";
import NewCollectionForm from "../../NewCollectionForm/NewCollectionForm";
import FlashcardsEditor from "../../FlashcardsEditor/FlashcardsEditor";
import { useSelector } from "react-redux";
import { useActionData } from "react-router-dom";


export default function NewCollectionPage() {
  const collections = useSelector(state => state.auth.userData.collections)
  const userName = useSelector(state => state.auth.userData.name)
  const collectionTitle = useActionData()

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
        collectionTitle ?
        <FlashcardsEditor collectionTitle={collectionTitle} collectionId={collectionId}/> :
        <NewCollectionForm/>
      }
    </>
  )
}

export async function newCollectionAction({request}) {
  const formData = await request.formData();
  const collectionTitle = formData.get('collection-title')
  return collectionTitle
}