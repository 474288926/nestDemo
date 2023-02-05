import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;

    const existRole = await this.roleRepository.findOne({
      where: { name },
    });
    if (existRole) {
      throw new HttpException('角色名已存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(newUser);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.roleRepository.find({
      skip: (offset - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    // throw 'A random error';
    const role = await this.roleRepository.findOne({
      where: { id: id },
    });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.preload({
      id: +id,
      ...updateRoleDto,
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
}
