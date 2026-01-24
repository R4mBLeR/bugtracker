import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChangelogDto {
  @ApiProperty({
    example: 'Example title',
    required: true,
  })
  @IsString({ message: 'username must be a string' })
  @MinLength(3, { message: 'username must be minimal 3 chars' })
  @MaxLength(16, { message: 'username must be maximum 16 chars' })
  title: string;

  @ApiProperty({
    example: 'Example description',
    required: true,
  })
  @IsString({ message: 'description must be a string' })
  description: string;
}
