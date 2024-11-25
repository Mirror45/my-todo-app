import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskCompletion} from '../../store/slices/tasksSlice';
import TaskEditor from '../TaskEditor/TaskEditor';
import styles from './Task.module.css';

function Task({ task, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleToggleCompletion = () => dispatch(toggleTaskCompletion(task.id));

  return (
    <div className={styles.card}>
      {isEditing ? (
        <TaskEditor
          taskId={task.id}
          initialText={task.text}
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
            <button onClick={() => onDelete(task)}>Delete</button> {/* Передаем задачу родителю */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
