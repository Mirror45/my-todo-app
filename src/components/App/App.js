import React from 'react';
import TaskList from '../TaskList/TaskList';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h1>My Todo List</h1>
      <TaskList />
    </div>
  );
}

export default App;
