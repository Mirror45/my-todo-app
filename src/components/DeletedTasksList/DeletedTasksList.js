import React from 'react';
import { useDispatch } from 'react-redux';
import { restoreTask } from '../../store/slices/tasksSlice';
import styles from './DeletedTasksList.module.css';

function DeletedTasksList({ deletedTasks }) {
  const dispatch = useDispatch();

  const handleRestore = (taskId) => {
    dispatch(restoreTask(taskId)); // Восстановление задачи
  };

  return (
    <div className={styles.deletedTasksContainer}>
      <h3>Deleted Tasks</h3>
      {deletedTasks.length > 0 ? (
        deletedTasks.map((task) => (
          <div key={task.id} className={styles.deletedTask}>
            <span>{task.text}</span>
            <button onClick={() => handleRestore(task.id)}>Restore</button>
          </div>
        ))
      ) : (
        <p>No deleted tasks</p>
      )}
    </div>
  );
}

export default DeletedTasksList;
