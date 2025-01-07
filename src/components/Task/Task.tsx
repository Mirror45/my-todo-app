import React, { useState } from 'react';
import TaskEditor from '../TaskEditor/TaskEditor';
import { TaskProps } from '../../types/task-props';
import styles from './Task.module.css';


const Task: React.FC<TaskProps> = ({ task, onDelete, toggleTaskCompletion, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleToggleCompletion = () => toggleTaskCompletion(task.id);

  const handleEditTask = (newText: string) => {
    editTask(task.id, newText);  // Используем функцию editTask для обновления текста задачи
    setIsEditing(false);
  };

  return (
    <div className={styles.card}>
      {isEditing ? (
        <TaskEditor
          taskId={task.id}
          initialText={task.text}
          onSave={handleEditTask}  // Передаем handleEditTask через onSave
          onCancel={handleCancel}
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
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => onDelete(task)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
