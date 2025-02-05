import { render, screen} from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import TaskList from './TaskList';
import { AppDispatch } from '../../store/store'; // Импортируем типы из store
import { jest } from '@jest/globals'; // Для jest

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('TaskList (Unit Test)', () => {
  const mockDispatch: AppDispatch = jest.fn() as AppDispatch; // Приводим к типу AppDispatch

  const loadingText = "Загрузка задач...";
  const testTaskText = "Test Task";

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(mockDispatch);
  });

  it('renders loading state', () => {
    (useSelector as jest.MockedFunction<typeof useSelector>).mockReturnValue({
      tasks: [],
      modal: { isOpen: false },
      loading: true,
    });

    render(<TaskList />);

    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });

  it('renders task list when tasks exist', async () => {
    (useSelector as jest.MockedFunction<typeof useSelector>).mockReturnValue({
      tasks: [{ _id: '1', text: 'Test Task', completed: false }],
      modal: { isOpen: false },
      loading: false,
    });

    render(<TaskList />);

    const task = await screen.findByText(testTaskText);
    expect(task).toBeInTheDocument();
  });

  it('dispatches fetchTasks on mount', () => {
    (useSelector as jest.MockedFunction<typeof useSelector>).mockReturnValue({
      tasks: [],
      modal: { isOpen: false },
      loading: false,
    });

    render(<TaskList />);

    expect(mockDispatch).toHaveBeenCalled();
  });
});
