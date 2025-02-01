import { Task } from '../../App.tsx'
import { Button } from '../../shared/ui/Button/Button.tsx'

type Props = {
  title: string
  tasks: Task[]
}

export const TodolistItem = ({ title, tasks }: Props) => {
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
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button>All</Button>
        <Button>Active</Button>
        <Button>Completed</Button>
      </div>
    </div>
  )
}
