import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schema/cart.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CartRepository {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,
  ) {}

  async create(cart: Cart): Promise<CartDocument> {
    const createdCart = new this.cartModel(cart);
    return createdCart.save();
  }

  async findByUserId(userId: string): Promise<CartDocument> {
    return this.cartModel.findOne({ userId }).exec();
  }

  async update(userId: string, cart: Cart): Promise<CartDocument> {
    return this.cartModel.findOneAndUpdate({ userId }, cart).exec();
  }

  async removeProducts(userId: string): Promise<CartDocument> {
    return this.cartModel.findOneAndUpdate({ userId }, { products: [] }).exec();
  }
}
