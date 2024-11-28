import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../store/slices/tasksSlice';
import styles from './TaskEditor.module.css';

interface TaskEditorProps {
  taskId: string;
  initialText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

const TaskEditor: React.FC<TaskEditorProps> = ({ taskId, initialText, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const [newText, setNewText] = useState(initialText);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSave(newText);
      dispatch(editTask({ id: taskId, newText })); // Делаем dispatch через useDispatch
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
            onSave(newText);
            dispatch(editTask({ id: taskId, newText })); // Делаем dispatch при сохранении
            onCancel();
          }}
        >
          Save
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskEditor;
