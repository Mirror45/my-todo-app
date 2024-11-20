import React, { useState } from 'react';
import TaskList from '../TaskList/TaskList';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build a project', done: false },
  ]);

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

  return (
    <div>
      <h1>My To-Do List</h1>
      <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} />
      <button onClick={() => addTask('New Task')}>Add Task</button>
    </div>
  );
}

export default App;
