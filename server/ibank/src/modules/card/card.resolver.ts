import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CardService } from './card.service';
import { Card, CARD_TYPE_ENUM } from './card.schema';

@Resolver()
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Mutation(() => Card)
  async createCard(
    @Args('pin') pin: string,
    @Args('owner') owner: string,
    @Args('isMasterCard') isMasterCard: boolean,
    @Args('type') type: CARD_TYPE_ENUM,
  ) {
    return this.cardService.createCard(owner, pin, isMasterCard, type);
  }
}
