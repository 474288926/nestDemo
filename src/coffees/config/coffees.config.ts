import { registerAs } from '@nestjs/config';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policy-type';
import { Coffee } from '../entities/coffee.entity';

export default registerAs('coffees', () => ({
  foo: 'bar',
}));

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, Coffee);
  }
}

export class CreateArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Coffee);
  }
}

export class DeleteArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, Coffee);
  }
}

export class UpdateArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, Coffee);
  }
}
