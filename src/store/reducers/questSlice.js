import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../../api/users'

import questData from '../../assets/json/quest.json';
import { formattedDate } from '../../utils/formattedDate';

const initialState = {
  quest: null,
  usernameStore: '',
  testPackName: '',
  testsAnswers: [],
  results: [],
  users: [],
  status: '',
  isLoading: false,
  error: null,
}

export const questSlice = createSlice({
  name: 'questSlice',
  initialState,
  reducers: {
    setStoreUsername: (state, action) => {
      state.usernameStore = action.payload
      localStorage.setItem('username', action.payload)
    },
    setQuestName: (state, action) => {
      state.testPackName = (action.payload);
    },
    setTestsAnswers: (state, action) => {
      const id = action.payload.id
      const answer = action.payload.answer
      const right = action.payload.right
      if (state.testsAnswers[id]) {
        state.testsAnswers[id].answer = answer
        state.testsAnswers[id].right = right
      } else {
        state.testsAnswers.push(action.payload)
      }
      localStorage.setItem('answers', JSON.stringify(state.testsAnswers))
    },
    getResult: (state) => {
      const correctAnswersCount = state.testsAnswers.reduce(
        (acc, currentValue) => {
          if (currentValue.answer === currentValue.right) {
            return acc + 1;
          }
          return acc;
        },
        0
      );
      state.results.push({
        id: +new Date(),
        date: formattedDate,
        username: state.usernameStore,
        score: correctAnswersCount,
        testPackName: state.testPackName
      })
      localStorage.setItem('score', JSON.stringify(state.results))
      localStorage.removeItem('answers')
    },
    resetScore: () => {
      localStorage.removeItem('score')
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state/* , action */) => {
        state.isLoading = true
        state.status = 'loading'
        state.error = ''
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.status = 'resolved'
        state.error = ''
        /* для симуляции async запроса, после получения data от fake-api присваивается mock-data */
        state.users = action.payload
        state.quest = questData
        const username = localStorage.getItem('username')
        state.usernameStore = username ? username : ''
        const answers = localStorage.getItem('answers')
        state.testsAnswers = answers ? JSON.parse(answers) : []
        const score = localStorage.getItem('score')
        state.results = score ? JSON.parse(score) : []
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.status = 'error'
        state.error = String(action.payload)
      })
  },
})

export const {
  setStoreUsername,
  setQuestName,
  setTestsAnswers,
  getResult,
  resetScore,
} = questSlice.actions

export default questSlice.reducer