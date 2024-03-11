import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { VnpayService } from './vnpay.service';
import { OrderRepository } from '../order/order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoFeature } from '../config/constants';
import { PaymentHistoryRepository } from '../payment-history/payment-history.repository';
import { ProductRepository } from '../product/product.repository';

@Module({
  imports: [MongooseModule.forFeature(MongoFeature)],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    VnpayService,
    OrderRepository,
    PaymentHistoryRepository,
    ProductRepository,
  ],
})
export class PaymentModule {}
