import { IDeleteProductUseCase } from '../interfaces/IProductUseCase';
import { IProduct } from '../interfaces/IProduct';
import { IProductRepository } from '../interfaces/IProductRepository';

export class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: number): Promise<IProduct> {
    const productExists = await this.productRepository.findById(id);

    if (!productExists) {
      throw new Error('Product not found.');
    }

    return await this.productRepository.delete(id);
  }
}
