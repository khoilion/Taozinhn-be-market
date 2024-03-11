import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoFeature } from '../config/constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MailService } from '../config/mailer/mailer.service';
import { AuthService } from '../config/auth/auth.service';
import { CartRepository } from '../cart/cart.repository';
import { ProductRepository } from '../product/product.repository';

@Module({
  imports: [MongooseModule.forFeature(MongoFeature)],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    MailService,
    AuthService,
    CartRepository,
    ProductRepository,
  ],
})
export class UserModule {}
