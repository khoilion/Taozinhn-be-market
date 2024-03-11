import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Iphone',
    description: 'Name',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'abc',
    description: 'Description',
    format: 'string',
  })
  @IsString()
  description: string;
}
