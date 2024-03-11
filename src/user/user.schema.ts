import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SystemRole } from '../config/enum';
import { DateDto } from '../dto/date.dto';

export type UserDocument = User & Document;

@Schema({ collection: 'user' })
export class User extends DateDto {
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ default: null })
  emailVerifyCode: string;

  @Prop({ default: [SystemRole.USER] })
  role: SystemRole[];

  @Prop({ required: true, default: false })
  emailNotification: boolean;

  @Prop({ required: true, default: false })
  active: boolean;

  @Prop({ default: '' })
  phoneNumber: string;

  @Prop({ default: [] })
  favorite: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ emailNotification: 1 });
