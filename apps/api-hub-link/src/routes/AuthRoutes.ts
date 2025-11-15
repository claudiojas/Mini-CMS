import { Router } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserUseCase } from '../usecases/CreateUserUseCase';
import { LoginUserUseCase } from '../usecases/LoginUserUseCase';
import { JwtService } from '../services/JwtService'; // Importa o serviço JWT

const router = Router();

// Injeção de Dependência manual
const userRepository = new UserRepository();
const jwtService = new JwtService();
const createUserUseCase = new CreateUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository, jwtService);


// Rota para registrar um novo usuário (admin)
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await createUserUseCase.execute({ email, password });
    res.status(201).json(user);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

// Rota para login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUserUseCase.execute({ email, password });
    res.status(200).json(token);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(401).json({ error: errorMessage });
  }
});

export default router;
