import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChangelogDto } from 'src/dto/create-changelog.dto';
import { DeleteChangelogDto } from 'src/dto/delete-changelog.dto';
import { UpdateChangelogDto } from 'src/dto/update-changelog.dto';
import { Changelog } from 'src/models/changelog.entity';
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
    const changelog =
      await this.changelogRepository.createChangelog(changelogDto);
    return changelog;
  }

  async updateChangelog(changelogDto: UpdateChangelogDto) {
    const existingChangelog = await this.changelogRepository.findById(
      changelogDto.id,
    );

    if (!existingChangelog) {
      throw new NotFoundException(
        `Changelog with ID ${changelogDto.id} not found`,
      );
    }

    const updateData: Partial<UpdateChangelogDto> = {};

    if (changelogDto.title !== undefined) updateData.title = changelogDto.title;
    if (changelogDto.description !== undefined)
      updateData.description = changelogDto.description;

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('No data to update');
    }

    if (
      updateData.title == existingChangelog.title &&
      updateData.description == existingChangelog.description
    ) {
      throw new BadRequestException('No changes detected');
    }

    const { affected } = await this.changelogRepository.updateChangelog(
      changelogDto.id,
      updateData as UpdateChangelogDto,
    );

    if (!affected) {
      throw new InternalServerErrorException('Failed to update changelog');
    }

    return true;
  }
  async deleteChangelog(deleteChangelogDto: DeleteChangelogDto) {
    const report = await this.changelogRepository.delete(deleteChangelogDto.id);
    if (report == undefined) {
      throw new NotFoundException(`CHANGELOG_NOT_FOUND`);
    }
    return report;
  }
}
