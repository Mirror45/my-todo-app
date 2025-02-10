import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskEditor from './TaskEditor';
import { updateTaskById } from '../../store/slices/tasksSlice';
import * as reactRedux from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../store/slices/tasksSlice', () => ({
  updateTaskById: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockOnSave = jest.fn();
const mockOnCancel = jest.fn();

describe('TaskEditor Unit Test', () => {
  beforeEach(() => {
    (reactRedux.useDispatch as jest.MockedFunction<typeof reactRedux.useDispatch>)
      .mockReturnValue(mockDispatch);
        
    (reactRedux.useSelector as jest.MockedFunction<typeof reactRedux.useSelector>).mockReturnValue(() => ({
      tasks: [{ _id: '1', text: 'Initial Task' }]
    }));
  });
    
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders TaskEditor with initial task text', async () => {
    (reactRedux.useSelector as jest.MockedFunction<typeof reactRedux.useSelector>)
      .mockImplementation((callback) => callback({tasks: {
        tasks: [{ _id: '1', text: 'Initial Task' }],
      },
    }));

    render(<TaskEditor taskId="1" onSave={mockOnSave} onCancel={mockOnCancel} />);

    const input = await waitFor(() => screen.findByRole('textbox'));

    expect(input).toHaveValue('Initial Task');
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });
  
  it('updates input value on change', () => {
    render(<TaskEditor taskId="1" onSave={mockOnSave} onCancel={mockOnCancel} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Updated Task' } });

    expect(input).toHaveValue('Updated Task');
  });

  it('calls onSave with updated text when Enter is pressed', async () => {
    render(<TaskEditor taskId="1" onSave={mockOnSave} onCancel={mockOnCancel} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith('Updated Task');
    });
  });

  it('calls onCancel when Escape is pressed', () => {
    render(<TaskEditor taskId="1" onSave={mockOnSave} onCancel={mockOnCancel} />);

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('dispatches updateTaskById when Save is clicked', async () => {
    render(<TaskEditor taskId="1" onSave={mockOnSave} onCancel={mockOnCancel} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Updated Task' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(updateTaskById({ id: '1', updatedTask: { text: 'Updated Task' } }));
    });
  });
});
