import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

function getErrorMessage(error) {
  if (error instanceof Error) return error.message
  return String(error)
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
  }
)
