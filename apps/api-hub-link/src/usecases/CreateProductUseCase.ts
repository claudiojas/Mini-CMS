import { ICreateProductUseCase } from '../interfaces/IProductUseCase';
import { IProduct } from '../interfaces/IProduct';
import { IProductRepository } from '../interfaces/IProductRepository';

export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(product: IProduct): Promise<IProduct> {
    const productAlreadyExists = await this.productRepository.findBySlug(product.slug_personalizado);

    if (productAlreadyExists) {
      throw new Error('Product with this slug already exists.');
    }

    return await this.productRepository.create(product);
  }
}
