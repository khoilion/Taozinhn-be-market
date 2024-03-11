import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponse } from '../config/http/base-response.res';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../config/auth/jwt-auth.guard';
import { GetUser } from '../config/get-user.decorator';
import { OrderStatus } from '../config/enum';

@ApiResponse({ status: 200, description: 'Successfully.' })
@ApiResponse({ status: 500, description: 'Server error.' })
@ApiResponse({ status: 400, description: 'BadRequest.' })
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Create order' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createOrder(@Body() dto: CreateOrderDto, @GetUser() user: any) {
    return this.orderService.createOrder(dto, user['_id']);
  }

  @Get()
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find order not cancel' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser() user: any) {
    return this.orderService.findAllOrderNotCancel(user['_id']);
  }

  @Get('find-order-by-status/:status')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find order by status' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'status',
    enum: OrderStatus,
    type: String,
    description: 'Order status',
    example: OrderStatus.CANCEL,
  })
  findOrderByStatus(
    @GetUser() user: any,
    @Param('status') status: OrderStatus,
  ) {
    return this.orderService.findOrderByStatus(user['_id'], status);
  }
}
