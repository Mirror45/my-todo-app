import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from '../../store/slices/tasksSlice';
import { AppDispatch, RootState } from '../../store/store';
import styles from './TaskForm.module.css';

const TaskForm: React.FC = () => {
  const [taskText, setTaskText] = useState<string>(''); // Состояние для текста задачи
  const dispatch = useDispatch<AppDispatch>(); // Диспатч для отправки экшенов
  const loading = useSelector((state: RootState) => state.tasks.loading); // Состояние загрузки из Redux

  // Обработчик отправки формы
  const handleSubmit = () => {
    // e.preventDefault();
    if (taskText.trim()) { // Проверяем, что текст задачи не пустой
      const newTask = { text: taskText, description: '', done: false }; // Создаем новую задачу
      dispatch(addNewTask(newTask)) // Диспатчим экшен для добавления задачи в Redux
        .unwrap() // Используем unwrap, чтобы дождаться выполнения асинхронной операции
        .then(() => {
          setTaskText(''); // Очищаем поле ввода после успешного добавления задачи
        })
        .catch((error) => {
          console.error('Failed to add task:', error); // В случае ошибки выводим в консоль
        });
    } else {
      console.error('Task text cannot be empty!'); // Если текст пустой, выводим ошибку
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)} // Обновляем состояние текста задачи
        className={styles.inputField}
        placeholder="Add new task"
        required
      />
      <button type="submit" className={styles.addButton} disabled={loading}>
        {loading ? 'Adding...' : 'Add Task'} {/* Показать индикатор загрузки */}
      </button>
    </form>
  );
};

export default TaskForm;
