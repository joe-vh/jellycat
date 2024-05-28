import React from 'react';
import { render, screen } from '@testing-library/react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import App from './App';


test('renders title element', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const titleElement = screen.getByText(/Product List/i);
  expect(titleElement).toBeInTheDocument();
});
