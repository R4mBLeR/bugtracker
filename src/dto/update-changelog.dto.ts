import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChangelogDto {
  @ApiProperty({
    example: 0,
    required: true,
  })
  @IsInt({ message: 'Id must be a number' })
  id: number;

  @ApiProperty({
    example: 'New title',
    required: false,
  })
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be minimal 3 chars' })
  @MaxLength(32, { message: 'Title must be maximum 32 chars' })
  title: string;

  @ApiProperty({
    example: 'New description',
    required: false,
  })
  @IsString({ message: 'Description must be a string' })
  description: string;
}
