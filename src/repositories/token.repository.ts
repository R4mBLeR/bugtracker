import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Token } from 'src/models/token.entity';
import { User } from 'src/models/user.entity';

@Injectable()
export class TokenRepository {
  private repo: Repository<Token>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    // Получаем репозиторий из DataSource
    this.repo = this.dataSource.getRepository(Token);
  }

  async create(tokenData: Partial<Token>): Promise<Token> {
    const token = this.repo.create(tokenData);
    return await this.repo.save(token);
  }

  async delete(refresh_token: string): Promise<void> {
    await this.repo.delete({ refresh_token });
  }

  async checkToken(refresh_token: string): Promise<User | null> {
    const token = await this.repo.findOne({
      where: { refresh_token },
      relations: ['user'],
    });
    if (token == null) return null;
    const diff = new Date().getTime() - new Date(token.expires_at).getTime();
    if (diff >= 0) return null;
    return token.user;
  }
}
