import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// Типизация для Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export default store;