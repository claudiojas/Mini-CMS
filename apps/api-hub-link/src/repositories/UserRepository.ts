import { IUserRepository } from '../interfaces/IUserRepository';
import { IUser } from '../interfaces/IUser';
import { prisma } from '../data/prisma.config'; // Importa a instância do Prisma

export class UserRepository implements IUserRepository {
  async create(user: IUser): Promise<IUser> {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password as string, // Assumindo que a senha sempre virá ao criar
      },
    });
    return newUser;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<IUser>): Promise<IUser> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<IUser> {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
