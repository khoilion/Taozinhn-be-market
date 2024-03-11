import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoFeature } from '../config/constants';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { CategoryRepository } from '../category/category.repository';

@Module({
  imports: [MongooseModule.forFeature(MongoFeature)],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, CategoryRepository],
})
export class ProductModule {}
