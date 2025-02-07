import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Task from './Task';
import tasksReducer, { updateTaskById } from '../../store/slices/tasksSlice';
import { TaskProps } from '../../types/task-props';
import * as tasksSlice from '../../store/slices/tasksSlice';


jest.mock('../../components/TaskEditor/TaskEditor', () => (props: any) => (
  <div data-testid="task-editor">
    <button onClick={() => props.onSave('Updated Task')}>Save</button>
    <button onClick={props.onCancel}>Cancel</button>
  </div>
));

describe('Task Component', () => {
  let store: ReturnType<typeof configureStore>;
  let task: TaskProps['task'];

  beforeEach(() => {
    task = { _id: '1', text: 'Test Task', done: false };

    store = configureStore({
      reducer: { tasks: tasksReducer },
    });

    jest.spyOn(store, 'dispatch').mockImplementation(jest.fn());
    jest.spyOn(tasksSlice, 'updateTaskById').mockImplementation(jest.fn());
  });

  test('рендерит TaskEditor в режиме редактирования', () => {
    render(
      <Provider store={store}>
        <Task task={task} />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText(/Edit task/i));

    expect(screen.getByTestId('task-editor')).toBeInTheDocument();
  });

  test('handleToggleCompletion вызывает updateTaskById', () => {
    render(
      <Provider store={store}>
        <Task task={task} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Test Task/i));

    expect(store.dispatch).toHaveBeenCalledWith(
      updateTaskById({
        id: '1',
        updatedTask: { done: true },
      })
    );
  });

  test('рендерит кнопки Edit и Delete', () => {
    render(
      <Provider store={store}>
        <Task task={task} />
      </Provider>
    );

    expect(screen.getByLabelText(/Edit task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Delete task/i)).toBeInTheDocument();
  });

  test('рендерит кнопку Cancel в режиме редактирования', () => {
    render(
      <Provider store={store}>
        <Task task={task} />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText(/Edit task/i));
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });
});
