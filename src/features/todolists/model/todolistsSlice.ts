import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { Todolist } from '../api/todolistsApi.types.ts'
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'

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
        state.push({ ...action.payload, filter: 'all', addedDate: '', order: 0 })
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
  extraReducers: builder => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        action.payload?.todolists.forEach(tl => {
          state.push({ ...tl, filter: 'all' })
        })
      })
      .addCase(fetchTodolistsTC.rejected, () => {})
  },
})

export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistsTC`,
  async (_, thunkAPI) => {
    try {
      const res = await todolistsApi.getTodolists()
      return { todolists: res.data }
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
    }
  }
)

export const { deleteTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC } =
  todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export type FilterValues = 'all' | 'active' | 'completed'
export type DomainTodolist = Todolist & {
  filter: FilterValues
}
