import { configureStore } from "@reduxjs/toolkit";
import stageReducer from './stage-slice'
import authReducer from './auth-slice'

export const store = configureStore({
  reducer: {
    stage: stageReducer,
    auth: authReducer
  }
})