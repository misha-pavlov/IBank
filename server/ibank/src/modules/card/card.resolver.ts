import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CardService } from './card.service';
import { Card, CARD_TYPE_ENUM } from './card.schema';

@Resolver()
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Query(() => [Card])
  async getUserCards(@Args('owner') owner: string) {
    return this.cardService.getUserCards(owner);
  }

  @Query(() => Number)
  async getUserCapital(@Args('owner') owner: string) {
    return this.cardService.getUserCapital(owner);
  }

  @Query(() => Card)
  async getUserFirstCard(@Args('owner') owner: string) {
    return this.cardService.getUserFirstCard(owner);
  }

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
