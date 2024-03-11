import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateQuantityDto {
  @ApiProperty({
    example: 10,
    description: 'The quantity of the Product',
    format: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: '60b6d6b9b9b9ef2a3c9e9b9b',
    description: 'The id of the Product',
    format: 'string',
  })
  @IsString()
  _id: string;
}
