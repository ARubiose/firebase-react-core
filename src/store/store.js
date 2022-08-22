import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authSliceHook } from '../firebase/authStore/authSliceHook'
import { authSlice } from './auth'


import { journalSlice } from './slices/journal'

/**
 * Basic store for redux Apps
 */
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    authHook: authSliceHook.reducer,
    journal: journalSlice.reducer,
  },
  middleware: ( getDefaultMiddleware ) => getDefaultMiddleware()
    // .concat() // App middleware
})