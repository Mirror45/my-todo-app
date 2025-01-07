export interface Task {
    id: string;
    text: string;
    done: boolean;
}
  
export interface TasksState {
    tasks: Task[];
    isDeleteModalOpen: boolean;
    taskToDelete: Task | null;
}
  