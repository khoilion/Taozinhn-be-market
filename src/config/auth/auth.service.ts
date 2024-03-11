import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { jwtConstants } from '../constants';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}

  async createAccessToken(address: string) {
    return sign(address, jwtConstants.secret);
  }
  async validateUser(email: string): Promise<any> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }
}
