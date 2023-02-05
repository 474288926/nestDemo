import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class CommonModule {}
