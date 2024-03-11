import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoFeature } from '../config/constants';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { ProductRepository } from '../product/product.repository';

@Module({
  imports: [MongooseModule.forFeature(MongoFeature)],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService, ProductRepository],
})
export class CategoryModule {}
