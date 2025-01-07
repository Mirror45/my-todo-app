export interface TaskEditorProps {
  taskId: string;
  initialText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;  
}