export interface IUser {
  id?: number;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IAuthToken {
  token: string;
}

export interface IJWTPayload {
  userId: number;
  email: string;
}
