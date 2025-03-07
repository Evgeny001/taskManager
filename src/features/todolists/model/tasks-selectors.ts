import { TasksState } from '@/features/todolists/model/tasksSlice.ts'
import { RootState } from '@/app/store.ts'

export const selectTasks = (state: RootState): TasksState => state.tasksSlice
