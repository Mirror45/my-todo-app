import { TaskType } from './task-types';

export interface TaskProps {
  task: TaskType;
  onDelete: (task: TaskType) => void;
  toggleTaskCompletion: (id: string) => void;
  editTask: (id: string, newText: string) => void;
}
