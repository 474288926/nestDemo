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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
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
import {
  CreateRolePolicyHandler,
  DeleteRolePolicyHandler,
  ReadRolePolicyHandler,
  UpdateRolePolicyHandler,
} from './config/role.config';
import { CheckPolicies } from 'src/common/decorators/policies.decorator';

@ApiTags('role')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @CheckPolicies(new CreateRolePolicyHandler())
  @Post()
  @ApiOperation({ summary: '创建角色', description: '创建一个角色' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '查找全部', description: '角色的查找全部' })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiQuery({ name: 'offset', type: Number })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.roleService.findAll(paginationQuery);
  }

  @CheckPolicies(new ReadRolePolicyHandler())
  @Get(':id')
  @ApiOperation({ summary: '根据id查找', description: '根据id查找角色' })
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @CheckPolicies(new UpdateRolePolicyHandler())
  @Patch(':id')
  @ApiOperation({ summary: '更新角色' })
  @ApiBody({ type: UpdateRoleDto, description: '参数可选' }) //请求体
  @ApiResponse({
    //响应示例
    status: 200,
    description: '成功返回200，失败返回400',
    type: UpdateRoleDto,
  })
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @CheckPolicies(new DeleteRolePolicyHandler())
  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
