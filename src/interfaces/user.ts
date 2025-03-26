export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: "patient" | "provider";
  mobile: string;
  sapId: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserInfo {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  medications: string[];
  allergies: string[];
  goal: {
    steps: number;
    sleepHours: number;
    waterIntake: number;
  };
  actualProgress: {
    date?: Date;
    steps: number;
    sleepHours: number;
    waterIntake: number;
  }[];
  preventiveCare: {
    test: string;
    date: string;
  }[];
  providerId: string;
}

export const defaultUser: IUser = {
  name: "",
  email: "",
  password: "",
  role: "patient",
  mobile: "",
  sapId: "",
};

export function capitalizeFirstLetter(str: string) {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
