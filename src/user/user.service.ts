import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { EmailDto } from './dto/email.dto';
import { randomAlphanumeric } from '../config/constants';
import { User } from './user.schema';
import { MailService } from '../config/mailer/mailer.service';
import { AuthenticationDto } from './dto/authentication.dto';
import { SystemRole, TypeAuth, UpdateRoleType } from '../config/enum';
import { AuthService } from '../config/auth/auth.service';
import { CartRepository } from '../cart/cart.repository';
import { Cart } from '../cart/schema/cart.schema';
import { ProductRepository } from '../product/product.repository';
import { Types } from "mongoose";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    private readonly productRepo: ProductRepository,

    private readonly cartRepo: CartRepository,
  ) {}

  async register(dto: AuthenticationDto): Promise<any> {
    const user = await this.validateEmail(dto, TypeAuth.REGISTER);
    user.active = true;
    user.emailVerifyCode = null;
    return await this.userRepo.updateUser(user);
  }

  async login(dto: AuthenticationDto): Promise<any> {
    const user = await this.validateEmail(dto, TypeAuth.LOGIN);
    user.emailVerifyCode = null;
    await this.userRepo.updateUser(user);
    const checkCart = await this.cartRepo.findByUserId(user['_id']);
    if (!checkCart) {
      const cart = new Cart();
      cart.userId = user['_id'];
      await this.cartRepo.create(cart);
    }
    return {
      message: 'Login successfully',
      jwt: await this.authService.createAccessToken(user.email),
      user: user,
    };
  }

  async getEmailCode(dto: EmailDto): Promise<any> {
    const { email } = dto;
    const foundUser = await this.userRepo.findByEmail(email);
    if (!foundUser) {
      const user = new User();
      user.email = email.trim().toLowerCase();
      await this.userRepo.createUser(user);
    }
    const mailCode = randomAlphanumeric(6);
    await this.userRepo.updateEmailVerifyCode(email, mailCode);
    await this.mailService.sendMailLoginApp(mailCode, email);
    return {
      message: 'Get code verify email successfully',
    };
  }

  async updatePhoneNumber(phoneNumber: string, user: User): Promise<any> {
    user.phoneNumber = phoneNumber;
    user.updatedAt = new Date();
    return await this.userRepo.updateUser(user);
  }

  async addFavorite(productId: string, user: User) {
    const foundProductInFavorite = user.favorite.find(
      (item) => item === productId,
    );
    const product = await this.productRepo.findById(productId);
    if (!product) {
      throw new BadRequestException('Product is not exist');
    }
    if (foundProductInFavorite) {
      throw new BadRequestException('Product is exist in favorite');
    }
    user.favorite.push(productId);
    user.updatedAt = new Date();
    return await this.userRepo.updateUser(user);
  }

  async removeFavorite(productId: string, user: User) {
    const index = user.favorite.indexOf(productId);
    if (index === -1) {
      throw new BadRequestException('Product is not exist in favorite');
    }
    user.favorite.splice(index, 1);
    user.updatedAt = new Date();
    return await this.userRepo.updateUser(user);
  }

  async updateRole(userId: string, type: UpdateRoleType): Promise<any> {
    const foundUser = await this.userRepo.findById(userId);
    if (!foundUser) {
      throw new BadRequestException('User is not exist');
    }
    if (type === UpdateRoleType.ADD) {
      foundUser.role.push(SystemRole.ADMIN);
    } else {
      const index = foundUser.role.indexOf(SystemRole.ADMIN);
      if (index > -1) {
        foundUser.role.splice(index, 1);
      }
    }
    foundUser.updatedAt = new Date();
    return await this.userRepo.updateUser(foundUser);
  }

  async validateEmail(
    dto: AuthenticationDto,
    typeAuth: TypeAuth,
  ): Promise<User> {
    const { email, code } = dto;
    const foundUser = await this.userRepo.findByEmail(email);
    if (!foundUser) {
      throw new BadRequestException('Email is not exist');
    }
    if (foundUser.emailVerifyCode !== code) {
      throw new BadRequestException('Code is not correct');
    }
    if (typeAuth === TypeAuth.LOGIN) {
      if (!foundUser.active) {
        throw new BadRequestException('User is not active');
      }
    }
    return foundUser;
  }
}
