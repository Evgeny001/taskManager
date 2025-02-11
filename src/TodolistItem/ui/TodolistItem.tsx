import { FilterValues, Task } from '../../App.tsx'
import { Button } from '../../shared/ui/Button/Button.tsx'
import { ChangeEvent, useState, type KeyboardEvent } from 'react'

type Props = {
  title: string
  tasks: Task[]
  filter: FilterValues
  deleteTask: (task: string) => void
  changeFilter: (filterValue: FilterValues) => void
  createTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({
  title,
  tasks,
  filter,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
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
      createTask(trimmedTitle)
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
  return (
    <div>
      <h3>{title}</h3>
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
              deleteTask(task.id)
            }
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(task.id, e.currentTarget.checked)
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
          onClick={() => changeFilter('all')}
        >
          All
        </Button>
        <Button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => changeFilter('active')}
        >
          Active
        </Button>
        <Button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={() => changeFilter('completed')}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
