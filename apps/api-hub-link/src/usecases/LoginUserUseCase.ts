import { ILoginPayload, IAuthToken } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IJwtService } from '../interfaces/IJwtService';
import { compare } from 'bcryptjs';

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: IJwtService
  ) {}

  async execute(payload: ILoginPayload): Promise<IAuthToken> {
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user || !user.password) {
      throw new Error('Email or password incorrect.');
    }

    const passwordMatch = await compare(payload.password, user.password);

    if (!passwordMatch) {
      throw new Error('Email or password incorrect.');
    }

    const jwtPayload = { userId: user.id as number, email: user.email };
    const token = this.jwtService.sign(jwtPayload);

    return { token };
  }
}
