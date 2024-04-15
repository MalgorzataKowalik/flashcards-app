import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import DefaultCollectionsSection from "../../DefaultCollectionsSection/DefaultCollectionsSection";
import Header from "../../Header/Header";
import Card from '../../Card/Card'
import SectionWithBack from '../../UI/SectionWithBack/SectionWithBack';
import Result from '../../Result/Result';
import { stages, stageActions } from '../../../store/stage-slice'
import { baseUrl } from '../../../utils/consts'
import styles from './HomePage.module.css'

function HomePage() {
  const dispatch = useDispatch()
  const stageData = useSelector(state => state.stage)

  const [defaultCollectionsStatus, setDefaultCollectionStatus] = useState('')
  const [defaultCollections, setDefaultCollecions] = useState([])

  useEffect(() => {
    dispatch(stageActions.setDefaultStage()) //TODO: consider this
    setDefaultCollectionStatus('loading')

    const fetchDefaultCollections = async () => {
      try {
        const response = await fetch(baseUrl + 'anonymous.json')
    
        if (!response.ok) {
          throw new Error
        }

        setDefaultCollectionStatus('success')
        const data = await response.json()
        setDefaultCollecions(data.collections || [])
      } catch (error) {
        setDefaultCollectionStatus('error')
      }
    }

    fetchDefaultCollections()
  }, [])

  let mainContent = <DefaultCollectionsSection status={defaultCollectionsStatus} collections={defaultCollections}/>
  if (stageData.stage === stages.cards) {
    mainContent = <SectionWithBack><Card/></SectionWithBack>
  } else if (stageData.stage === stages.result) {
    mainContent = <SectionWithBack><Result/></SectionWithBack>
  }

  return (
    <>
      <Header/>
      <main className={styles.main}>
        {mainContent}
      </main>
    </>
  );
}

export default HomePage