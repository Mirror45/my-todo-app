import { render, screen, fireEvent } from '@testing-library/react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { setModal, deleteTaskById } from '../../store/slices/tasksSlice';
import * as reactRedux from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../store/slices/tasksSlice', () => ({
    deleteTaskById: jest.fn(),
    setModal: jest.fn(),
}));

describe('DeleteConfirmationModal Unit Test', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (reactRedux.useDispatch as jest.MockedFunction<typeof reactRedux.useDispatch>).mockReturnValue(mockDispatch);
    (reactRedux.useSelector as jest.MockedFunction<typeof reactRedux.useSelector>).mockReturnValue({
      isOpen: true,
      task: { _id: '123', text: 'Test Task' },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal correctly when open', () => {
    render(<DeleteConfirmationModal />);

    expect(screen.getByText(/Are you sure you want to delete this task\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
  });

  it('dispatches setModal when clicking No', () => {
    render(<DeleteConfirmationModal />);

    fireEvent.click(screen.getByLabelText('Cancel'));

    expect(mockDispatch).toHaveBeenCalledWith(setModal({ isOpen: false, task: null }));
  });

  it('dispatches deleteTaskById and closes modal when clicking Yes', () => {
    render(<DeleteConfirmationModal />);

    fireEvent.click(screen.getByLabelText('Confirm'));

    expect(mockDispatch).toHaveBeenCalledWith(deleteTaskById('123'));
    expect(mockDispatch).toHaveBeenCalledWith(setModal({ isOpen: false, task: null }));
  });

  it('does not render when isOpen is false', () => {
    (reactRedux.useSelector as jest.MockedFunction<typeof reactRedux.useSelector>).mockReturnValue({ isOpen: false, task: null });

    render(<DeleteConfirmationModal />);

    expect(screen.queryByText(/Are you sure you want to delete this task\?/i)).not.toBeInTheDocument();
  });
});
