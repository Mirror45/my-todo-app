import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, removeTask, toggleTaskCompletion, editTask } from '../../store/slices/tasksSlice';
import Task from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { TaskType } from '../../types/task-types';
import styles from './TaskList.module.css';


const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: any) => state.tasks);
  const [taskToDelete, setTaskToDelete] = useState<TaskType | null>(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (savedTasks) {
      dispatch(setTasks(savedTasks)); 
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
  }, [tasks]); 

  const handleToggleTaskCompletion = (id: string) => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleEditTask = (id: string, newText: string) => {
    const taskToEdit = tasks.find((task: TaskType) => task.id === id);
    if (taskToEdit && taskToEdit.text) {
      dispatch(editTask({ id, newText }));
    }
  };

  const handleDeleteTask = (task: TaskType) => {
    dispatch(removeTask(task.id)); // Удаляем задачу из активных
    setTaskToDelete(null); // Закрываем модальное окно
  };

  return (
    <div className={styles.taskListContainer}>
      <TaskForm />
      <div className={styles.cardsContainer}>
        {tasks.map((task: TaskType) => (
          <Task
            key={task.id}
            task={task}
            toggleTaskCompletion={handleToggleTaskCompletion}
            onDelete={setTaskToDelete} // Передаем функцию для открытия модального окна
            editTask={handleEditTask}
          />
        ))}
        {taskToDelete && (
          <DeleteConfirmationModal
            isOpen={!!taskToDelete}
            onClose={() => setTaskToDelete(null)}
            onConfirm={() => handleDeleteTask(taskToDelete)} // Удаление задачи
            task={taskToDelete}
          />
        )}
      </div>
    </div>
  );
};

export default TaskList;
