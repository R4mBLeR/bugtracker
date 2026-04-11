import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Changelog } from 'src/models/changelog.entity';
import { CreateChangelogDto } from 'src/dto/create-changelog.dto';
import { UpdateChangelogDto } from 'src/dto/update-changelog.dto';
import { UpdateResult } from 'typeorm/browser';

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

  async createChangelog(changelogDto: CreateChangelogDto): Promise<Changelog> {
    const changelogData = {
      title: changelogDto.title,
      description: changelogDto.description,
    };
    const Changelog = this.repo.create(changelogData);
    return await this.repo.save(Changelog);
  }

  async updateChangelog(
    id: number,
    changelogDto: UpdateChangelogDto,
  ): Promise<UpdateResult> {
    const updateData = {
      ...(changelogDto.title !== undefined && { title: changelogDto.title }),
      ...(changelogDto.description !== undefined && {
        description: changelogDto.description,
      }),
    };

    return await this.repo.update(id, updateData);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
