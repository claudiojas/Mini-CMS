import { IUpdateProductUseCase } from '../interfaces/IProductUseCase';
import { IProduct } from '../interfaces/IProduct';
import { IProductRepository } from '../interfaces/IProductRepository';

export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: number, productData: Partial<IProduct>): Promise<IProduct> {
    const productExists = await this.productRepository.findById(id);

    if (!productExists) {
      throw new Error('Product not found.');
    }

    // Se o slug for alterado, verifica se o novo slug já existe em outro produto
    if (productData.slug_personalizado && productData.slug_personalizado !== productExists.slug_personalizado) {
      const slugInUse = await this.productRepository.findBySlug(productData.slug_personalizado);
      if (slugInUse && slugInUse.id !== id) {
        throw new Error('This slug is already in use by another product.');
      }
    }

    return await this.productRepository.update(id, productData);
  }
}
