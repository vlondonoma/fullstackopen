import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setAllUsers(users))
  }
}

export const { setAllUsers } = usersSlice.actions
export default usersSlice.reducer
