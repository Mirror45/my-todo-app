import React, { useState } from 'react';
import Task from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import DeletedTasksList from '../DeletedTasksList/DeletedTasksList';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState(null);

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
    <div>
      <TaskForm addTask={addTask} />
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          onDelete={() => confirmDelete(task.id)}
          editTask={editTask}  // Передаем editTask в компонент Task
        />
      ))}
      <DeletedTasksList
        deletedTasks={deletedTasks}
        onRestore={(task) => {
          setTasks([...tasks, task]);
          setDeletedTasks(deletedTasks.filter((t) => t.id !== task.id));
        }}
      />
      <DeleteConfirmationModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleDelete}
        task={taskToDelete}
      />
    </div>
  );
}

export default TaskList;
