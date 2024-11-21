import React, { useState } from 'react';
import styles from './TaskEditor.module.css';

function TaskEditor({ task, onSave, onCancel }) {
  const [newText, setNewText] = useState(task.text); 

  const handleInputChange = (e) => {  // Обновляет состояние newText новыми данными из поля ввода.
    setNewText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSave(newText);
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
        <button onClick={() => onSave(newText)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default TaskEditor;
