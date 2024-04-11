import Collection from '../Collection/Collection'
import { baseUrl } from '../../helpers/consts'
import styles from './CardsSection.module.css'

const defaultUser = {
  collections: [
    {
      id: 'default-0001',
      title: 'English - Polish mix vocabulary',
      cards: [
        {
          id: '1',
          question: 'powaga, ważność',
          answer: 'severity'
        },
        {
          id: '2',
          question: 'przestarzały',
          answer: 'deprecated'
        },
        {
          id: '3',
          question: 'obcy',
          answer: 'extraneous'
        },
        {
          id: '4',
          question: 'progi',
          answer: 'thresholds'
        },
        {
          id: '5',
          question: 'szafka z szufladami',
          answer: 'drawer cabinet'
        },
        {
          id: '6',
          question: 'tablica z ogłoszeniami/ notatkami',
          answer: 'bulletin board'
        },
        {
          id: '7',
          question: 'kosz na śmieci (biurowe)',
          answer: 'wastebasket'
        },
        {
          id: '8',
          question: 'krzesło obrotowe',
          answer: 'swivel chair'
        }
      ]
    },
    {
      id: 'default-0002',
      title: 'Roku knowledge',
      cards: [
        {
          id: '1',
          question: 'Name 3 basic renderable nodes',
          answer: 'Rectangle, Poster, SimpleLabel'
        },
        {
          id: '2',
          question: 'What is the name of the scene management framework?',
          answer: 'SceneGraph'
        }
      ]
    }
  ]
}


const CardsSection = () => {
  const collections = defaultUser.collections

  return (
    <section className={styles.section}>
      <p>Pick collection to start</p>
      <ul>
        {collections.map(item => <Collection key={item.id} collection={item}/>)}
      </ul>
    </section>
  )
}

export default CardsSection