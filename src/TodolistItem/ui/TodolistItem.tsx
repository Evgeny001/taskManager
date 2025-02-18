import { FilterValues, Task } from '../../App.tsx'
import { Button } from '../../shared/ui/Button/Button.tsx'
import { ChangeEvent, useState, type KeyboardEvent } from 'react'

type Props = {
  title: string
  tasks: Task[]
  deleteTask: (task: string) => void
  changeFilter: (filterValue: FilterValues) => void
  createTask: (title: string) => void
}

export const TodolistItem = ({ title, tasks, deleteTask, changeFilter, createTask }: Props) => {
  const [taskTitle, setTaskTitle] = useState<string>('')
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }
  const createTaskHandler = () => {
    createTask(taskTitle)
    setTaskTitle('')
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
        />
        <button onClick={createTaskHandler}>+</button>
      </div>
      {tasks.length === 0 ? (
        'Тасок нет'
      ) : (
        <ul>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(task.id)
            }
            return (
              <li key={task.id}>
                <Button onClick={deleteTaskHandler}>X</Button>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button onClick={() => changeFilter('all')}>All</Button>
        <Button onClick={() => changeFilter('active')}>Active</Button>
        <Button onClick={() => changeFilter('completed')}>Completed</Button>
      </div>
    </div>
  )
}
