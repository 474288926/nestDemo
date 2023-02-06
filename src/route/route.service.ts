import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entities/route.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    const newRoute = await this.routeRepository.create(createRouteDto);
    return await this.routeRepository.save(newRoute);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.routeRepository.find({
      skip: (offset - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    // throw 'A random error';
    const route = await this.routeRepository.findOne({
      where: { id: id },
    });
    if (!route) {
      throw new NotFoundException(`Route #${id} not found`);
    }
    return route;
  }

  async update(id: number, updateRouteDto: UpdateRouteDto) {
    const route = await this.routeRepository.preload({
      id: +id,
      ...updateRouteDto,
    });
    if (!route) {
      throw new NotFoundException(`Route #${id} not found`);
    }
    return this.routeRepository.save(route);
  }

  async remove(id: number) {
    const route = await this.routeRepository.findOne({ where: { id: id } });
    return this.routeRepository.remove(route);
  }
}
