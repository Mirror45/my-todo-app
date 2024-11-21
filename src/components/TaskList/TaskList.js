import React, { useState, useEffect } from 'react';
import Task from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import DeletedTasksList from '../DeletedTasksList/DeletedTasksList';
import styles from './TaskList.module.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    // Загружаем задачи из localStorage, если они есть
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  
    const savedDeletedTasks = JSON.parse(localStorage.getItem('deletedTasks'));
    if (savedDeletedTasks) {
      setDeletedTasks(savedDeletedTasks);
    }
  }, []);
  
  useEffect(() => {
    // Сохраняем задачи в localStorage при изменении
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    if (deletedTasks.length > 0) {
      localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
    }
  }, [tasks, deletedTasks]); // Срабатывает при изменении tasks или deletedTasks

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, done: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const confirmDelete = (id) => {
    const task = tasks.find((task) => task.id === id);
    setTaskToDelete(task);
  };

  const handleDelete = () => {
    setDeletedTasks([...deletedTasks, taskToDelete]);
    setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  return (
    <div className={styles.taskListContainer}>
      <TaskForm addTask={addTask} />
      <div className={styles.cardsContainer}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            onDelete={() => confirmDelete(task.id)}
            editTask={editTask}
          />
        ))}
        <DeleteConfirmationModal
          isOpen={!!taskToDelete}
          onClose={() => setTaskToDelete(null)}
          onConfirm={handleDelete}
          task={taskToDelete}
        />
      </div>
      <DeletedTasksList
          deletedTasks={deletedTasks}
          onRestore={(task) => {
            setTasks([...tasks, task]);
            setDeletedTasks(deletedTasks.filter((t) => t.id !== task.id));
          }}
        />
    </div>
  );
}

export default TaskList;
