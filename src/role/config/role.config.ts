import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policy-type';
import { Role } from '../entities/role.entity';

export class ReadRolePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Role);
  }
}

export class CreateRolePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Role);
  }
}

export class DeleteRolePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, Role);
  }
}

export class UpdateRolePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Role);
  }
}
