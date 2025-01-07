import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksState, Task } from '../types/tasksTypes';

const initialState: TasksState = {
  tasks: [],
  isDeleteModalOpen: false,
  taskToDelete: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTaskCompletion(state, action: PayloadAction<string>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) task.done = !task.done;
    },
    openDeleteModal(state, action: PayloadAction<Task>) {
      state.isDeleteModalOpen = true;
      state.taskToDelete = action.payload;
    },
    closeDeleteModal(state) {
      state.isDeleteModalOpen = false;
      state.taskToDelete = null;
    },
    editTask(state, action: PayloadAction<{ id: string, newText: string }>) {
      const { id, newText } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) task.text = newText;
    },
  },
});

export const {
  setTasks,
  addTask,
  removeTask,
  toggleTaskCompletion,
  openDeleteModal,
  closeDeleteModal,
  editTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
