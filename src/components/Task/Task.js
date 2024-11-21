import React, { useState } from 'react';
import TaskEditor from '../TaskEditor/TaskEditor';
import styles from './Task.module.css';

function Task({ task, toggleTaskCompletion, onDelete, editTask }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = (newText) => {
    editTask(task.id, newText);  // Вызов editTask
    setIsEditing(false);
  };

  return (
    <div className={styles.card}>
      {isEditing ? (
        <TaskEditor task={task} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <div className={styles.cardContent}> 
            <span 
              className={`${styles.taskText} ${task.done ? 'completed' : ''}`}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.text}
            </span>
            <div className={styles.cardActions}>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Task;
