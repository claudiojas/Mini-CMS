import { ILoginPayload, IAuthToken, IUser } from './IUser';

export interface IAuthService {
  login(payload: ILoginPayload): Promise<IAuthToken | null>;
  register(user: IUser): Promise<IUser>;
}
