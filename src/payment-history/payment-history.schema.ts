import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DateDto } from '../dto/date.dto';

export type PaymentHistoryDocument = PaymentHistory & Document;

@Schema({ collection: 'payment-history' })
export class PaymentHistory extends DateDto {
  @Prop({ required: true })
  orderId: string;
  @Prop({ required: true })
  bankCode: string;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  cardType: string;
  @Prop({ required: true })
  payDate: string;
  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  transactionCode: string;

  @Prop({ required: true })
  bankTranNo: string;
}

export const PaymentHistorySchema =
  SchemaFactory.createForClass(PaymentHistory);
PaymentHistorySchema.index({ orderId: 1 });
