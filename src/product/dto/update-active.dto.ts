import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateActiveDto {
  @ApiProperty({
    example: true,
    description: 'The active status of the Product',
    format: 'number',
  })
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    example: '60b6d6b9b9b9ef2a3c9e9b9b',
    description: 'The id of the Product',
    format: 'string',
  })
  @IsString()
  _id: string;
}
