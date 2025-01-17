import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTasks, createTask, updateTask, deleteTask } from '../../api/api';
import { TasksState, TaskType } from '../../types/task-types';

// Асинхронные действия
export const fetchTasks = createAsyncThunk<TaskType[]>('tasks/fetchTasks', async (_, thunkAPI) => {
  try {
    return await getTasks();
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch tasks');
  }
});

export const addNewTask = createAsyncThunk<TaskType, Omit<TaskType, '_id'>>(
  'tasks/addNewTask',
  async (task, thunkAPI) => {
    try {
      const newTask = await createTask(task); // Здесь мы ожидаем, что сервер вернет задачу с _id
      return newTask; // Вернем задачу с _id
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to create task');
    }
  }
);

export const deleteTaskById = createAsyncThunk<string, string>(
  'tasks/deleteTaskById',
  async (id, thunkAPI) => {
    try {
      await deleteTask(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to delete task');
    }
  }
);

export const updateTaskById = createAsyncThunk<TaskType, { id: string; updatedTask: Partial<TaskType> }>(
  'tasks/updateTaskById',
  async ({ id, updatedTask }, thunkAPI) => {
    try {
      return await updateTask(id, updatedTask);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to update task');
    }
  }
);

// Начальное состояние с полем loading
const initialState: TasksState = {
  tasks: [],
  modal: {
    isOpen: false,
    task: null,
  },
  loading: false, // Добавляем поле loading
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setModal(state, action: PayloadAction<{ isOpen: boolean; task: TaskType | null }>) {
      state.modal.isOpen = action.payload.isOpen;
      state.modal.task = action.payload.task;
    },
  },
  extraReducers: (builder) => {
    builder
      // При начале асинхронной операции loading = true
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false; // Окончание загрузки
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false; // Ошибка загрузки
        console.error('Failed to fetch tasks');
      })
      
      // Для других операций
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(addNewTask.rejected, () => {
        console.error('Failed to create task');
      })

      .addCase(deleteTaskById.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTaskById.rejected, () => {
        console.error('Failed to delete task');
      })

      .addCase(updateTaskById.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskById.rejected, () => {
        console.error('Failed to update task');
      });
  },
});

export const { setModal } = tasksSlice.actions;
export default tasksSlice.reducer;
