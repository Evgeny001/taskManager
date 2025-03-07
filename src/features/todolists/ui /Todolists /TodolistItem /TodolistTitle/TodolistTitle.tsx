import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  changeTodolistTitleAC,
  deleteTodolistAC,
  DomainTodolist,
} from '@/features/todolists/model/todolistsSlice.ts'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import cls from './TodolistTitle.module.css'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist
  const dispatch = useAppDispatch()

  const changeTodolistTitle = (value: string) => {
    dispatch(changeTodolistTitleAC({ id, title: value }))
  }

  const deleteTodolist = () => {
    dispatch(deleteTodolistAC({ id }))
  }
  return (
    <div className={cls.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
