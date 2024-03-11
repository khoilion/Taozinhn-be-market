import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DateDto } from '../dto/date.dto';

export type CategoryDocument = Category & Document;

@Schema({ collection: 'category' })
export class Category extends DateDto {
  @Prop({ required: true, unique: true, lowercase: true })
  name: string;

  @Prop({ default: null })
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ name: 1 }, { unique: true });
