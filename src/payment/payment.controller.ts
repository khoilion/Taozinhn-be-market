import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { BaseResponse } from '../config/http/base-response.res';
import { JwtAuthGuard } from '../config/auth/jwt-auth.guard';
import { GetUser } from '../config/get-user.decorator';
import { PaymentService } from './payment.service';
import { VnpayReturnDto } from './dto/vnpay-return.dto';

@ApiResponse({ status: 200, description: 'Successfully.' })
@ApiResponse({ status: 500, description: 'Server error.' })
@ApiResponse({ status: 400, description: 'BadRequest.' })
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('create-vnpay-payment-url/:orderId')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Create vnpay payment url' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'orderId',
    description: 'The id of the order',
    example: '60f9b0b3b9b0c3b3a0b3b9b0',
  })
  async createVnpayPaymentUrl(
    @Param('orderId') orderId: string,
    @GetUser() user: any,
    @Res() res: any,
  ) {
    const url = await this.paymentService.createVnpayPaymentUrl(
      orderId,
      user['_id'],
    );
    console.log(url);
    return res.redirect(url);
  }

  @Get('vnpay-return')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Vnpay return url (Vnpay callback api)' })
  async vnPayReturnUrl(@Query() data: VnpayReturnDto) {
    return await this.paymentService.vnPayReturnUrl(data);
  }

  @Get('vnpay-ipn')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Vnpay ipn url (Vnpay callback api)' })
  async ipnVnpayUrl(@Query() data: VnpayReturnDto) {
    return await this.paymentService.ipnVnpayUrl(data);
  }
}
