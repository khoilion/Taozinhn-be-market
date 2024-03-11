import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createUser(user: User): Promise<any> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async updateUser(user: User): Promise<any> {
    return this.userModel.updateOne({ email: user.email }, user);
  }

  async updateEmailVerifyCode(email: string, code: string): Promise<any> {
    return this.userModel.updateOne(
      { email: email.trim().toLowerCase() },
      { emailVerifyCode: code },
    );
  }

  async findById(id: string): Promise<User> {
    const _id = new Types.ObjectId(id);
    return this.userModel.findById(_id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email.trim().toLowerCase() });
  }
}
