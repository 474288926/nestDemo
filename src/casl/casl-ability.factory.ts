import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Role } from 'src/role/entities/role.entity';
import { Route } from 'src/route/entities/route.entity';
import { User } from 'src/user/entities/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects =
  | InferSubjects<typeof Coffee | typeof User | typeof Role | typeof Route>
  | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User, nextPath) {
    const { can, cannot, build } = new AbilityBuilder<
      MongoAbility<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.roles.find((item) => item.name === 'admin')) {
      console.log('admin');
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      let hasObj = {};
      let roles = user.roles
        .map((item) => item.routes)
        .reduce((acc, val) => acc.concat(val), [])
        .reduce((c, n) => {
          hasObj[n.id] ? '' : (hasObj[n.id] = true && c.push(n));
          return c;
        }, [])
        .filter(
          (item) =>
            nextPath.path.indexOf(item.path) === 0 &&
            nextPath.method === item.methods,
        );
      if (Array.isArray(roles) && roles.length > 0) {
        can(
          nextPath.method === 'get'
            ? Action.Read
            : nextPath.method === 'post'
            ? Action.Create
            : nextPath.method === 'patch'
            ? Action.Update
            : Action.Delete,
          'all',
        );
      }
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
