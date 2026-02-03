import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTokensDto {
  @ApiProperty({
    example: '1231445645654',
    required: true,
  })
  @IsString()
  refresh_token: string;
}
