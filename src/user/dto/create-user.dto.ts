import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: '测试账户', description: '用户名' })
  @IsString()
  readonly username: string;
  @ApiProperty({ example: '', description: '用户昵称' })
  @IsString()
  @IsOptional()
  readonly nickname: string;
  @ApiProperty({ example: '123456', description: '用户密码' })
  @IsString()
  readonly password: string;
  @ApiProperty({ example: '', description: '用户头像' })
  @IsString()
  @IsOptional()
  readonly avatar: string;
  @ApiProperty({ example: [], description: '用户权限' })
  @IsArray()
  @IsOptional()
  readonly roles: any[];
  @ApiProperty({ example: '', description: '用户邮箱' })
  @IsString()
  @IsOptional()
  readonly email: string;
}
