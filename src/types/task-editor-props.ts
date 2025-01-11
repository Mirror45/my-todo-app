export interface TaskEditorProps {
  taskId: string;
  onSave: (newText: string) => void;
  onCancel: () => void;  
}