import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { editTask } from '../../store/slices/tasksSlice';
import { TaskEditorProps } from '../../types/task-editor-props';
import styles from './TaskEditor.module.css';

const TaskEditor: React.FC<TaskEditorProps> = ({ taskId, onSave, onCancel }) => {
  const dispatch = useDispatch();

  // Получаем начальное значение для редактируемой задачи из Redux
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task.id === taskId)
  );

  const [newText, setNewText] = useState(task ? task.text : '');

  // Обновляем текст при изменении задачи в Redux
  useEffect(() => {
    if (task) {
      setNewText(task.text);
    }
  }, [task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleSave = () => {
    if (!newText.trim()) {
      alert('Text cannot be empty');
      return;
    }

    if (task) {
      dispatch(editTask({ id: task.id, newText })); // Делаем dispatch через Redux
      onSave(newText); // Вызываем onSave, передавая новый текст
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
        <button type="submit" onClick={handleSave} aria-label="Save task">Save</button>
        <button type="button" onClick={onCancel} aria-label="Cancel">Cancel</button>
      </div>
    </div>
  );
};

export default TaskEditor;
