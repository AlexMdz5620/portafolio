import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthRequest } from '../types/auth-request.interface';

@Injectable()
export class DeleteVerificationGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    if (!request.user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    const userId = request.user.id;
    const { password } = request.body;

    if (!password) {
      throw new UnauthorizedException(
        'Se requiere contraseña para esta operación.',
      );
    }

    if (typeof password !== 'string') {
      throw new BadRequestException(
        'La contraseña debe ser una cadena de texto',
      );
    }

    const isValid = await this.authService.verifyPassword(userId, password);
    if (!isValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return true;
  }
}
