import React from 'react';
import { useSelector } from 'react-redux';
import Task from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { TaskType } from '../../types/task-types';
import { RootState } from '../../store/store';
import styles from './TaskList.module.css';

const TaskList: React.FC = () => {
  const { tasks, modal } = useSelector((state: RootState) => state.tasks); // Получаем все задачи и состояние модального окна

  return (
    <div className={styles.taskListContainer}>
      <TaskForm />
      <div className={styles.cardsContainer}>
        {tasks.map((task: TaskType) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      {modal.isOpen && modal.task && (
        <DeleteConfirmationModal/>
      )}
    </div>
  );
};

export default TaskList;
