export interface Task {
    id: string;
    text: string;
    done: boolean;
}
  
export interface TasksState {
    tasks: Task[];
    deletedTasks: Task[];
    isDeleteModalOpen: boolean;
    taskToDelete: Task | null;
}
  