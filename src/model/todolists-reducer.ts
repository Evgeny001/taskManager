import { FilterValues, Todolist } from '../App.tsx'
import { v1 } from 'uuid'

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions) => {
  switch (action.type) {
    case 'delete_todolist': {
      return state.filter(todolist => todolist.id !== action.payload.id)
    }
    case 'create_todolist': {
      const newTodolist: Todolist = {
        title: action.payload.title,
        id: action.payload.id,
        filter: 'all',
      }
      return [...state, newTodolist]
    }
    case 'changeTitle_todolist': {
      return state.map(todolist =>
        todolist.id === action.payload.id ? { ...todolist, title: action.payload.title } : todolist
      )
    }
    case 'changeFilter_todolist': {
      return state.map(todolist =>
        todolist.id === action.payload.id
          ? { ...todolist, filter: action.payload.filter }
          : todolist
      )
    }
    default:
      return state
  }
}

export const deleteTodolistAC = (id: string) => {
  return {
    type: 'delete_todolist',
    payload: { id },
  } as const
}

export const createTodolistAC = (title: string) => {
  const id = v1()
  return {
    type: 'create_todolist',
    payload: { title, id },
  } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return {
    type: 'changeTitle_todolist',
    payload,
  } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }) => {
  return {
    type: 'changeFilter_todolist',
    payload,
  } as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type Actions =
  | DeleteTodolistAction
  | CreateTodolistAction
  | ChangeTodolistTitleAction
  | ChangeTodolistFilterAction
