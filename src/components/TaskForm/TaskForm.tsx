import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/slices/tasksSlice';
import styles from './TaskForm.module.css';

// Тип для новой задачи
interface TaskType {
  id: string;
  text: string;
  done: boolean;
}

const TaskForm: React.FC = () => {
  const [taskText, setTaskText] = useState<string>('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskText.trim()) {
      const newTask: TaskType = { id: Date.now().toString(), text: taskText, done: false };
      dispatch(addTask(newTask)); // Отправляем действие в Redux
      setTaskText(''); // Очищаем поле ввода
    } else {
      console.error('Task text cannot be empty!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className={styles.inputField}
        placeholder="Add new task"
      />
      <button type="submit" className={styles.addButton}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
