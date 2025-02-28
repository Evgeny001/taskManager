import { RootState } from '../app/store.ts'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, Task[]>

export const selectTasks = (state: RootState): TasksState => state.tasks
