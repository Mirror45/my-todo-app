import React, { useState } from 'react';
import styles from './TaskForm.module.css';

function TaskForm({ addTask }) {
  const [newTask, setNewTask] = useState(''); // Храним текст новой задачи

  const handleSubmit = (event) => {
    event.preventDefault(); // Останавливаем стандартное поведение формы
    if (newTask) { // Если поле не пустое
      addTask(newTask); // Добавляем задачу через родительскую функцию
      setNewTask(''); // Очищаем поле ввода
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}> {/* При сабмите формы вызываем handleSubmit */}
      <input
        type="text"
        value={newTask} // Значение из состояния newTask
        onChange={(e) => setNewTask(e.target.value)} // Обновляем состояние при изменении
        className={styles.inputField}
        placeholder="Add new task"
      />
      <button type="submit" className={styles.addButton}>Add Task</button>
    </form>
  );
}

export default TaskForm;
