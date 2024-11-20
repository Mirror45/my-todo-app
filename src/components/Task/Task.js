import React from 'react';

function Task({ task, toggleTaskCompletion }) {
  return (
    <li>
      <span onClick={() => toggleTaskCompletion(task.id)} style={{ cursor: 'pointer' }}>
        {task.text} {task.done ? '(Completed)' : '(Pending)'}
      </span>
    </li>
  );
}

export default Task;