import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthUtils } from 'src/utils/auth.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    const token = authHeader?.split(' ')[1];
    if (token == undefined) {
      throw new UnauthorizedException('JWT_TOKEN_NOT_FOUND');
    }

    const success = AuthUtils.verifyToken(token);
    if (!success) {
      throw new UnauthorizedException('JWT_TOKEN_IS_EXPIRED');
    }

    const data = AuthUtils.decodeToken(token);
    if (data.role != 'admin') {
      throw new ForbiddenException('UNAUTHORIZED_ACCESS');
    }

    const user = {
      username: data.username,
      role: data.role,
      id: data.id,
    };
    request.user = user;

    return true;
  }
}
