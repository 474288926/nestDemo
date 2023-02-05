import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: '管理员', description: '角色名' })
  @IsString()
  readonly name: string;
  @ApiProperty({ example: [1, 2], description: '路由id' })
  @IsArray()
  readonly routes: number[];
}
