import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './components/App/App';

// Указываем тип для root элемента
const rootElement = document.getElementById('root');

// Проверяем, что rootElement не null
if (!rootElement) {
  throw new Error("Root element not found. Please check the HTML structure.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
