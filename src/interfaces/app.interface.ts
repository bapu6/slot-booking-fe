export interface IFilter {
  name: string;
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
  currentProgress: {
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
