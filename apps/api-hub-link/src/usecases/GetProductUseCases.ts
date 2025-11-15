import { IProduct } from '../interfaces/IProduct';
import { IProductRepository } from '../interfaces/IProductRepository';
import { 
  IGetAllProductsUseCase, 
  IGetProductByIdUseCase, 
  IGetFeaturedProductsUseCase, 
  IGetProductsByCategoryUseCase, 
  ISearchProductsUseCase 
} from '../interfaces/IProductUseCase';

export class GetProductByIdUseCase implements IGetProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: number): Promise<IProduct | null> {
    return await this.productRepository.findById(id);
  }
}

export class GetAllProductsUseCase implements IGetAllProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<IProduct[]> {
    return await this.productRepository.findAll();
  }
}

export class GetFeaturedProductsUseCase implements IGetFeaturedProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<IProduct[]> {
    return await this.productRepository.findFeatured();
  }
}

export class GetProductsByCategoryUseCase implements IGetProductsByCategoryUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(category: string): Promise<IProduct[]> {
    return await this.productRepository.findByCategory(category);
  }
}

export class SearchProductsUseCase implements ISearchProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(query: string): Promise<IProduct[]> {
    return await this.productRepository.search(query);
  }
}

export class GetProductBySlugUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(slug: string): Promise<IProduct | null> {
    return await this.productRepository.findBySlug(slug);
  }
}
