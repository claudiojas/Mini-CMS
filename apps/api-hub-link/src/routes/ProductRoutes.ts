import { Router } from 'express';
import { ProductRepository } from '../repositories/ProductRepository';
import { CreateProductUseCase } from '../usecases/CreateProductUseCase';
import { UpdateProductUseCase } from '../usecases/UpdateProductUseCase';
import { DeleteProductUseCase } from '../usecases/DeleteProductUseCase';
import { 
  GetAllProductsUseCase, 
  GetProductByIdUseCase, 
  GetFeaturedProductsUseCase, 
  GetProductsByCategoryUseCase, 
  SearchProductsUseCase,
  GetProductBySlugUseCase
} from '../usecases/GetProductUseCases';

const router = Router();

// Injeção de Dependência manual
const productRepository = new ProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const getFeaturedProductsUseCase = new GetFeaturedProductsUseCase(productRepository);
const getProductsByCategoryUseCase = new GetProductsByCategoryUseCase(productRepository);
const searchProductsUseCase = new SearchProductsUseCase(productRepository);
const getProductBySlugUseCase = new GetProductBySlugUseCase(productRepository);


// Middleware de autenticação (placeholder por enquanto)
const authenticate = (req: any, res: any, next: any) => {
  // Implementar verificação de JWT aqui
  // Por enquanto, permite tudo
  next();
};


// Rotas de Produto
router.post('/', authenticate, async (req, res) => {
  try {
    const product = await createProductUseCase.execute(req.body);
    res.status(201).json(product);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await getAllProductsUseCase.execute();
    res.status(200).json(products);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const products = await getFeaturedProductsUseCase.execute();
    res.status(200).json(products);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await getProductsByCategoryUseCase.execute(category);
    res.status(200).json(products);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter "q" is required.' });
    }
    const products = await searchProductsUseCase.execute(q);
    res.status(200).json(products);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await getProductBySlugUseCase.execute(slug);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.status(200).json(product);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdUseCase.execute(Number(id));
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.status(200).json(product);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await updateProductUseCase.execute(Number(id), req.body);
    res.status(200).json(product);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    if (errorMessage.includes('Product not found')) {
      res.status(404).json({ error: errorMessage });
    } else if (errorMessage.includes('slug is already in use')) {
      res.status(409).json({ error: errorMessage });
    } else {
      res.status(400).json({ error: errorMessage });
    }
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductUseCase.execute(Number(id));
    res.status(204).send(); // No Content
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    if (errorMessage.includes('Product not found')) {
      res.status(404).json({ error: errorMessage });
    } else {
      res.status(500).json({ error: errorMessage });
    }
  }
});

export default router;
