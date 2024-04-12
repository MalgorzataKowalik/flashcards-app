import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import DefaultCollectionsSection from "./components/DefaultCollectionsSection/DefaultCollectionsSection";
import Header from "./components/Header/Header";
import CardSection from './components/CardSection/CardSection'
import { stages } from './store/stage-slice'
import { baseUrl } from './helpers/consts'

function App() {
  const stageData = useSelector(state => state.stage)

  const [defaultCollectionsStatus, setDefaultCollectionStatus] = useState('')
  const [defaultCollections, setDefaultCollecions] = useState([])

  useEffect(() => {
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
    mainContent = <CardSection/>
  }

  return (
    <>
      <Header/>
      <main>
        {mainContent}
      </main>
    </>
  );
}

export default App;
