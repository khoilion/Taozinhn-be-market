import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponse } from '../config/http/base-response.res';
import { EmailDto } from './dto/email.dto';
import { AuthenticationDto } from './dto/authentication.dto';
import { JwtAuthGuard } from '../config/auth/jwt-auth.guard';
import { GetUser } from '../config/get-user.decorator';
import { User } from './user.schema';
import { RolesGuard } from '../config/auth/role.guard';
import { Roles } from '../config/role.decorator';
import { SystemRole, UpdateRoleType } from '../config/enum';

@ApiResponse({ status: 200, description: 'Successfully.' })
@ApiResponse({ status: 500, description: 'Server error.' })
@ApiResponse({ status: 400, description: 'BadRequest.' })
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Register' })
  register(@Body() dto: AuthenticationDto) {
    return this.userService.register(dto);
  }

  @Post('login')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Login' })
  login(@Body() dto: AuthenticationDto) {
    return this.userService.login(dto);
  }

  @Get('get-email-code')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Get email code' })
  getEmailCode(@Query() emailDto: EmailDto) {
    return this.userService.getEmailCode(emailDto);
  }

  @Put('update-phone-number/:phoneNumber')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Update phone number' })
  @ApiParam({
    name: 'phoneNumber',
    description: 'Phone number',
    example: '0123456789',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updatePhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
    @GetUser() user: User,
  ) {
    return this.userService.updatePhoneNumber(phoneNumber, user);
  }

  @Put('add-favorite/:productId')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Add favorite' })
  @ApiParam({
    name: 'productId',
    description: 'Product id',
    example: '60f0b6b3e1b9a1b3b4b3b4b3',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  addFavorite(@Param('productId') productId: string, @GetUser() user: User) {
    return this.userService.addFavorite(productId, user);
  }

  @Put('remove-favorite/:productId')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Remove favorite' })
  @ApiParam({
    name: 'productId',
    description: 'Product id',
    example: '60f0b6b3e1b9a1b3b4b3b4b3',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  removeFavorite(@Param('productId') productId: string, @GetUser() user: User) {
    return this.userService.removeFavorite(productId, user);
  }

  @Put('update-admin-role/:userId/:type')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Update role (Super Admin Role)' })
  @ApiParam({
    name: 'userId',
    description: 'User id',
    example: '60f0b6b3e1b9a1b3b4b3b4b3',
  })
  @ApiParam({
    name: 'type',
    description: 'Type',
    enum: UpdateRoleType,
    example: UpdateRoleType.ADD,
    type: String,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SystemRole.SUPER_ADMIN)
  updateRole(
    @Param('userId') userId: string,
    @Param('type') type: UpdateRoleType,
  ) {
    return this.userService.updateRole(userId, type);
  }
}
