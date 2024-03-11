import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponse } from '../config/http/base-response.res';
import { JwtAuthGuard } from '../config/auth/jwt-auth.guard';
import { RolesGuard } from '../config/auth/role.guard';
import { Roles } from '../config/role.decorator';
import { SystemRole } from '../config/enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { FindInsideRangeDto } from './dto/find-inside-range.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { UpdateActiveDto } from './dto/update-active.dto';
import { GetUser } from '../config/get-user.decorator';

@ApiResponse({ status: 200, description: 'Successfully.' })
@ApiResponse({ status: 500, description: 'Server error.' })
@ApiResponse({ status: 400, description: 'BadRequest.' })
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Create new category (Admin Role)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SystemRole.ADMIN)
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find all products' })
  findAll() {
    return this.productService.findAll();
  }

  @Get('find-by-name/:name')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find product by name' })
  @ApiParam({
    name: 'name',
    description: 'Product name',
    example: 'Iphone 12',
  })
  findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  @Get('find-by-category/:category')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find product by category' })
  @ApiParam({
    name: 'category',
    description: 'Category name',
    example: 'Iphone',
  })
  findByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @Get('find-discounted')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find all discounted products' })
  findDiscounted() {
    return this.productService.findAllDiscounted();
  }

  @Get('/find-by-id:id')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find product by id' })
  @ApiParam({
    name: 'id',
    description: 'Product id',
    example: '60f1b0b3b3b3c3b3c3b3c3b3',
  })
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Get('find-inside-price-range/:min/:max')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find products inside price range' })
  findInsidePriceRange(@Param() dto: FindInsideRangeDto) {
    return this.productService.findInsidePriceRange(dto);
  }

  @Get('new-product')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Get new product' })
  getNewProduct() {
    return this.productService.getNewProduct();
  }

  @Get('find-favorite')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find favorite products' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findFavorite(@GetUser() user: any) {
    return this.productService.findProductInsideFavoriteList(user);
  }

  @Put('update-discount')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Update discount (Admin Role)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SystemRole.ADMIN)
  updateDiscount(@Body() dto: UpdateDiscountDto) {
    return this.productService.updateDiscount(dto);
  }

  @Put('update-quantity')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Update quantity (Admin Role)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SystemRole.ADMIN)
  updateQuantity(@Body() dto: UpdateQuantityDto) {
    return this.productService.updateQuantity(dto);
  }

  @Put('update-active')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Update active (Admin Role)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SystemRole.ADMIN)
  updateActive(@Body() dto: UpdateActiveDto) {
    return this.productService.updateActive(dto);
  }

  @Put('update/:id')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Update product (Admin Role)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SystemRole.ADMIN)
  @ApiParam({
    name: 'id',
    description: 'Product id',
    example: '60f1b0b3b3b3c3b3c3b3c3b3',
  })
  update(@Body() dto: CreateProductDto, @Param('id') id: string) {
    return this.productService.update(dto, id);
  }

  @Delete('delete/:id')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Delete product (Admin Role)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SystemRole.ADMIN)
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
