import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdatePurviewDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ example: [1, 2], description: '路由id' })
  @IsArray()
  readonly routes: number[];
}
