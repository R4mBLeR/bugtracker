import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChangelogDto {
  @ApiProperty({
    example: 'Example title',
    required: true,
  })
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be minimal 3 chars' })
  @MaxLength(32, { message: 'Title must be maximum 32 chars' })
  title: string;

  @ApiProperty({
    example: 'Example description',
    required: true,
  })
  @IsString({ message: 'Description must be a string' })
  description: string;
}
