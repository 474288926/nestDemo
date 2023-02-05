import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRouteDto {
  @ApiProperty({ example: '', description: '路由名' })
  @IsString()
  readonly name: string;
  @ApiProperty({ example: '', description: '路由地址' })
  @IsString()
  readonly path: string;
  @ApiProperty({ example: '', description: '请求方式' })
  @IsString()
  readonly methods: string;
}
