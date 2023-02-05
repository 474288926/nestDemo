import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: '管理员', description: '角色名' })
  @IsString()
  readonly name: string;
}
