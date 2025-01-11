export interface TaskType {
  id: string;
  text: string;
  done: boolean;
}
  
export interface TasksState {
  tasks: TaskType[];
  modal: {
    isOpen: boolean;
    task: TaskType | null;
  };
}