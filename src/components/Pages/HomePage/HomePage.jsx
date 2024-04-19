import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import DefaultCollectionsSection from "../../DefaultCollectionsSection/DefaultCollectionsSection";
import Header from "../../Header/Header";
import Card from '../../Card/Card'
import SectionWithBack from '../../UI/SectionWithBack/SectionWithBack';
import Result from '../../Result/Result';
import { stages, stageActions } from '../../../store/stage-slice'
import styles from './HomePage.module.css'
import UsersCollectionsSection from '../../UsersCollectionsSection/UsersCollectionsSection';

function HomePage() {
  const dispatch = useDispatch()
  const stageData = useSelector(state => state.stage)

  useEffect(() => {
    dispatch(stageActions.setDefaultStage()) //TODO: consider this
  }, [])

  let mainContent = (
    <>
      <UsersCollectionsSection/>
      <DefaultCollectionsSection/>
    </>
  )

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