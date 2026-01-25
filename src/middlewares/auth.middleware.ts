import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { AuthUtils } from 'src/utils/auth.utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
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
    next();
  }
}
