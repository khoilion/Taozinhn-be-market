import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DateDto } from '../../dto/date.dto';
import { InfoItem } from './info-item.schema';

export type CartDocument = Cart & Document;

@Schema({ collection: 'cart' })
export class Cart extends DateDto {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: [] })
  products: InfoItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
CartSchema.index({ userId: 1 });
