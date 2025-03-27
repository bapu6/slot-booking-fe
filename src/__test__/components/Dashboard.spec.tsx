import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from '../../components/Dashboard';

const mockStore = configureStore([]);
const store = mockStore({
  loginUser: {
    data: { token: 'valid-token' }, // Ensure this matches your expected state
  },
});

describe('App Component', () => {
  it('renders App component with loading state', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      );
    });
  });
});