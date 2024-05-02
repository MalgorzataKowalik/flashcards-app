import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import DefaultCollectionsSection from "../../DefaultCollectionsSection/DefaultCollectionsSection";
import Card from '../../Card/Card'
import SectionWithBack from '../../UI/SectionWithBack/SectionWithBack';
import Result from '../../Result/Result';
import { stages, stageActions } from '../../../store/stage-slice'
import UsersCollectionsSection from '../../UsersCollectionsSection/UsersCollectionsSection';

function HomePage() {
  const dispatch = useDispatch()
  const stageData = useSelector(state => state.stage)

  useEffect(() => {
    dispatch(stageActions.setDefaultStage()) //TODO: consider this
  }, [])

  if (stageData.stage === stages.cards) {
    return <SectionWithBack><Card/></SectionWithBack>
  } else if (stageData.stage === stages.result) {
    return <SectionWithBack><Result/></SectionWithBack>
  }

  return (
    <>
      <UsersCollectionsSection/>
      <DefaultCollectionsSection/>
    </>
  );
}

export default HomePage