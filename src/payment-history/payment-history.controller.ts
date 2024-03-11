import { PaymentHistoryService } from './payment-history.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponse } from '../config/http/base-response.res';
import { JwtAuthGuard } from '../config/auth/jwt-auth.guard';
import { RolesGuard } from '../config/auth/role.guard';
import { Roles } from '../config/role.decorator';
import { SystemRole } from '../config/enum';

@ApiResponse({ status: 200, description: 'Successfully.' })
@ApiResponse({ status: 500, description: 'Server error.' })
@ApiResponse({ status: 400, description: 'BadRequest.' })
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiTags('Payment History')
@Controller('payment-history')
export class PaymentHistoryController {
  constructor(private readonly paymentHistoryService: PaymentHistoryService) {}

  @Get('find-by-order-id')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find order by id (Admin Role)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SystemRole.ADMIN)
  @ApiQuery({
    name: 'orderId',
    description: 'Order id',
    example: '60b9b0b3e1b0f1b3e0b3e1b0',
  })
  findByOrderId(@Query('orderId') orderId: string) {
    return this.paymentHistoryService.findByOrderId(orderId);
  }

  @Get()
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find all history' })
  findAll() {
    return this.paymentHistoryService.findAll();
  }
}
