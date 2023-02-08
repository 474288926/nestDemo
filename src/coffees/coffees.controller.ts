import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CheckPolicies } from 'src/common/decorators/policies.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import {
  CreateArticlePolicyHandler,
  DeleteArticlePolicyHandler,
  ReadArticlePolicyHandler,
  UpdateArticlePolicyHandler,
} from './config/coffees.config';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
@ApiBearerAuth()
@ApiTags('coffee')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: '查找全部', description: '咖啡的查找全部' })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiQuery({ name: 'offset', type: Number })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
  }

  @CheckPolicies(new ReadArticlePolicyHandler())
  @Get(':id')
  @ApiOperation({ summary: '根据id查找', description: '根据id查找咖啡' })
  findOne(@Param('id') id: number) {
    return this.coffeesService.findOne(id);
  }

  @CheckPolicies(new CreateArticlePolicyHandler())
  @Post()
  @ApiOperation({ summary: '创建一个咖啡', description: '创建一个咖啡' })
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @CheckPolicies(new UpdateArticlePolicyHandler())
  @Patch(':id')
  @ApiOperation({ summary: '更新咖啡' })
  @ApiBody({ type: UpdateCoffeeDto, description: '参数可选' }) //请求体
  @ApiResponse({
    //响应示例
    status: 200,
    description: '成功返回200，失败返回400',
    type: UpdateCoffeeDto,
  })
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @CheckPolicies(new DeleteArticlePolicyHandler())
  @Delete(':id')
  @ApiOperation({ summary: '删除咖啡' })
  remove(@Param('id') id: number) {
    return this.coffeesService.remove(id);
  }
}
