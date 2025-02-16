import { FilterValues, Task, Todolist } from '../../App.tsx'
import Button from '@mui/material/Button'
import { ChangeEvent } from 'react'
import { CreateItemForm } from '../../CreateItemForm/ui/CreateItemForm.tsx'
import { EditableSpan } from '../../EditableSpan/ui/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { Checkbox, List, ListItem } from '@mui/material'
import Box from '@mui/material/Box'
import { containerSx, getListItemSx } from './TodolistItem.styles'

type Props = {
  todolists: Todolist
  tasks: Task[]
  deleteTask: (todolistId: string, task: string) => void
  changeFilter: (todolistId: string, filter: FilterValues) => void
  createTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  deleteTodolist: (todolistId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = ({
  todolists: { id, filter, title },
  tasks,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
  deleteTodolist,
  changeTaskTitle,
  changeTodolistTitle,
}: Props) => {
  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  const createTaskHandler = (title: string) => {
    createTask(id, title)
  }

  const changeTodolistTitleHandler = (value: string) => {
    changeTodolistTitle(id, value)
  }

  return (
    <div>
      <div className={'container'}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <div>
        <CreateItemForm onCreateItem={createTaskHandler} />
      </div>
      {tasks.length === 0 ? (
        'Тасок нет'
      ) : (
        <List>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(id, task.id)
            }
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(id, task.id, e.currentTarget.checked)
            }
            const changeTaskTitleHandler = (value: string) => {
              changeTaskTitle(id, task.id, value)
            }
            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                  <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                </div>
                <IconButton onClick={deleteTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            )
          })}
        </List>
      )}
      <Box sx={containerSx}>
        <Button
          variant={filter === 'all' ? 'outlined' : 'text'}
          color={'inherit'}
          onClick={() => changeFilterHandler('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={() => changeFilterHandler('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
          onClick={() => changeFilterHandler('completed')}
        >
          Completed
        </Button>
      </Box>
    </div>
  )
}
