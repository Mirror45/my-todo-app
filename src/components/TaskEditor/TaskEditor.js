import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../store/slices/tasksSlice';
import styles from './TaskEditor.module.css';

function TaskEditor({ taskId, initialText, onCancel }) {
  const [newText, setNewText] = useState(initialText);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setNewText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(editTask({ id: taskId, newText }));
      onCancel();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className={styles.editorContainer}>
      <input
        className={styles.editorInput}
        type="text"
        value={newText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <div className={styles.editorButtons}>
        <button
          onClick={() => {
            dispatch(editTask({ id: taskId, newText }));
            onCancel();
          }}
        >
          Save
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default TaskEditor;
