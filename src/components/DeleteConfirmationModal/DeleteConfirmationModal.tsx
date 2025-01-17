import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal, deleteTaskById } from '../../store/slices/tasksSlice'; // Обновлено на правильное действие
import { AppDispatch, RootState } from '../../store/store';
import styles from './DeleteConfirmationModal.module.css';

const DeleteConfirmationModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, task } = useSelector((state: RootState) => state.tasks.modal); // Получаем состояние модального окна и задачу из Redux

  // Закрытие модального окна
  const handleClose = () => {
    dispatch(setModal({ isOpen: false, task: null })); // Закрываем модальное окно
  };

  // Подтверждение удаления задачи
  const handleConfirm = () => {
    if (task) {
      dispatch(deleteTaskById(task._id)); // Удаляем задачу через Redux
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
          <button className={styles.confirm} onClick={handleConfirm} aria-label="Confirm">Yes</button>
          <button className={styles.cancel} onClick={handleClose} aria-label="Cancel">No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
