import { Prop } from '@nestjs/mongoose';
import { now } from 'mongoose';

export class DateDto {
  @Prop({ required: true, default: now, type: Date })
  createdAt: Date;

  @Prop({ required: true, default: now, type: Date })
  updatedAt: Date;
}
