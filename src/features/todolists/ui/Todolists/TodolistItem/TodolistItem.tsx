import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { createTaskTC } from '@/features/todolists/model/tasksSlice.ts'
import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx'
import { Tasks } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx'
import { FilterButtons } from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons /FilterButtons.tsx'
import { DomainTodolist } from '@/features/todolists/model/todolistsSlice.ts'

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskTC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
