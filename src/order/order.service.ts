import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.schema';
import { ProductRepository } from '../product/product.repository';
import { CartRepository } from '../cart/cart.repository';
import { OrderStatus } from "../config/enum";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly productRepo: ProductRepository,
    private readonly cartRepo: CartRepository,
  ) {}

  async createOrder(dto: CreateOrderDto, userId: string) {
    const { address, note, paymentMethod } = dto;
    const { totalPayment, products } = await this.validateOrder(dto, userId);
    const order = new Order();
    order.userId = userId;
    order.products = products;
    order.address = address;
    order.note = note;
    order.totalPayment = totalPayment;
    order.paymentMethod = paymentMethod;
    await this.cartRepo.removeProducts(userId);
    return await this.orderRepo.create(order);
  }

  async findAllOrderNotCancel(userId: string) {
    return await this.orderRepo.findAllOrderNotCancel(userId);
  }

  async findOrderByStatus(userId: string, status: OrderStatus) {
    return await this.orderRepo.findOrderByStatus(userId, status);
  }

  async validateOrder(dto: CreateOrderDto, userId: string) {
    const cart = await this.cartRepo.findByUserId(userId);
    const { products } = cart;
    let totalPayment = 0;
    for (const product of products) {
      const { productId, quantity } = product;
      const productInDb = await this.productRepo.findById(productId);
      if (!productInDb) {
        throw new BadRequestException('Product not found');
      }
      if (productInDb.quantity < quantity) {
        throw new BadRequestException('Product quantity not enough');
      }
      totalPayment += productInDb.price * quantity;
    }
    return { totalPayment, products };
  }
}
