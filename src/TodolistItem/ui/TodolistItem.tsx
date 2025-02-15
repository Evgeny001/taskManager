import { FilterValues, Task, Todolist } from '../../App.tsx'
import { Button } from '../../shared/ui/Button/Button.tsx'
import { ChangeEvent } from 'react'
import { CreateItemForm } from '../../CreateItemForm/ui/CreateItemForm.tsx'
import { EditableSpan } from '../../EditableSpan/ui/EditableSpan.tsx'

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
        <Button onClick={deleteTodolistHandler}>X</Button>
      </div>
      <div>
        <CreateItemForm onCreateItem={createTaskHandler} />
      </div>
      {tasks.length === 0 ? (
        'Тасок нет'
      ) : (
        <ul>
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
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Button onClick={deleteTaskHandler}>X</Button>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('all')}
        >
          All
        </Button>
        <Button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('active')}
        >
          Active
        </Button>
        <Button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('completed')}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
