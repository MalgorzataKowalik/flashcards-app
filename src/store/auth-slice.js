import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoggedIn: false,
  userData: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = true
      state.userData = action.payload
    },
    setLoggedOut(state) {
      state.isLoggedIn = false
      state.userData = initialState.userData
    },
    addCollection(state, action) {
      state.userData.collections.push(action.payload)
    }
  }
})

export default authSlice.reducer
export const authActions = authSlice.actions