import { createTodolistAC, deleteTodolistAC } from './todolists-reducer.ts'
import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import { TasksState } from '@/model/tasks-selectors.ts'

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{ todolistId: string; taskId: string }>('task/deleteTask')

export const createTaskAC = createAction<{ todolistId: string; title: string }>('task/createTask')

export const changeTaskStatusAC = createAction<{
  todolistId: string
  taskId: string
  isDone: boolean
}>('task/changeTaskStatus')

export const changeTaskTitleAC = createAction<{
  todolistId: string
  taskId: string
  title: string
}>('task/changeTaskTitle')

export const tasksReducer = createReducer(initialState, builder => {
  builder
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    .addCase(deleteTaskAC, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    })
    .addCase(createTaskAC, (state, action) => {
      const newTask: Task = { title: action.payload.title, isDone: false, id: nanoid() }
      state[action.payload.todolistId].unshift(newTask)
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
      if (task) {
        task.isDone = action.payload.isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    })
})

export type Task = {
  id: string
  title: string
  isDone: boolean
}
