import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
  @ApiProperty({ example: '测试咖啡', description: '咖啡名' })
  @IsString()
  readonly name: string;
  @ApiProperty({ example: '测试品牌', description: '咖啡品牌' })
  @IsString()
  readonly brand: string;
  @ApiProperty({ example: ['草莓', '芥末'], description: '咖啡口味' })
  @IsString({ each: true })
  readonly flavors: string[];
}
