import { Checkbox, ListItem } from '@mui/material'
import { getListItemSx } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import {
  changeTaskStatusTC,
  changeTaskTitleAC,
  deleteTaskTC,
} from '@/features/todolists/model/tasksSlice.ts'
import { ChangeEvent } from 'react'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { DomainTask } from '@/features/todolists/api/tasksApi.types.ts'
import { TaskStatus } from '@/common/enums '

type Props = {
  task: DomainTask
  todolistId: string
}

export const TaskItem = ({ todolistId, task }: Props) => {
  const dispatch = useAppDispatch()
  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTaskStatusTC({
        todolistId,
        taskId: task.id,
        status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
      })
    )
  }
  const changeTaskTitle = (value: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title: value }))
  }

  const isTaskCompleted = task.status === TaskStatus.Completed

  return (
    <ListItem key={task.id} sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
