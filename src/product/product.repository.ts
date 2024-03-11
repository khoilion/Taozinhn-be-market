import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './product.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<any> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findByName(name: string): Promise<ProductDocument> {
    return this.productModel.findOne({ name: name.trim().toLowerCase() });
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find();
  }

  async findByCategory(category: string): Promise<ProductDocument[]> {
    return this.productModel.find({ category: category.trim().toLowerCase() });
  }

  async findAllDiscounted(): Promise<ProductDocument[]> {
    return this.productModel.find({ discount: { $gt: 0 } });
  }

  async findProductInsideFavoriteList(
    favoriteList: string[],
  ): Promise<ProductDocument[]> {
    return this.productModel.find({ _id: { $in: favoriteList } });
  }

  async findById(id: string): Promise<Product> {
    const _id = new Types.ObjectId(id);
    return this.productModel.findById(_id);
  }

  async findInsidePriceRange(
    min: number,
    max: number,
  ): Promise<ProductDocument[]> {
    return this.productModel.find({ currentPrice: { $gte: min, $lte: max } });
  }

  async findNewProduct(): Promise<ProductDocument[]> {
    return this.productModel.find().limit(9).sort({ createdAt: -1 });
  }

  updateById(id: string, product: Product): Promise<any> {
    const _id = new Types.ObjectId(id);
    return this.productModel.findByIdAndUpdate(_id, product);
  }

  deleteById(id: string): Promise<any> {
    const _id = new Types.ObjectId(id);
    return this.productModel.findByIdAndDelete(_id);
  }
}
