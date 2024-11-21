import React from 'react';
import styles from './DeletedTasksList.module.css';

function DeletedTasksList({ deletedTasks, onRestore }) {
  if (deletedTasks.length === 0) return null;

  return (
    <div className={styles.deletedTasksContainer}>
      <h3 className={styles.deletedTasksHeader}>Deleted Tasks</h3>
      <ul>
        {deletedTasks.map((task) => (
          <li key={task.id} className={styles.deletedTask}>
            <span>{task.text}</span>
            <button className={styles.restore} onClick={() => onRestore(task)}>Restore</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeletedTasksList;
