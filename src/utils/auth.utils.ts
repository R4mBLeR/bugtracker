import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthUtils {
  static async hashPassword(password: string): Promise<string> {
    // Используйте await с bcrypt.hash
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(password, hash): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  static getJwtToken(payload: object, time: string): Promise<string> {
    return jwt.sign(payload, 'shhhhh', {
      expiresIn: time,
    });
  }

  static getAccessToken(payload: object): Promise<string> {
    return this.getJwtToken(payload, '1h');
  }

  static getRefreshToken(payload: object): Promise<string> {
    return this.getJwtToken(payload, '7d');
  }

  static verifyToken(token: string): Promise<boolean> {
    return jwt.verify(token, 'shhhhh');
  }
}
