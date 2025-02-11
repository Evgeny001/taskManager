import './App.css'
import { TodolistItem } from './TodolistItem/ui/TodolistItem.tsx'
import { useState } from 'react'
import { v1 } from 'uuid'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  const [filter, setFilter] = useState<FilterValues>('all')
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ])

  let filteredTasks = tasks
  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.isDone)
  }
  const deleteTask = (taskId: string) => {
    filteredTasks = tasks.filter(task => task.id !== taskId)
    setTasks(filteredTasks)
    console.log(filteredTasks)
  }
  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  const createTask = (title: string) => {
    const newTask: Task = {
      id: v1(),
      title,
      isDone: true,
    }
    setTasks([...tasks, newTask])
  }

  // const changeTaskStatus = (taskId: string, isDone: boolean) => {
  //   const task = tasks.find(task => task.id === taskId)
  //   if (task) {
  //     task.isDone = isDone
  //     setTasks([...tasks])
  //   }
  // }
  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newState = tasks.map(task => (task.id == taskId ? { ...task, isDone } : task))
    setTasks(newState)
  }

  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
      />
    </div>
  )
}
