import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../config/auth/jwt-auth.guard';
import { BaseResponse } from '../config/http/base-response.res';
import { GetUser } from '../config/get-user.decorator';
import { User } from '../user/user.schema';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiResponse({ status: 200, description: 'Successfully.' })
@ApiResponse({ status: 500, description: 'Server error.' })
@ApiResponse({ status: 400, description: 'BadRequest.' })
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find my Cart' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getMyCart(@GetUser() user: User) {
    return this.cartService.findByUserId(user['_id']);
  }

  @Put()
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Update my Cart' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateMyCart(@Body() dto: UpdateCartDto, @GetUser() user: User) {
    return this.cartService.update(user['_id'], dto);
  }

  @Put('/clear')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Clear my Cart' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  clearMyCart(@GetUser() user: User) {
    return this.cartService.clear(user['_id']);
  }
}
