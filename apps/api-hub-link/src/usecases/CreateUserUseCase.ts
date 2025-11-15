import { ICreateUserUseCase } from '../interfaces/IUserUseCase';
import { IUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';
import { hash } from 'bcryptjs';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(user: IUser): Promise<IUser> {
    const userAlreadyExists = await this.userRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    if (!user.password) {
      throw new Error('Password is required.');
    }

    const hashedPassword = await hash(user.password, 8);

    const newUser = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}
