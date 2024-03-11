import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from '../order/order.repository';
import { VnpayService } from './vnpay.service';
import { PaymentStatus } from '../config/enum';

@Injectable()
export class PaymentService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly vnPayService: VnpayService,
  ) {}

  async createVnpayPaymentUrl(orderId: string, userId: string) {
    const order = await this.orderRepo.findByIdAndUserId(orderId, userId);
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    if (order.paymentStatus === PaymentStatus.PAID) {
      throw new BadRequestException('Order has been paid');
    }


    return this.vnPayService.createPaymentUrl(order);
  }

  async vnPayReturnUrl(query: any) {
    return await this.vnPayService.returnUrl(query);
  }

  async ipnVnpayUrl(query: any) {
    return await this.vnPayService.ipnUrl(query);
  }
}
