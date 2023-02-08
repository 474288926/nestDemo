import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policy-type';
import { User } from '../entities/user.entity';

export class ReadUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, User);
  }
}

export class CreateUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, User);
  }
}

export class DeleteUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, User);
  }
}

export class UpdateUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, User);
  }
}
