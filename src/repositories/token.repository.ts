import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Token } from 'src/models/token.entity';

@Injectable()
export class TokenRepository {
  private repo: Repository<Token>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    // Получаем репозиторий из DataSource
    this.repo = this.dataSource.getRepository(Token);
  }

  async findById(id: number): Promise<Token | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async create(tokenData: Partial<Token>): Promise<Token> {
    const report = this.repo.create(tokenData);
    return await this.repo.save(report);
  }

  async delete(token: number): Promise<void> {
    await this.repo.delete(token);
  }
}
