import { Checkbox, ListItem } from '@mui/material'
import { getListItemSx } from '@/TodolistItem/ui/TodolistItem.styles.ts'
import { EditableSpan } from '@/EditableSpan/ui/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task } from '@/model/tasks-reducer.ts'
import { ChangeEvent } from 'react'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'

type Props = {
  task: Task
  todolistId: string
}

export const TaskItem = ({ todolistId, task }: Props) => {
  const dispatch = useAppDispatch()
  const deleteTask = () => {
    dispatch(deleteTaskAC({ todolistId, taskId: task.id }))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTaskStatusAC({
        todolistId,
        taskId: task.id,
        isDone: e.currentTarget.checked,
      })
    )
  }
  const changeTaskTitle = (value: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title: value }))
  }
  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
