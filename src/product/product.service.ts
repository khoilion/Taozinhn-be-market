import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.schema';
import { CategoryRepository } from '../category/category.repository';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { FindInsideRangeDto } from './dto/find-inside-range.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { UpdateActiveDto } from './dto/update-active.dto';
import { User } from '../user/user.schema';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async create(dto: CreateProductDto): Promise<any> {
    const { name, description, discount, images, quantity, price, category } =
      dto;
    await this.validateProduct(dto);
    const product = new Product();
    product.name = name;
    product.description = description;
    product.discount = discount;
    product.images = images;
    product.quantity = quantity;
    product.price = price;
    product.category = category;
    product.currentPrice = price - (price * discount) / 100;
    return this.productRepo.create(product);
  }

  async validateProduct(dto: CreateProductDto): Promise<boolean> {
    const { name, category } = dto;
    const categoryExists = await this.categoryRepo.findByName(category);
    if (!categoryExists) {
      throw new BadRequestException('Category does not exist');
    }
    const productExists = await this.productRepo.findByName(name);
    if (productExists) {
      throw new BadRequestException('Product already exists');
    }
    return true;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.findAll();
  }

  async findByName(name: string): Promise<Product> {
    return this.productRepo.findByName(name);
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productRepo.findByCategory(category);
  }

  async findAllDiscounted(): Promise<Product[]> {
    return this.productRepo.findAllDiscounted();
  }

  async findById(id: string): Promise<Product> {
    return this.productRepo.findById(id);
  }

  async findInsidePriceRange(dto: FindInsideRangeDto): Promise<Product[]> {
    const { min, max } = dto;
    if (min > max) {
      throw new BadRequestException('Min must be smaller than max');
    }
    return this.productRepo.findInsidePriceRange(min, max);
  }

  async getNewProduct(): Promise<Product[]> {
    return this.productRepo.findNewProduct();
  }

  async findProductInsideFavoriteList(user: User): Promise<Product[]> {
    const favoriteList = user.favorite;
    console.log(favoriteList);
    return this.productRepo.findProductInsideFavoriteList(favoriteList);
  }

  async updateDiscount(dto: UpdateDiscountDto) {
    const { _id, discount } = dto;
    const product = await this.productRepo.findById(_id);
    if (!product) {
      throw new BadRequestException('Product does not exist');
    }
    product.discount = discount;
    product.currentPrice = product.price - (product.price * discount) / 100;
    product.createdAt = new Date();
    return this.productRepo.updateById(_id, product);
  }

  async updateQuantity(dto: UpdateQuantityDto) {
    const { _id, quantity } = dto;
    const product = await this.productRepo.findById(_id);
    if (!product) {
      throw new BadRequestException('Product does not exist');
    }
    product.quantity = quantity;
    product.createdAt = new Date();
    return this.productRepo.updateById(_id, product);
  }

  async updateActive(dto: UpdateActiveDto) {
    const { _id, active } = dto;
    const product = await this.productRepo.findById(_id);
    if (!product) {
      throw new BadRequestException('Product does not exist');
    }
    product.active = active;
    product.createdAt = new Date();
    return this.productRepo.updateById(_id, product);
  }

  async update(dto: CreateProductDto, id: string) {
    const { name, description, discount, images, quantity, price, category } =
      dto;
    const product = await this.productRepo.findById(id);
    if (!product) {
      throw new BadRequestException('Product does not exist');
    }
    const productExists = await this.productRepo.findByName(name);
    if (productExists && productExists['_id'] != id) {
      throw new BadRequestException('Product already exists');
    }
    product.name = name;
    product.description = description;
    product.discount = discount;
    product.quantity = quantity;
    product.price = price;
    product.category = category;
    product.currentPrice = price - (price * discount) / 100;
    product.updatedAt = new Date();
    product.images = images;
    return this.productRepo.updateById(id, product);
  }

  async delete(id: string) {
    await this.productRepo.deleteById(id);
    return 'OK';
  }
}
