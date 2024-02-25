import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../../api/users'

import questData from '../../assets/json/quest.json';
import { formattedDate } from '../../utils/formattedDate';

const initialState = {
  quest: null,
  questUsername: '',
  questPackName: '',
  questAnswers: [],
  questScore: [],
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
      state.questUsername = action.payload
      localStorage.setItem('username', action.payload)
    },
    setQuestName: (state, action) => {
      state.questPackName = (action.payload);
    },
    setTestsAnswers: (state, action) => {
      const id = action.payload.id
      const answer = action.payload.answer
      const right = action.payload.right
      if (state.questAnswers[id]) {
        state.questAnswers[id].answer = answer
        state.questAnswers[id].right = right
      } else {
        state.questAnswers.push(action.payload)
      }
      localStorage.setItem('answers', JSON.stringify(state.questAnswers))
    },
    getResult: (state) => {
      const correctAnswersCount = state.questAnswers.reduce(
        (acc, currentValue) => {
          if (currentValue.answer === currentValue.right) {
            return acc + 1;
          }
          return acc;
        },
        0
      );
      state.questScore.push({
        id: +new Date(),
        date: formattedDate,
        username: state.questUsername,
        score: correctAnswersCount,
        questPackName: state.questPackName
      })
      localStorage.setItem('score', JSON.stringify(state.questScore))
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
        state.questUsername = username ? username : ''
        const answers = localStorage.getItem('answers')
        state.questAnswers = answers ? JSON.parse(answers) : []
        const score = localStorage.getItem('score')
        state.questScore = score ? JSON.parse(score) : []
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