import axios from 'axios';
import { TaskType } from '../types/task-types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/tasks';

// Получение списка задач
export const getTasks = async (): Promise<TaskType[]> => {
  try {
    const response = await axios.get<TaskType[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
};

// Создание новой задачи
export const createTask = async (task: Omit<TaskType, '_id'>): Promise<TaskType> => {
  try {
    const response = await axios.post<TaskType>(API_URL, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
};

// Обновление задачи
export const updateTask = async (id: string, updatedTask: Partial<TaskType>): Promise<TaskType> => {
  try {
    const response = await axios.put<TaskType>(`${API_URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');
  }
};

// Удаление задачи
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
};
