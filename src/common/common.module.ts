import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CaslModule } from 'src/casl/casl.module';
import { PoliciesGuard } from 'src/casl/policies.guard';

@Module({
  imports: [ConfigModule, CaslModule],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
  ],
})
export class CommonModule {}
