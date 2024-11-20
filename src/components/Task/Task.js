import React from 'react';

function Task({ task, toggleTaskCompletion }) {
  return (
    <div onClick={() => toggleTaskCompletion(task.id)} style={{ cursor: 'pointer' }}>
      <span>{task.text}</span>
      <span>{task.done ? '(Completed)' : '(Pending)'}</span>
    </div>
  );
}

export default Task;