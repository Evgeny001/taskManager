import Grid from '@mui/material/Grid2'
import { Paper } from '@mui/material'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { selectTodolists } from '@/features/todolists/model/todolistsSlice.ts'
import { useEffect } from 'react'
import { fetchTodolistsTC } from '@/features/todolists/model/todolistsSlice.ts'
import { useAppDispatch } from '@/common/hooks'

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map(todolist => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: '0 20px 20px 20px' }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
