import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal, removeTask } from '../../store/slices/tasksSlice';
import { RootState } from '../../store/store';
import styles from './DeleteConfirmationModal.module.css';

const DeleteConfirmationModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, task } = useSelector((state: RootState) => state.tasks.modal); // Получаем состояние модального окна и задачу из Redux

  // Закрытие модального окна
  const handleClose = () => {
    dispatch(setModal({ isOpen: false, task: null })); // Закрываем модальное окно
  };

  // Подтверждение удаления задачи
  const handleConfirm = () => {
    if (task) {
      dispatch(removeTask(task.id)); // Удаляем задачу через Redux
      handleClose(); // Закрываем модальное окно
    }
  };

  if (!isOpen || !task) return null; // Если модальное окно не открыто или задачи нет, ничего не рендерим

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <h3>Are you sure you want to delete this task?</h3>
        <p>{task.text}</p>
        <div className={styles.modalButtons}>
          <button className={styles.confirm} onClick={handleConfirm}>Yes</button>
          <button className={styles.cancel} onClick={handleClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
