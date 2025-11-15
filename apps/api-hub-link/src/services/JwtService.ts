import { IJwtService } from '../interfaces/IJwtService';
import { IJWTPayload } from '../interfaces/IUser';
import jwt, { SignOptions } from 'jsonwebtoken';

export class JwtService implements IJwtService {
  private readonly secret: string;
  private readonly expiresIn: number; // Alterado para número

  constructor() {
    // É crucial que esta chave secreta seja carregada de forma segura (ex: variáveis de ambiente)
    // e seja forte o suficiente para produção.
    this.secret = process.env.JWT_SECRET || 'super-secret-jwt-key';
    // O valor padrão agora é em segundos (1 dia)
    this.expiresIn = process.env.JWT_EXPIRES_IN ? parseInt(process.env.JWT_EXPIRES_IN, 10) : 86400;
  }

  sign(payload: IJWTPayload): string {
    const options: SignOptions = {
      expiresIn: this.expiresIn,
    };
    // O payload é espalhado para garantir que seja um objeto simples, evitando problemas de tipo.
    return jwt.sign({ ...payload }, this.secret, options);
  }

  verify(token: string): IJWTPayload | null {
    try {
      return jwt.verify(token, this.secret) as IJWTPayload;
    } catch (error) {
      return null;
    }
  }
}
