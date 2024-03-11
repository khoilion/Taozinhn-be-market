import { Module } from '@nestjs/common';
import { MongoFeature } from '../config/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentHistoryService } from './payment-history.service';
import { PaymentHistoryRepository } from './payment-history.repository';
import { PaymentHistoryController } from './payment-history.controller';

@Module({
  imports: [MongooseModule.forFeature(MongoFeature)],
  controllers: [PaymentHistoryController],
  providers: [PaymentHistoryService, PaymentHistoryRepository],
})
export class PaymentHistoryModule {}
