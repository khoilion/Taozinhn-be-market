import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  DeliveryStatus,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '../config/enum';
import { InfoItem } from '../cart/schema/info-item.schema';

export type OrderDocument = Order & Document;

@Schema({ collection: 'order' })
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  products: InfoItem[];

  @Prop({ required: true })
  totalPayment: number;

  @Prop({ required: true, default: '' })
  address: string;

  @Prop({ default: '' })
  note: string;

  @Prop({ required: true, default: OrderStatus.CREATE })
  status: OrderStatus;

  @Prop({ required: true, PaymentMethod: PaymentMethod.COD })
  paymentMethod: PaymentMethod;

  @Prop({ required: true, default: PaymentStatus.UNPAID })
  paymentStatus: PaymentStatus;

  @Prop({ default: '' })
  deliveryMethod: string;

  @Prop({ required: true, default: DeliveryStatus.CONFIRM })
  deliveryStatus: DeliveryStatus;

  @Prop({ default: '' })
  deliveryDate: string;

  @Prop({ default: '' })
  deliveryCode: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ userId: 1 });
