import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { IStore } from "../../interfaces/store";
import { IUserInfo } from "../../interfaces/user";
import * as api from "../../utils/api";
import UserInfo from "../../components/UserInfo";

const mockStore = configureStore([]);

jest.mock("../../utils/api");

const mockUser: IUserInfo = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  dob: "1990-01-01",
  gender: "Male",
  medications: ["Medication1", "Medication2"],
  allergies: ["Allergy1", "Allergy2"],
  preventiveCare: [
    { test: "Blood Test", date: "2023-01-01" },
    { test: "X-Ray", date: "2023-02-01" },
  ],
  providerId: "provider123",
  goal: {
    steps: 10000,
    sleepHours: 8,
    waterIntake: 2,
  },
  actualProgress: [
    {
      date: "2023-03-01" as unknown as Date,
      steps: 9000,
      sleepHours: 7,
      waterIntake: 1.5,
    },
    {
      date: "2023-03-02" as unknown as Date,
      steps: 11000,
      sleepHours: 8,
      waterIntake: 2,
    },
  ],
  _id: "",
  userId: "2134knm",
};

describe("UserInfo Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      user: { data: { _id: "user123" } },
    } as IStore);

    (api.customFetch as jest.Mock).mockResolvedValue({
      data: mockUser,
      success: true,
    });
  });

  it("renders user information correctly", async () => {
    render(
      <Provider store={store}>
        <UserInfo />
      </Provider>
    );
  });
});
