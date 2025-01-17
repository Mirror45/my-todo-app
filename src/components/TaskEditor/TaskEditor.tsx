import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchTasks, updateTaskById } from '../../store/slices/tasksSlice'; // Для обновления задачи
import { TaskEditorProps } from '../../types/task-editor-props';
import styles from './TaskEditor.module.css';

const TaskEditor: React.FC<TaskEditorProps> = ({ taskId, onSave, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Получаем начальное значение для редактируемой задачи из Redux
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task._id === taskId)
  );

  const [newText, setNewText] = useState(task ? task.text : ''); // Состояние для редактируемого текста
  const [loading, setLoading] = useState(false); // Состояние для отслеживания загрузки

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

  const handleSave = async () => {
    if (!newText.trim()) {
      alert('Text cannot be empty');
      return;
    }

    if (task) {
      try {
        setLoading(true); // Начинаем загрузку
        // Делаем запрос на обновление задачи
        await dispatch(updateTaskById({ id: task._id, updatedTask: { text: newText } })).unwrap();
        // Перезагружаем задачи, чтобы обновить данные после сохранения
        await dispatch(fetchTasks()).unwrap(); // Загружаем актуальные данные
        onSave(newText); // Вызываем onSave, передавая новый текст
      } catch (error) {
        console.error('Failed to update task:', error);
        alert('Failed to update task');
      } finally {
        setLoading(false); // Завершаем загрузку
      }
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
        disabled={loading} // Блокируем поле ввода при загрузке
      />
      <div className={styles.editorButtons}>
        <button 
          type="submit" 
          onClick={handleSave} 
          aria-label="Save task"
          disabled={loading} // Блокируем кнопку сохранения при загрузке
        >
          {loading ? 'Saving...' : 'Save'} {/* Показать текст в зависимости от загрузки */}
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          aria-label="Cancel"
          disabled={loading} // Блокируем кнопку отмены при загрузке
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskEditor;
