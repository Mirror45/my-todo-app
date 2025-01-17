export interface TaskType {
  _id: string;
  text: string;
  done: boolean;
}
  
export interface TasksState {
  tasks: TaskType[];
  modal: {
    isOpen: boolean;
    task: TaskType | null;
  };
  loading: boolean;
}