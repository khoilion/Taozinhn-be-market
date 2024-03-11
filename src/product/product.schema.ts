import { DateDto } from '../dto/date.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema({ collection: 'product' })
export class Product extends DateDto {
  @Prop({ required: true, unique: true, lowercase: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  currentPrice: number;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true, default: true })
  active: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ name: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ discount: 1 });
ProductSchema.index({ currentPrice: 1 });
