import { configureStore } from "@reduxjs/toolkit";
import stageReducer from './stage-slice'

export const store = configureStore({
  reducer: {
    stage: stageReducer
  }
})