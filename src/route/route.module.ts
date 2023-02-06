import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { Role } from 'src/role/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Route])],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
