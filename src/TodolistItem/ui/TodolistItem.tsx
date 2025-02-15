import { FilterValues, Task, Todolist } from '../../App.tsx'
import { Button } from '../../shared/ui/Button/Button.tsx'
import { ChangeEvent } from 'react'
import { CreateItemForm } from '../../CreateItemForm/ui/CreateItemForm.tsx'

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
  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  const createTaskHandler = (title: string) => {
    createTask(id, title)
  }

  return (
    <div>
      <div className={'container'}>
        <h3>{title}</h3>
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
