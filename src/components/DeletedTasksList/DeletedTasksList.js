import React from 'react';

function DeletedTasksList({ deletedTasks, onRestore }) {
  if (deletedTasks.length === 0) return null;

  return (
    <div>
      <h3>Deleted Tasks</h3>
      <ul>
        {deletedTasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => onRestore(task)}>Restore</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeletedTasksList;
