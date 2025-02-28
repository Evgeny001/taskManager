import { CreateItemForm } from '../../CreateItemForm/ui/CreateItemForm.tsx'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { createTaskAC } from '@/model/tasks-reducer.ts'
import { TodolistTitle } from '@/app/TodolistTitle.tsx'
import { Tasks } from '@/Tasks.tsx'
import { FilterButtons } from '@/FilterButtons.tsx'
import { Todolist } from '@/model/todolists-reducer.ts'

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title }))
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
