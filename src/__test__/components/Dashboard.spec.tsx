import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Dashboard from "../../components/Dashboard";
import { IStore } from "../../interfaces/store";

const mockStoreData: IStore = {
  user: {
    data: {
      name: "",
      email: "",
      role: "employee",
      mobile: "",
    },
    isLoading: false,
    error: "",
  },
};

const mockStore = configureStore();
const store = mockStore(mockStoreData);

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