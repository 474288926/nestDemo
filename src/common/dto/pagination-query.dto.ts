import { IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({ default: 10, required: false })
  @IsOptional()
  @IsPositive()
  limit: number;
  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  @IsPositive()
  offset: number;
}
