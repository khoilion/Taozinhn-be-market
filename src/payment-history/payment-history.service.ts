import { Injectable } from '@nestjs/common';
import { PaymentHistoryRepository } from './payment-history.repository';

@Injectable()
export class PaymentHistoryService {
  constructor(private readonly paymentHistoryRepo: PaymentHistoryRepository) {}

  findByOrderId = (orderId: string) => {
    return this.paymentHistoryRepo.findByOrderId(orderId);
  };

  findAll() {
    return this.paymentHistoryRepo.findAll();
  }
}
