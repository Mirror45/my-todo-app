import React from 'react';
import Task from '../Task/Task';

function TaskList({ tasks, toggleTaskCompletion }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      ))}
    </ul>
  );
}

export default TaskList;