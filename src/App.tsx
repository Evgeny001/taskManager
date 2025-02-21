import './App.css'
import { TodolistItem } from './TodolistItem/ui/TodolistItem.tsx'
import { useReducer, useState } from 'react'
import { CreateItemForm } from './CreateItemForm/ui/CreateItemForm.tsx'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import { createTheme, Paper, Switch, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { containerSx } from './TodolistItem/ui/TodolistItem.styles.ts'
import { NavButton } from './shared/ui/NavButton/NavButton.ts'
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer,
} from './model/todolists-reducer.ts'
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
  tasksReducer,
} from './model/tasks-reducer.ts'

export interface Todolist {
  id: string
  title: string
  filter: FilterValues
}
export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, Task[]>
export type FilterValues = 'all' | 'active' | 'completed'

type ThemeMode = 'dark' | 'light'

export const App = () => {
  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4',
      },
    },
  })

  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  const deleteTodolist = (todolistId: string) => {
    const action = deleteTodolistAC(todolistId)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatchToTasks(deleteTaskAC({ todolistId, taskId }))
  }
  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatchToTodolists(changeTodolistFilterAC({ id: todolistId, filter }))
  }

  const createTask = (todolistId: string, title: string) => {
    dispatchToTasks(createTaskAC({ todolistId, title }))
  }

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatchToTasks(changeTaskStatusAC({ todolistId, taskId, isDone }))
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchToTasks(changeTaskTitleAC({ todolistId, taskId, title }))
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchToTodolists(changeTodolistTitleAC({ id: todolistId, title }))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <AppBar position="static" sx={{ mb: '30px' }}>
          <Toolbar>
            <Container maxWidth={'lg'} sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton>Sign in</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                <Switch color={'default'} onChange={changeMode} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth={'lg'}>
          <Grid container sx={{ mb: '30px' }}>
            <CreateItemForm onCreateItem={createTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todolists.map(todolist => {
              const todolistTasks = tasks[todolist.id]
              let filteredTasks = todolistTasks
              if (todolist.filter === 'active') {
                filteredTasks = todolistTasks.filter(task => !task.isDone)
              }
              if (todolist.filter === 'completed') {
                filteredTasks = todolistTasks.filter(task => task.isDone)
              }

              return (
                <Grid key={todolist.id}>
                  <Paper sx={{ p: '0 20px 20px 20px' }}>
                    <TodolistItem
                      key={todolist.id}
                      todolists={todolist}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      deleteTodolist={deleteTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  )
}
