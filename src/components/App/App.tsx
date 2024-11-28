import React from 'react';
import TaskList from '../TaskList/TaskList';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <h1>My Todo List</h1>
      <TaskList />
    </div>
  );
};

export default App;
