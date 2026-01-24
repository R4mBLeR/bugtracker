import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateChangelogDto } from 'src/dto/create-changelog.dto';
import { ChangelogService } from 'src/services/changelog.service';

@Controller('changelogs')
export class ChangelogController {
  constructor(private readonly changelogService: ChangelogService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllChangelogs() {
    const reports = await this.changelogService.getAllChangelogs();
    return reports;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getChangelogById(@Param('id', ParseIntPipe) id: number) {
    const report = await this.changelogService.getChangelogById(id);
    return report;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createChangelog(@Body() createChangelogDto: CreateChangelogDto) {
    const report =
      await this.changelogService.createChangelog(createChangelogDto);
    return report;
  }
}
