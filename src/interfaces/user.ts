export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "employee";
  mobile: string;
  sapId: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export const defaultUser: IUser = {
  name: "",
  email: "",
  password: "",
  role: "employee",
  mobile: "",
  sapId: "",
};


export interface ISlotObject{
  tower: number;
  slotId: number;
  date: string;
  userId?: string;
}


