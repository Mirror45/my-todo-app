import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModal, updateTaskById } from '../../store/slices/tasksSlice';
import { AppDispatch } from '../../store/store';
import TaskEditor from '../TaskEditor/TaskEditor';
import { TaskProps } from '../../types/task-props';
import styles from './Task.module.css';

const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleCompletion = () => {
    // Переключаем состояние выполнения задачи
    dispatch(updateTaskById({
      id: task._id,
      updatedTask: { done: !task.done }
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true); // Включаем режим редактирования
  };

  const handleCancel = () => {
    setIsEditing(false); // Отменяем редактирование
  };

  const handleEditTask = (newText: string) => {
    dispatch(updateTaskById({
      id: task._id,
      updatedTask: { text: newText }
    })); // Редактируем задачу через Redux
    setIsEditing(false); // Выключаем режим редактирования
  };

  const handleDeleteClick = () => {
    dispatch(setModal({ isOpen: true, task })); // Открываем модальное окно для подтверждения удаления
  };

  return (
    <div className={styles.card}>
      {isEditing ? (
        <TaskEditor
          taskId={task._id}
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
