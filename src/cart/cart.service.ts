import { CartRepository } from './cart.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { TypeUpdateCart } from '../config/enum';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly productRepo: ProductRepository,
  ) {}

  async findByUserId(userId: string) {
    return this.cartRepo.findByUserId(userId);
  }

  async update(userId: string, dto: UpdateCartDto) {
    const { type, productId, quantity } = dto;
    const cart = await this.cartRepo.findByUserId(userId);
    if (!cart) {
      throw new BadRequestException('Cart not found');
    }
    switch (type) {
      case TypeUpdateCart.DECREASE:
        const productIndex = cart.products.findIndex(
          (p) => p.productId === productId,
        );
        if (productIndex === -1) {
          throw new BadRequestException('Product not found in your cart');
        }
        const productDecrease = cart.products[productIndex];
        if (productDecrease.quantity <= quantity) {
          cart.products.splice(productIndex, 1);
        } else {
          productDecrease.quantity -= quantity;
        }
        break;
      case TypeUpdateCart.INCREASE:
        const pd = await this.productRepo.findById(productId);
        if (!pd) {
          throw new BadRequestException('Product not found');
        }
        if (pd.quantity < quantity) {
          throw new BadRequestException(
            `The quantity of product is not enough. Only ${pd.quantity} left`,
          );
        }
        const product = cart.products.find((p) => p.productId === productId);
        if (!product) {
          cart.products.push({ productId, quantity });
        } else {
          product.quantity += quantity;
        }
        break;
      default:
        break;
    }
    return this.cartRepo.update(userId, cart);
  }

  async clear(userId: string) {
    return this.cartRepo.removeProducts(userId);
  }
}
