import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../../api/users'

import { formattedDate } from '../../utils/formattedDate';
import { compareArrays } from '../../utils/compareArrays';

import questData from '../../assets/json/quest.json';

const initialState = {
  quest: null,
  questUsername: '',
  questPackName: '',
  questAnswers: {},
  questCurrentAnswerId: 0,
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
    setQuestCurrentAnswerId: (state, action) => {
      console.log(action.payload);
      state.questCurrentAnswerId = (action.payload);
      localStorage.setItem('questCurrentAnswerId', JSON.stringify(state.questCurrentAnswerId))
    },
    setTestsAnswers: (state, action) => {
      const id = action.payload.id
      state.questAnswers[id] = action.payload
      localStorage.setItem('answers', JSON.stringify(state.questAnswers))
    },
    getResult: (state) => {
      let correctAnswersCount = 0
      for (const key in state.questAnswers) {
        const { answer, right } = state.questAnswers[key]
        compareArrays(right, answer) && correctAnswersCount++
      }

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
    },
    resetAnswer: () => {
      localStorage.removeItem('answers')
    },
    resetQuestCurrentAnswerId: () => {
      localStorage.removeItem('questCurrentAnswerId')
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
        // state.questPackName = questData.testName
        const username = localStorage.getItem('username')
        state.questUsername = username ? username : ''
        const answers = localStorage.getItem('answers')
        state.questAnswers = answers ? JSON.parse(answers) : {}
        const score = localStorage.getItem('score')
        state.questScore = score ? JSON.parse(score) : []
        const questCurrentAnswerId = localStorage.getItem('questCurrentAnswerId')
        state.questCurrentAnswerId = questCurrentAnswerId ? JSON.parse(questCurrentAnswerId) : 0
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
  setQuestCurrentAnswerId,
  setTestsAnswers,
  getResult,
  resetScore,
  resetAnswer,
  resetQuestCurrentAnswerId,
} = questSlice.actions

export default questSlice.reducer