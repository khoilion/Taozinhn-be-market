import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { OrderStatus, PaymentStatus } from '../config/enum';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async create(order: Order): Promise<Order> {
    const createdOrder = new this.orderModel(order);
    return createdOrder.save();
  }

  async findByIdAndUserId(id: string, userId: any): Promise<Order> {
    const _id = new Types.ObjectId(id);
    return this.orderModel.findOne({ _id, userId }).exec();
  }

  async findAllOrderNotCancel(userId: string): Promise<Order[]> {
    return this.orderModel
      .find({ userId, status: { $ne: OrderStatus.CANCEL } })
      .exec();
  }

  async findOrderByStatus(
    userId: string,
    status: OrderStatus,
  ): Promise<Order[]> {
    return this.orderModel.find({ userId, status }).exec();
  }

  async findById(id: string): Promise<Order> {
    const _id = new Types.ObjectId(id);
    return this.orderModel.findOne({ _id }).exec();
  }

  async updatePaymentStatus(id: string, status: PaymentStatus): Promise<Order> {
    const _id = new Types.ObjectId(id);
    return this.orderModel
      .findByIdAndUpdate(_id, {
        paymentStatus: status,
        createdAt: new Date().toISOString(),
      })
      .exec();
  }

  async update(id: string, order: Order): Promise<any> {
    const _id = new Types.ObjectId(id);
    return this.orderModel.updateOne({ _id }, order).exec();
  }
}
