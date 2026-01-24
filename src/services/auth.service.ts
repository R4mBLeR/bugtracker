import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { TokenRepository } from 'src/repositories/token.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthUtils } from 'src/utils/auth.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const findingUser = await this.userRepository.findByName(
      createUserDto.username,
    );
    if (findingUser) {
      throw new ConflictException(`USER_WITH_CURRENT_USERNAME_EXISTS`);
    }
    const hash = await AuthUtils.hashPassword(createUserDto.password);
    const user = await this.userRepository.create({
      username: createUserDto.username,
      hashPassword: hash,
      role: createUserDto.role,
    });
    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const findingUser = await this.userRepository.findByName(
      loginUserDto.username,
    );
    if (!findingUser) {
      throw new ConflictException(`INCORRECT_PASSWORD_OR_USERNAME`);
    }
    const checkHash = await AuthUtils.comparePassword(
      loginUserDto.password,
      findingUser?.hashPassword,
    );
    if (checkHash) {
      const payload = {
        username: findingUser.username,
        role: findingUser.role,
        id: findingUser.id,
      };

      // 4. Генерируем JWT токен
      const refresh_token = await AuthUtils.getRefreshToken(payload);
      const access_token = await AuthUtils.getAccessToken(payload);

      const tokenEntity = await this.tokenRepository.create({
        user_id: findingUser.id,
        refresh_token: refresh_token,
      });

      if (!tokenEntity) {
        throw new ConflictException('JWT_TOKEN_ERROR');
      }
      return {
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } else {
      throw new ConflictException(`INCORRECT_PASSWORD_OR_USERNAME`);
    }
  }
}
