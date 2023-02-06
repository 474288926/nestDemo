import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Route } from 'src/route/entities/route.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @JoinTable()
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
  @ManyToMany(() => Route, (route) => route.roles)
  routes: Route[];
}
