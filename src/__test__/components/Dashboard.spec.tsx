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
      role: "patient",
      mobile: "",
      sapId: "",
    },
    isLoading: false,
    error: "",
  },
};

const mockStore = configureStore();
const store = mockStore(mockStoreData);

describe("Dashboard Component", () => {
  test("renders Dashboard component", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  });

  test.skip('opens ProjectForm modal when "Create Project" button is clicked', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    fireEvent.click(screen.getByText("Create Project"));
    expect(screen.getByText("Submit Project")).toBeInTheDocument();
  });

  test.skip('opens TaskForm modal when "Create Task" button is clicked', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    fireEvent.click(screen.getByText("Create Task"));
    expect(screen.getByText("Submit Task")).toBeInTheDocument();
  });

  test.skip("fetches projects and tasks on mount", async () => {
    const fetchProjects = jest.fn();
    const fetchTasks = jest.fn();
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    await waitFor(() => {
      expect(fetchProjects).toHaveBeenCalled();
      expect(fetchTasks).toHaveBeenCalled();
    });
  });

  test.skip('displays projects in "All Projects" tab', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(screen.getByText("Project 1")).toBeInTheDocument();
  });

  test.skip('displays tasks in "All Tasks" tab', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    fireEvent.click(screen.getByText("All Tasks"));
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });
});
