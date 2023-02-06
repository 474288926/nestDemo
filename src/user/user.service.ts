import { User } from './entities/user.entity';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async register(createUser: CreateUserDto) {
    const { username } = createUser;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.create(createUser);
    return await this.userRepository.save(newUser);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.userRepository.find({
      skip: (offset - 1) * limit,
      take: limit,
      relations: ['roles', 'roles.routes'],
    });
  }

  async findOne(id: string, open: boolean = true) {
    if (open) {
      return await this.userRepository.findOne(id);
    } else {
      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: ['roles', 'roles.routes'],
      });
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const roles =
      updateUserDto.roles &&
      (await Promise.all(
        updateUserDto.roles.map((id) => this.preloadRoleById(id)),
      ));

    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
      roles,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    await this.userRepository.save(user);
    return this.findOne(id, false);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return this.userRepository.remove(user);
  }

  private async preloadRoleById(id: number): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({
      where: { id: id },
    });
    if (existingRole) {
      return existingRole;
    }
    throw new NotFoundException(`无此角色或角色已失效！`);
  }
}
