import { List } from '@mui/material'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { fetchTasksTC, selectTasks } from '@/features/todolists/model/tasksSlice.ts'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx'
import { DomainTodolist } from '@/features/todolists/model/todolistsSlice.ts'
import { useAppDispatch } from '@/common/hooks'
import { useEffect } from 'react'
import { TaskStatus } from '@/common/enums '

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === 'active') {
    filteredTasks = todolistTasks.filter(task => task.status === TaskStatus.Completed)
  }
  if (filter === 'completed') {
    filteredTasks = todolistTasks.filter(task => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map(task => <TaskItem key={task.id} task={task} todolistId={id} />)}
        </List>
      )}
    </>
  )
}
