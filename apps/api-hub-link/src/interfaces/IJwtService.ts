import { IJWTPayload } from './IUser';

export interface IJwtService {
  sign(payload: IJWTPayload): string;
  verify(token: string): IJWTPayload | null;
}
