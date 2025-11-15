import { IUser } from './IUser';

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: number): Promise<IUser | null>;
  update(id: number, data: Partial<IUser>): Promise<IUser>;
  delete(id: number): Promise<IUser>;
}
