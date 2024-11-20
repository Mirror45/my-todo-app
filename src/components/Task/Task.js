import React, { useState } from 'react';
import TaskEditor from '../TaskEditor/TaskEditor';

function Task({ task, toggleTaskCompletion, editTask, deleteTask  }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = (newText) => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <TaskEditor task={task} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <span onClick={() => toggleTaskCompletion(task.id)} style={{ cursor: 'pointer' }}>
            {task.text} {task.done ? '(Completed)' : '(Pending)'}
          </span>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default Task;
