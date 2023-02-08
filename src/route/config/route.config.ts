import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policy-type';
import { Route } from '../entities/route.entity';

export class ReadRoutePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Route);
  }
}

export class CreateRoutePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Route);
  }
}

export class DeleteRoutePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, Route);
  }
}

export class UpdateRoutePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Route);
  }
}
