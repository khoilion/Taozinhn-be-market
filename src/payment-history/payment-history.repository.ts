import { Injectable } from '@nestjs/common';
import {
  PaymentHistory,
  PaymentHistoryDocument,
} from './payment-history.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PaymentHistoryRepository {
  constructor(
    @InjectModel(PaymentHistory.name)
    private readonly paymentHistoryModel: Model<PaymentHistoryDocument>,
  ) {}

  async create(paymentHistory: PaymentHistory): Promise<PaymentHistory> {
    const createdPaymentHistory = new this.paymentHistoryModel(paymentHistory);
    return createdPaymentHistory.save();
  }

  async findByOrderId(orderId: string): Promise<any> {
    return this.paymentHistoryModel.find({ orderId }).exec();
  }

  async findAll(): Promise<any> {
    return this.paymentHistoryModel.find().exec();
  }
}
