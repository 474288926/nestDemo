// use/entities/user.entity.ts
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Role } from 'src/role/entities/role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100 })
  nickname: string; //昵称

  @Exclude()
  @Column({ select: false })
  password: string; // 密码

  @Column()
  avatar: string; //头像

  @Column()
  email: string;

  // @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  // role: string; // 用户角色

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert()
  encryptPwd() {
    this.password = hashSync(this.password, 10);
  }

  @ManyToMany((type) => Role, (role) => role.users)
  roles: Role[];
}
