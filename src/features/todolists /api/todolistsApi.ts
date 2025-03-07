import { instance } from '@/common/instance'
import { BaseResponse } from '@/common/types'
import { Todolist } from '@/features/todolists /api/todolistsApi.types.ts'

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>('/todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>('/todo-lists', { title })
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}
