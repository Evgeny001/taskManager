import './App.css'
import { TodolistItem } from './TodolistItem/ui/TodolistItem.tsx'
import { useState } from 'react'

export type Task = {
  id: number
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  const [filter, setFilter] = useState<FilterValues>('all')
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
  ])

  let filteredTasks = tasks
  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.isDone)
  }
  const deleteTask = (taskId: number) => {
    filteredTasks = tasks.filter(task => task.id !== taskId)
    setTasks(filteredTasks)
    console.log(filteredTasks)
  }
  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
      />
    </div>
  )
}
