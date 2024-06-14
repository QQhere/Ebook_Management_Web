import { configureStore } from '@reduxjs/toolkit'
import logInReducer from './slices/logInSlice'
import signUpReducer from './slices/signUpSlice'

export const store = configureStore({
  reducer: {
    logIn: logInReducer,
    signUp: signUpReducer,
  },
})