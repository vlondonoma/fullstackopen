import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return initialState
    }
  }
})

export const showTemporalMessage = (notification) => {
  return async dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer