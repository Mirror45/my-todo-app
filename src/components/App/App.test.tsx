import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from '../../store/store';

test('renders My Todo List title', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const titleElement = screen.getByText(/my todo list/i);
  expect(titleElement).toBeInTheDocument();
});
