import { createTodolistTC, deleteTodolistTC } from '@/features/todolists/model/todolistsSlice.ts'
import { createAppSlice } from '@/common/utils'
import { tasksApi } from '@/features/todolists/api/tasksApi.ts'
import { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts'
import { TaskStatus } from '@/common/enums '
import { RootState } from '@/app/store.ts'

export const tasksSlice = createAppSlice({
  name: 'tasksSlice',
  initialState: {} as TasksState,
  selectors: {
    selectTasks: state => state,
  },
  reducers: create => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          const res = await tasksApi.getTasks(todolistId)
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      }
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          await tasksApi.deleteTask(payload)
          return payload
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          const index = tasks.findIndex(task => task.id === action.payload.taskId)
          if (index !== -1) {
            tasks.splice(index, 1)
          }
        },
      }
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, thunkAPI) => {
        try {
          const res = await tasksApi.createTask(payload)
          return { task: res.data.data.item }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      }
    ),
    changeTaskStatusTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string; status: TaskStatus }, thunkAPI) => {
        const { todolistId, taskId, status } = payload

        const allTodolistTasks = (thunkAPI.getState() as RootState)[tasksSlice.name][todolistId]
        const task = allTodolistTasks.find(task => task.id === taskId)

        if (!task) {
          return thunkAPI.rejectWithValue(null)
        }

        const model: UpdateTaskModel = {
          description: task.description,
          title: task.title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status,
        }
        try {
          const res = await tasksApi.updateTask({ todolistId, taskId, model })
          debugger
          return { task: res.data.data.item }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          debugger
          const task = state[action.payload.task.todoListId].find(
            t => t.id === action.payload.task.id
          )
          if (task) {
            debugger
            task.status = action.payload.task.status
          }
        },
      }
    ),
    changeTaskTitleAC: create.reducer<{
      todolistId: string
      taskId: string
      title: string
    }>((state, action) => {
      const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    }),
  }),
  extraReducers: builder => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const { fetchTasksTC, deleteTaskTC, changeTaskTitleAC, changeTaskStatusTC, createTaskTC } =
  tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
