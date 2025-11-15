import { IProduct } from './IProduct';

export interface ICreateProductUseCase {
  execute(product: IProduct): Promise<IProduct>;
}

export interface IGetProductByIdUseCase {
  execute(id: number): Promise<IProduct | null>;
}

export interface IGetAllProductsUseCase {
  execute(): Promise<IProduct[]>;
}

export interface IUpdateProductUseCase {
  execute(id: number, product: Partial<IProduct>): Promise<IProduct>;
}

export interface IDeleteProductUseCase {
  execute(id: number): Promise<IProduct>;
}

export interface IGetFeaturedProductsUseCase {
  execute(): Promise<IProduct[]>;
}

export interface IGetProductsByCategoryUseCase {
  execute(category: string): Promise<IProduct[]>;
}

export interface ISearchProductsUseCase {
  execute(query: string): Promise<IProduct[]>;
}
