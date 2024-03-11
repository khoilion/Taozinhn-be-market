import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoFeature } from '../config/constants';
import { ProductRepository } from '../product/product.repository';

@Module({
  imports: [MongooseModule.forFeature(MongoFeature)],
  controllers: [CartController],
  providers: [CartService, CartRepository, ProductRepository],
})
export class CartModule {}
