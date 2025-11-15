import { IProductRepository } from '../interfaces/IProductRepository';
import { IProduct } from '../interfaces/IProduct';
import { prisma } from '../data/prisma.config'; // Importa a instância do Prisma
import { Prisma } from '@prisma/client';

export class ProductRepository implements IProductRepository {
  async create(product: IProduct): Promise<IProduct> {
    return await prisma.product.create({
      data: product as Prisma.ProductCreateInput,
    });
  }

  async findById(id: number): Promise<IProduct | null> {
    return await prisma.product.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<IProduct[]> {
    return await prisma.product.findMany();
  }

  async update(id: number, data: Partial<IProduct>): Promise<IProduct> {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<IProduct> {
    return await prisma.product.delete({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<IProduct | null> {
    return await prisma.product.findUnique({
      where: { slug_personalizado: slug },
    });
  }

  async findFeatured(): Promise<IProduct[]> {
    return await prisma.product.findMany({
      where: { em_destaque: true },
    });
  }

  async findByCategory(category: string): Promise<IProduct[]> {
    return await prisma.product.findMany({
      where: { categoria: category },
    });
  }

  async search(query: string): Promise<IProduct[]> {
    return await prisma.product.findMany({
      where: {
        titulo_exibicao: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }
}
