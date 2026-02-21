import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Session } from 'src/models/session.entity';
import { User } from 'src/models/user.entity';

@Injectable()
export class TokenRepository {
  private repo: Repository<Session>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    // Получаем репозиторий из DataSource
    this.repo = this.dataSource.getRepository(Session);
  }

  async create(sessionData: Partial<Session>): Promise<Session> {
    const token = this.repo.create(sessionData);
    return await this.repo.save(token);
  }

  async delete(refresh_token: string): Promise<void> {
    await this.repo.delete({ refresh_token });
  }

  async checkSession(refresh_token: string): Promise<User | null> {
    const session = await this.repo.findOne({
      where: { refresh_token },
      relations: ['user'],
    });
    if (session == null) return null;
    const diff = new Date().getTime() - new Date(session.expires_at).getTime();
    if (diff >= 0) return null;
    return session.user;
  }
}
