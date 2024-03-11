import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoFeature } from '../config/constants';
import { ProductRepository } from '../product/product.repository';
import { PaymentHistoryRepository } from '../payment-history/payment-history.repository';
import { CartRepository } from '../cart/cart.repository';

@Module({
  imports: [MongooseModule.forFeature(MongoFeature)],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    ProductRepository,
    PaymentHistoryRepository,
    CartRepository,
  ],
})
export class OrderModule {}
