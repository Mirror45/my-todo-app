export interface TaskType {
  id: string;
  text: string;
  done: boolean;
}
  
export interface TasksState {
  tasks: TaskType[];
  isDeleteModalOpen: boolean;
  taskToDelete: TaskType | null;
}