import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Route } from 'src/route/entities/route.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;

    const existRole = await this.roleRepository.findOne({
      where: { name },
    });
    if (existRole) {
      throw new HttpException('角色名已存在', HttpStatus.BAD_REQUEST);
    }
    const routes =
      createRoleDto.routes &&
      (await Promise.all(
        createRoleDto.routes.map((id) => this.preloadRouteById(id)),
      ));

    const role = this.roleRepository.create({
      ...createRoleDto,
      routes,
    });
    return await this.roleRepository.save(role);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.roleRepository.find({
      relations: ['routes'],
      skip: (offset - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    // throw 'A random error';
    const role = await this.roleRepository.findOne({
      where: { id: id },
      relations: ['routes'],
    });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const routes =
      updateRoleDto.routes &&
      (await Promise.all(
        updateRoleDto.routes.map((id) => this.preloadRouteById(id)),
      ));
    const role = await this.roleRepository.preload({
      id: +id,
      ...updateRoleDto,
      routes,
    });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return this.roleRepository.save(role);
  }

  async remove(id: number) {
    const coffee = await this.roleRepository.findOne({ where: { id: id } });
    return this.roleRepository.remove(coffee);
  }

  private async preloadRouteById(id: number): Promise<Route> {
    const existingRoute = await this.routeRepository.findOne({
      where: { id: id },
    });
    if (existingRoute) {
      return existingRoute;
    }
    throw new NotFoundException(`无此路由或路由已失效！`);
  }
}
