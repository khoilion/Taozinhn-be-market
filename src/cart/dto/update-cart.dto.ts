import { TypeUpdateCart } from '../../config/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({
    example: '60b6d6b9b9b9ef2a3c9e9b9b',
    description: 'The id of the Product',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    example: 1,
    description: 'The quantity of the Product',
    format: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    enum: Object.keys(TypeUpdateCart),
    description: 'Update type of the Cart',
    example: TypeUpdateCart.INCREASE,
  })
  @IsNotEmpty()
  @IsEnum(TypeUpdateCart)
  type: TypeUpdateCart;
}
