import { createSlice, nanoid } from '@reduxjs/toolkit'
import { Todolist } from '../api/todolistsApi.types.ts'

export const todolistsSlice = createSlice({
  name: 'todolistsSlice',
  initialState: [] as DomainTodolist[],
  reducers: create => ({
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    createTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { title, id: nanoid() } }),
      (state, action) => {
        state.push({ ...action.payload, filter: 'all' })
      }
    ),
    changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>(
      (state, action) => {
        const todolist = state.find(todolist => todolist.id === action.payload.id)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      }
    ),
  }),
})

export const { deleteTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC } =
  todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export type FilterValues = 'all' | 'active' | 'completed'
export type DomainTodolist = Todolist & {
  filter: FilterValues
}
