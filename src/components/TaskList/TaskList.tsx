import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Task from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { TaskType } from '../../types/task-types';
import { RootState, AppDispatch } from '../../store/store';
import { fetchTasks } from '../../store/slices/tasksSlice'; // Асинхронный экшен
import styles from './TaskList.module.css';

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Используем AppDispatch для правильной типизации
  const { tasks, modal, loading } = useSelector((state: RootState) => state.tasks); // Получаем задачи, состояние модального окна и загрузку

  useEffect(() => {
    // Загружаем задачи с сервера при монтировании компонента
    dispatch(fetchTasks());
  }, [dispatch]);
  

  if (loading) {
    return <p className={styles.loadingText}>Загрузка задач...</p>; // Показываем индикатор загрузки
  }

  return (
    <div className={styles.taskListContainer}>
      <TaskForm />
      <div className={styles.cardsContainer}>
        {tasks.map((task: TaskType) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
      {modal.isOpen && modal.task && (
        <DeleteConfirmationModal />
      )}
    </div>
  );
};

export default TaskList;
