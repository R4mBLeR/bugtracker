import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

export class AuthUtils {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'shhhhh';

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static getJwtToken(payload: object, expiresIn: string | number): string {
    return jwt.sign(payload, AuthUtils.JWT_SECRET, {
      expiresIn: expiresIn,
    } as jwt.SignOptions);
  }

  static getAccessToken(payload: object): string {
    return this.getJwtToken(payload, '1h');
  }

  static getRefreshToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, AuthUtils.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  static decodeToken(token: string): any {
    return jwt.decode(token);
  }
}
