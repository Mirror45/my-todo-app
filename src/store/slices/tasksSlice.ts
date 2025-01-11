import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksState, TaskType } from '../../types/task-types';

const initialState: TasksState = {
  tasks: [],
  modal: {
    isOpen: false,
    task: null, // Храним задачу для модального окна, если нужно
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Устанавливаем список задач
    setTasks(state, action: PayloadAction<TaskType[]>) {
      state.tasks = action.payload;
    },

    // Добавляем новую задачу
    addTask(state, action: PayloadAction<TaskType>) {
      state.tasks.push(action.payload);
    },

    // Удаляем задачу по id
    removeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    // Переключаем состояние выполнения задачи
    toggleTaskCompletion(state, action: PayloadAction<string>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.done = !task.done;
      }
    },

    // Открываем модальное окно с задачей
    setModal(state, action: PayloadAction<{ isOpen: boolean; task: TaskType | null }>) {
      state.modal.isOpen = action.payload.isOpen;
      state.modal.task = action.payload.task;
    },

    // Редактируем задачу по id
    editTask(state, action: PayloadAction<{ id: string; newText: string }>) {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.newText;
      }
    },
  },
});

export const {
  setTasks,
  addTask,
  removeTask,
  toggleTaskCompletion,
  setModal,
  editTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
