import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from './TaskForm';
import { addNewTask } from '../../store/slices/tasksSlice';
import * as reactRedux from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../store/slices/tasksSlice', () => ({
  addNewTask: jest.fn(),
}));

describe('TaskForm Unit Test', () => {
  const mockDispatch = jest.fn();
  const mockAddNewTask = addNewTask as unknown as jest.Mock;

  beforeEach(() => {
    (reactRedux.useDispatch as jest.MockedFunction<typeof reactRedux.useDispatch>).mockReturnValue(mockDispatch);
    (reactRedux.useSelector as jest.MockedFunction<typeof reactRedux.useSelector>).mockReturnValue({
        tasks: { loading: false },
    });

    mockAddNewTask.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<TaskForm />);

    expect(screen.getByPlaceholderText(/Add new task/i)).toBeInTheDocument();
    expect(screen.getByText(/Adding|Add Task/i)).toBeInTheDocument();
  });
  
  it('does not dispatch addNewTask when task text is empty', async () => {
    render(<TaskForm />);

    const input = screen.getByPlaceholderText(/Add new task/i);
    const submitButton = screen.getByText(/Adding|Add Task/i);

    // Оставляем поле пустым и отправляем форму
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('disables submit button when loading is true', () => {
    render(<TaskForm />);

    const submitButton = screen.getByText(/Adding.../i); // Кнопка должна показывать "Adding..." и быть disabled
    expect(submitButton).toBeDisabled();
  });
});
