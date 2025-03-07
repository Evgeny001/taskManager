import { DomainTodolist } from '@/features/todolists/model/todolistsSlice.ts'
import { RootState } from '@/app/store.ts'

export const selectTodolists = (state: RootState): DomainTodolist[] => state.todolistsSlice
