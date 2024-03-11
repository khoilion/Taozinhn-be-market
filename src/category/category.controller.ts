import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { CategoryService } from './category.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponse } from '../config/http/base-response.res';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Roles } from '../config/role.decorator';
import { SystemRole } from '../config/enum';
import { JwtAuthGuard } from '../config/auth/jwt-auth.guard';
import { RolesGuard } from '../config/auth/role.guard';

@ApiResponse({ status: 200, description: 'Successfully.' })
@ApiResponse({ status: 500, description: 'Server error.' })
@ApiResponse({ status: 400, description: 'BadRequest.' })
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Create new category (Admin Role)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SystemRole.ADMIN)
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Get all categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('find-by-name/:name')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Find by name' })
  @ApiParam({
    name: 'name',
    description: 'Category name',
    example: 'Iphone',
  })
  findByName(@Param('name') name: string) {
    return this.categoryService.findByName(name);
  }

  @Put('update/:id')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Update category (Admin Role)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SystemRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: CreateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Delete('delete/:id')
  @ApiResponse({ type: BaseResponse })
  @ApiOperation({ summary: 'Update category (Admin Role)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SystemRole.ADMIN)
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
