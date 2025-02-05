import { FilterValues, Task } from '../../App.tsx'
import { Button } from '../../shared/ui/Button/Button.tsx'

type Props = {
  title: string
  tasks: Task[]
  deleteTask: (task: number) => void
  changeFilter: (filterValue: FilterValues) => void
}

export const TodolistItem = ({ title, tasks, deleteTask, changeFilter }: Props) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
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
