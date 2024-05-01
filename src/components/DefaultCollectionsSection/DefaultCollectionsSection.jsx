import { useState, useEffect } from 'react'
import Collection from '../Collection/Collection'
import { baseUrl } from '../../utils/consts'
import styles from './DefaultCollectionsSection.module.css'

const DefaultCollectionsSection = () => {
  const [defaultCollectionsStatus, setDefaultCollectionStatus] = useState('')
  const [defaultCollections, setDefaultCollecions] = useState([])

  useEffect(() => {
    setDefaultCollectionStatus('loading')

    const fetchDefaultCollections = async () => {
      try {
        const response = await fetch(baseUrl + 'anonymous.json')
    
        if (!response.ok) {
          throw new Error('An error occured. Default collections can not be feth. Please try again later.')
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
  
  let renderableResult = (
    <ul>
      {defaultCollections.map(item => <Collection key={item.id} collection={item}/>)}
    </ul>
  )

  if (defaultCollectionsStatus === 'loading') {
    renderableResult = <p>Loading collections...</p>
  } else if (defaultCollectionsStatus === 'error') {
    renderableResult = <p className={styles.error}>Fetching default collections failed.</p>
  }

  return (
    <section className={styles.section}>
      <h3>DEFAULT COLLECTIONS</h3>
      {renderableResult}
    </section>
  )
}

export default DefaultCollectionsSection