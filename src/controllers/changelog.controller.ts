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
import { UpdateChangelogDto } from 'src/dto/update-changelog.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ChangelogService } from 'src/services/changelog.service';

@Controller('changelogs')
export class ChangelogController {
  constructor(private readonly changelogService: ChangelogService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllChangelogs() {
    const changelogs = await this.changelogService.getAllChangelogs();
    return changelogs;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getChangelogById(@Param('id', ParseIntPipe) id: number) {
    const changelog = await this.changelogService.getChangelogById(id);
    return changelog;
  }

  @Post('create')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createChangelog(@Body() createChangelogDto: CreateChangelogDto) {
    const changelog =
      await this.changelogService.createChangelog(createChangelogDto);
    return changelog;
  }

  @Post('update')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async updateChangelog(@Body() updateChangelogDto: UpdateChangelogDto) {
    const changelog =
      await this.changelogService.updateChangelog(updateChangelogDto);
    return changelog;
  }

  @Delete('delete')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteChangelog(@Body() deleteChangelogDto: DeleteChangelogDto) {
    const changelog =
      await this.changelogService.deleteChangelog(deleteChangelogDto);
    return changelog;
  }
}
