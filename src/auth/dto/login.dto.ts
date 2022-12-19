import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '测试账户', description: '用户名' })
  @IsString()
  readonly username: string;
  @ApiProperty({ example: '123456', description: '用户密码' })
  @IsString()
  readonly password: string;
}
