import React from 'react';
import styles from './DeleteConfirmationModal.module.css';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: {
    id: string;
    text: string;
  };
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, task }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <h3>Are you sure you want to delete this task?</h3>
        <p>{task.text}</p>
        <div className={styles.modalButtons}>
          <button className={styles.confirm} onClick={onConfirm}>Yes</button>
          <button className={styles.cancel} onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
