import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReportStatusDto {
  @ApiProperty({
    example: 0,
    required: true,
  })
  @IsInt({ message: 'Id must be a number' })
  id: number;

  @ApiProperty({
    example: 'closed',
    required: true,
  })
  @IsString({ message: 'status must be string' })
  status: string;
}
