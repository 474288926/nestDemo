import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CheckPolicies } from 'src/common/decorators/policies.decorator';
import {
  CreateRoutePolicyHandler,
  DeleteRoutePolicyHandler,
  ReadRoutePolicyHandler,
  UpdateRoutePolicyHandler,
} from './config/route.config';

@Controller('route')
@ApiBearerAuth()
@ApiTags('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @CheckPolicies(new CreateRoutePolicyHandler())
  @Post()
  @ApiOperation({ summary: '创建一个路由', description: '创建一个路由' })
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routeService.create(createRouteDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '查找全部路由', description: '路由的查找全部' })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiQuery({ name: 'offset', type: Number })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.routeService.findAll(paginationQuery);
  }

  @CheckPolicies(new ReadRoutePolicyHandler())
  @Get(':id')
  @ApiOperation({ summary: '根据id查找路由', description: '根据id查找路由' })
  findOne(@Param('id') id: number) {
    return this.routeService.findOne(id);
  }

  @CheckPolicies(new UpdateRoutePolicyHandler())
  @Patch(':id')
  @ApiOperation({ summary: '更新路由' })
  @ApiBody({ type: UpdateRouteDto, description: '参数可选' }) //请求体
  @ApiResponse({
    //响应示例
    status: 200,
    description: '成功返回200，失败返回400',
    type: UpdateRouteDto,
  })
  update(@Param('id') id: number, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routeService.update(id, updateRouteDto);
  }

  @CheckPolicies(new DeleteRoutePolicyHandler())
  @Delete(':id')
  @ApiOperation({ summary: '删除路由' })
  remove(@Param('id') id: number) {
    return this.routeService.remove(id);
  }
}
