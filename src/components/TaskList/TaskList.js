import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, setDeletedTasks, removeTask, toggleTaskCompletion, addDeletedTask, editTask } from '../../store/slices/tasksSlice';
import Task from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import DeletedTasksList from '../DeletedTasksList/DeletedTasksList';
import styles from './TaskList.module.css';

function TaskList() {
  const dispatch = useDispatch();
  const { tasks, deletedTasks } = useSelector((state) => state.tasks);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      dispatch(setTasks(savedTasks)); 
    }

    const savedDeletedTasks = JSON.parse(localStorage.getItem('deletedTasks'));
    if (savedDeletedTasks) {
      dispatch(setDeletedTasks(savedDeletedTasks)); 
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks)); 
  }, [tasks, deletedTasks]); 

  const handleToggleTaskCompletion = useCallback((id) => {
    dispatch(toggleTaskCompletion(id));
  }, [dispatch]);

  const handleEditTask = (id, newText) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit && taskToEdit.text) {
      dispatch(editTask({ id, newText }));
    }
  };

  const handleDeleteTask = useCallback((task) => {
    dispatch(addDeletedTask(task)); // Добавляем задачу в удалённые
    dispatch(removeTask(task.id)); // Удаляем задачу из активных
    setTaskToDelete(null); // Закрываем модальное окно
  }, [dispatch]);

  return (
    <div className={styles.taskListContainer}>
      <TaskForm />
      <div className={styles.cardsContainer}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleTaskCompletion={handleToggleTaskCompletion}
            onDelete={setTaskToDelete} // Передаем функцию для открытия модального окна
            editTask={handleEditTask}
          />
        ))}
        {taskToDelete && (
          <DeleteConfirmationModal
            isOpen={!!taskToDelete}
            onClose={() => setTaskToDelete(null)}
            onConfirm={() => handleDeleteTask(taskToDelete)} // Удаление задачи
            task={taskToDelete}
          />
        )}
      </div>
      <DeletedTasksList deletedTasks={deletedTasks} />
    </div>
  );
}

export default TaskList;
