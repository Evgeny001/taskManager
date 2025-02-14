import { FilterValues, Task, Todolist } from '../../App.tsx'
import { Button } from '../../shared/ui/Button/Button.tsx'
import { ChangeEvent, useState, type KeyboardEvent } from 'react'

type Props = {
  todolists: Todolist
  tasks: Task[]
  deleteTask: (todolistId: string, task: string) => void
  changeFilter: (todolistId: string, filter: FilterValues) => void
  createTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = ({
  todolists: { id, filter, title },
  tasks,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
  deleteTodolist,
}: Props) => {
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
    setError(null)
  }

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle !== '') {
      createTask(id, trimmedTitle)
      setTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
  }

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  return (
    <div>
      <div className={'container'}>
        <h3>{title}</h3>
        <Button onClick={deleteTodolistHandler}>X</Button>
      </div>
      <div>
        <input
          onChange={changeTaskTitleHandler}
          value={taskTitle}
          onKeyDown={createTaskOnEnterHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={createTaskHandler}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
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
            return (
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Button onClick={deleteTaskHandler}>X</Button>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                <span>{task.title}</span>
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
