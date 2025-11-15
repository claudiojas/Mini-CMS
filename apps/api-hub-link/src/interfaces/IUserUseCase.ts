import { IUser } from './IUser';

export interface ICreateUserUseCase {
  execute(user: IUser): Promise<IUser>;
}

export interface IGetUserByIdUseCase {
  execute(id: number): Promise<IUser | null>;
}

export interface IGetUserByEmailUseCase {
  execute(email: string): Promise<IUser | null>;
}
