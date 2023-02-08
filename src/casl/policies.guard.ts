import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from 'src/common/decorators/policies.decorator';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { User } from 'src/user/entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { PolicyHandler } from './policy-type';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const connection = getConnection();
    const userRepository: Repository<User> = connection.getRepository(User);
    const user = await userRepository.findOne(
      { id: userId },
      { relations: ['roles', 'roles.routes'] },
    );
    const ability = this.caslAbilityFactory.createForUser(user, {
      path: request.route.path,
      method: request.route.stack[0].method,
    });
    return policyHandlers.every((handler) => {
      return this.execPolicyHandler(handler, ability);
    });
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
