import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authSlice } from './auth'


import { journalSlice } from './slices/journal'

/**
 * Basic store for redux Apps
 */
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
  middleware: ( getDefaultMiddleware ) => getDefaultMiddleware()
    // .concat() // App middleware
})