import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showMessage: (state, action) => {
      return action.payload
    },
    removeMessage: (state, action) => {
      return initialState
    },
  },
})

export const showTemporalMessage = (notification) => {
  return async dispatch => {
    dispatch(showMessage(notification))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }
}

export const { showMessage, removeMessage} = notificationSlice.actions
export default notificationSlice.reducer