import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasksSlice.ts'
import { todolistsReducer, todolistsSlice } from '@/features/todolists/model/todolistsSlice.ts'
import { appReducer, appSlice } from './app-slice.ts'

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// to allow access to the store in the browser console
// @ts-ignore
window.store = store
