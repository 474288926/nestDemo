import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CheckPolicies } from 'src/common/decorators/policies.decorator';
import {
  DeleteUserPolicyHandler,
  UpdateUserPolicyHandler,
} from './config/user.config';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 201, type: [User] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '查找全部用户', description: '用户的查找全部' })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiQuery({ name: 'offset', type: Number })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.userService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据id查找用户', description: '根据id查找用户' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id, false);
  }

  @CheckPolicies(new UpdateUserPolicyHandler())
  @Patch(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiBody({ type: UpdateUserDto, description: '参数可选' }) //请求体
  @ApiResponse({
    //响应示例
    status: 200,
    description: '成功返回200，失败返回400',
    type: UpdateUserDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @CheckPolicies(new DeleteUserPolicyHandler())
  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
