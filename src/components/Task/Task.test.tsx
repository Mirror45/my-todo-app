import { render, screen, fireEvent } from '@testing-library/react';
import Task from '../../components/Task/Task';
import { updateTaskById } from '../../store/slices/tasksSlice';
import { TaskProps } from '../../types/task-props';
import * as reactRedux from 'react-redux';

// Мокаем useDispatch и useSelector
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Мокаем TaskEditor
jest.mock('../../components/TaskEditor/TaskEditor', () => {
  return ({ onSave, onCancel }: { onSave: (text: string) => void, onCancel: () => void }) => (
    <div data-testid="task-editor">
      <button onClick={() => onSave('Updated Task')}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
});

jest.mock('../../store/slices/tasksSlice', () => ({
  updateTaskById: jest.fn(),
}));

describe('Task Component Unit Tests', () => {
  let task: TaskProps['task'];
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    task = { _id: '1', text: 'Test Task', done: false };

    // Создаём мок для dispatch и useSelector
    mockDispatch = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch);
    jest.spyOn(reactRedux, 'useSelector').mockImplementation((selectorFn) => {
      return selectorFn({ tasks: { list: [] } }); // Пример начального состояния
    });    
  });

  afterEach(() => {
    jest.clearAllMocks(); // Сбрасывает вызовы mock-функций
  });

  test('рендерит TaskEditor в режиме редактирования', () => {
    render(<Task task={task} />);

    fireEvent.click(screen.getByLabelText(/Edit task/i));

    expect(screen.getByTestId('task-editor')).toBeInTheDocument();
  });

  test('handleToggleCompletion вызывает updateTaskById', () => {
    render(<Task task={task} />);

    fireEvent.click(screen.getByText(/Test Task/i));

    expect(mockDispatch).toHaveBeenCalledWith(
      updateTaskById({
        id: '1',
        updatedTask: { done: true },
      })
    );
  });

  test('рендерит кнопки Edit и Delete', () => {
    render(<Task task={task} />);

    expect(screen.getByLabelText(/Edit task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Delete task/i)).toBeInTheDocument();
  });

  test('рендерит кнопку Cancel в режиме редактирования', () => {
    render(<Task task={task} />);

    fireEvent.click(screen.getByLabelText(/Edit task/i));
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });
});
