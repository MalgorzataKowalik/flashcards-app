import { createSlice } from "@reduxjs/toolkit"

export const stages = {
  default: '',
  cards: 'cards',
  result: 'result'
}

const initialState = {
  stage: stages.default,
  selectedCollection: null,
  score: null
}

const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    setDefaultStage(state) {
      state.stage = initialState.stage
      state.selectedCollection = initialState.selectedCollection
      state.score = initialState.score
    },
    setCardsStage(state, action) {
      state.stage = stages.cards
      state.selectedCollection = action.payload
    },
    setResultStage(state) {
      state.stage = stages.result
    }
  }
})

export default stageSlice.reducer
export const stageActions = stageSlice.actions