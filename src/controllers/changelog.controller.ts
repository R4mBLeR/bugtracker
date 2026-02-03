import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateChangelogDto } from 'src/dto/create-changelog.dto';
import { DeleteChangelogDto } from 'src/dto/delete-changelog.dto';
import { AuthGuard } from 'src/guards/auth.guard';
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
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createChangelog(@Body() createChangelogDto: CreateChangelogDto) {
    const report =
      await this.changelogService.createChangelog(createChangelogDto);
    return report;
  }

  @Delete()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteChangelog(@Body() deleteChangelogDto: DeleteChangelogDto) {
    const report =
      await this.changelogService.deleteChangelog(deleteChangelogDto);
    return report;
  }
}
