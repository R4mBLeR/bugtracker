import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Changelog } from 'src/models/changelog.entity';

@Injectable()
export class ChangelogRepository {
  private repo: Repository<Changelog>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    // Получаем репозиторий из DataSource
    this.repo = this.dataSource.getRepository(Changelog);
  }

  async findAll(): Promise<Changelog[]> {
    return await this.repo.find();
  }

  async findById(id: number): Promise<Changelog | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async create(ChangelogData: Partial<Changelog>): Promise<Changelog> {
    const Changelog = this.repo.create(ChangelogData);
    return await this.repo.save(Changelog);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
