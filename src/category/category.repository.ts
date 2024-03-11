import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from './category.schema';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(category: CreateCategoryDto): Promise<any> {
    const createdCategory = new this.categoryModel(category);
    return createdCategory.save();
  }

  async update(category: CreateCategoryDto, id: string): Promise<any> {
    const _id = new Types.ObjectId(id);
    return this.categoryModel.findByIdAndUpdate(_id, category);
  }

  async findById(id: string): Promise<CategoryDocument> {
    const _id = new Types.ObjectId(id);
    return this.categoryModel.findById(_id);
  }

  async findByName(name: string): Promise<CategoryDocument> {
    return this.categoryModel.findOne({ name: name.trim().toLowerCase() });
  }

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryModel.find();
  }

  async deleteByName(name: string): Promise<any> {
    return this.categoryModel.findOneAndDelete({ name: name });
  }
}
