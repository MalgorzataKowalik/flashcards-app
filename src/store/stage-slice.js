import { createSlice } from "@reduxjs/toolkit"

export const stages = {
  default: '',
  cards: 'cards',
  result: 'result'
}

const initialState = {
  stage: stages.default,
  selectedCollection: null,
  result: {
    score: 0,
    totalNumber: 0,
    wrongAnswers: []
  }
}

const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    setDefaultStage(state) {
      state.stage = initialState.stage
      state.selectedCollection = initialState.selectedCollection
      state.result = initialState.result
    },
    setCardsStage(state, action) {
      state.selectedCollection = action.payload
      state.stage = stages.cards
    },
    setResultStage(state, action) {
      state.result = {
        score: action.payload.score,
        totalNumber: action.payload.totalNumber,
        wrongAnswers: action.payload.wrongAnswers
      }
      state.stage = stages.result
    }
  }
})

export default stageSlice.reducer
export const stageActions = stageSlice.actions