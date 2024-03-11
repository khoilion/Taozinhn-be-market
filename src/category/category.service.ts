import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly productRepo: ProductRepository,
  ) {}

  async create(category: CreateCategoryDto): Promise<any> {
    const existedCategory = await this.categoryRepo.findByName(category.name);
    if (existedCategory) {
      throw new BadRequestException('Category already exists.');
    }
    return await this.categoryRepo.create(category);
  }

  async update(id: string, category: CreateCategoryDto): Promise<any> {
    const { name, description } = category;
    const existedCategory = await this.categoryRepo.findById(id);
    if (!existedCategory) {
      throw new BadRequestException('Category does not exist.');
    }
    const existedCategoryName = await this.categoryRepo.findByName(name);
    console.log(existedCategoryName);
    if (existedCategoryName && existedCategoryName['_id'] != id) {
      throw new BadRequestException('Category name already exists.');
    }
    existedCategory.name = name || existedCategory.name;
    existedCategory.description = description || existedCategory.description;
    existedCategory.updatedAt = new Date();
    return this.categoryRepo.update(category, id);
  }

  async findByName(name: string): Promise<any> {
    return await this.categoryRepo.findByName(name);
  }

  async findAll(): Promise<any> {
    return await this.categoryRepo.findAll();
  }

  async delete(name: string): Promise<any> {
    const productsOfCategory = await this.productRepo.findByCategory(name);
    if (productsOfCategory.length > 0) {
      throw new BadRequestException(
        'Please remove all product of category before remove category.',
      );
    }
    await this.categoryRepo.deleteByName(name);
    return 'OK';
  }
}
