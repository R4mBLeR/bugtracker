import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChangelogDto } from 'src/dto/create-changelog.dto';
import { ChangelogRepository } from 'src/repositories/changelog.repository';

@Injectable()
export class ChangelogService {
  constructor(private readonly changelogRepository: ChangelogRepository) {}

  async getAllChangelogs() {
    const changelogs = await this.changelogRepository.findAll();
    if (!changelogs || changelogs.length === 0) {
      throw new NotFoundException('NO_AVAILABLE_CHANGELOGS_FOUND');
    }
    return changelogs;
  }

  async getChangelogById(id: number) {
    const changelog = await this.changelogRepository.findById(id);
    if (!changelog) {
      throw new NotFoundException(`CHANGELOG_NOT_FOUND`);
    }
    return changelog;
  }

  async createChangelog(changelogDto: CreateChangelogDto) {
    const changelog = await this.changelogRepository.create({
      title: changelogDto.title,
      description: changelogDto.description,
    });
    return changelog;
  }
}
