import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Report } from '../models/report.entity';
import { User } from 'src/models/user.entity';

@Injectable()
export class UserRepository {
  private repo: Repository<User>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    // Получаем репозиторий из DataSource
    this.repo = this.dataSource.getRepository(User);
  }

  async create(userData: Partial<User>): Promise<User> {
    if (!userData.username) {
      throw new ConflictException('Username is required');
    }

    const existingUser = await this.findByName(userData.username);
    if (existingUser) {
      throw new ConflictException(
        `User with name:  '${userData.username}' exists`,
      );
    }
    const user = this.repo.create(userData);
    return await this.repo.save(user);
  }

  async findByName(name: string): Promise<User | null> {
    return await this.repo.findOne({
      where: { username: name },
    });
  }
}
