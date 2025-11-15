import express, { Express } from 'express';
import 'dotenv/config';
import cors from 'cors';
import authRoutes from './routes/AuthRoutes';
import productRoutes from './routes/ProductRoutes';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(cors({
      origin: '*' // Em um ambiente de produção, restrinja o acesso
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    // Rota de verificação de saúde da API
    this.app.get('/', (req, res) => {
      res.status(200).send('API Hub-Link está no ar!');
    });

    // Rotas da aplicação
    this.app.use('/auth', authRoutes);
    this.app.use('/products', productRoutes);
  }
}

export default new App().app;
