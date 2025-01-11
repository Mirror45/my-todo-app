import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, setModal, toggleTaskCompletion } from '../../store/slices/tasksSlice';
import TaskEditor from '../TaskEditor/TaskEditor';
import { TaskProps } from '../../types/task-props';
import styles from './Task.module.css';

const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleCompletion = () => {
    dispatch(toggleTaskCompletion(task.id)); // Переключаем состояние выполнения задачи через Redux
  };

  const handleEditClick = () => {
    setIsEditing(true); // Включаем режим редактирования
  };

  const handleCancel = () => {
    setIsEditing(false); // Отменяем редактирование
  };

  const handleEditTask = (newText: string) => {
    dispatch(editTask({ id: task.id, newText })); // Редактируем задачу через Redux
    setIsEditing(false); // Выключаем режим редактирования
  };

  const handleDeleteClick = () => {
    dispatch(setModal({ isOpen: true, task })); // Открываем модальное окно для подтверждения удаления
  };

  return (
    <div className={styles.card}>
      {isEditing ? (
        <TaskEditor
          taskId = {task.id}
          onSave={handleEditTask}  // передаем функцию сохранения
          onCancel={handleCancel}   // передаем функцию отмены
        />
      ) : (
        <div className={styles.cardContent}>
          <span
            className={`${styles.taskText} ${task.done ? styles.completed : ''}`}
            onClick={handleToggleCompletion}
          >
            {task.text}
          </span>
          <div className={styles.cardActions}>
            <button onClick={handleEditClick} aria-label="Edit task">Edit</button>
            <button onClick={handleDeleteClick} aria-label="Delete task">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
