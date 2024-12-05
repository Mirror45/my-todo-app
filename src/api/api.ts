import axios from 'axios';
import { Task } from '../store/types/tasksTypes'; // Предполагается, что тип Task уже описан

const API_URL = 'http://localhost:3000/tasks'; // Укажи свой адрес

// Получение списка задач
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

// Создание новой задачи
export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const response = await axios.post<Task>(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};

// Обновление существующей задачи
export const updateTask = async (id: string, updatedTask: Partial<Task>): Promise<Task> => {
  try {
    const response = await axios.put<Task>(`${API_URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};

// Удаление задачи
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
};
