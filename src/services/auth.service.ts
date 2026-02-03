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
      const tokens = await this.generateTokensPair(findingUser);
      if (!tokens) {
        throw new ConflictException('JWT_TOKEN_ERROR');
      }
      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      };
    } else {
      throw new ConflictException(`INCORRECT_PASSWORD_OR_USERNAME`);
    }
  }

  async updateTokens(token: string) {
    const user = await this.tokenRepository.checkToken(token);
    if (user == null) {
      throw new ConflictException(`REFRESH_TOKEN_IS_EXPIRED_OR_REVOKED`);
    }
    await this.tokenRepository.delete(token);
    const pair = await this.generateTokensPair(user);
    return pair;
  }

  async generateTokensPair(user: any) {
    const payload = {
      username: user.username,
      role: user.role,
      id: user.id,
    };

    const refresh_token = await AuthUtils.getRefreshToken();
    const access_token = await AuthUtils.getAccessToken(payload);

    await this.tokenRepository.create({
      refresh_token,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      user: user,
    });

    const tokens = {
      access_token: access_token,
      refresh_token: refresh_token,
    };
    return tokens;
  }
}
