import { IProduct } from './IProduct';

export interface IProductRepository {
  create(product: IProduct): Promise<IProduct>;
  findById(id: number): Promise<IProduct | null>;
  findAll(): Promise<IProduct[]>;
  update(id: number, data: Partial<IProduct>): Promise<IProduct>;
  delete(id: number): Promise<IProduct>;
  findBySlug(slug: string): Promise<IProduct | null>;
  findFeatured(): Promise<IProduct[]>;
  findByCategory(category: string): Promise<IProduct[]>;
  search(query: string): Promise<IProduct[]>;
}
