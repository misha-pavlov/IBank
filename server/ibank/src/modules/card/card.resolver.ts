import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CardService } from './card.service';
import { Card, CARD_TYPE_ENUM } from './card.schema';

@Resolver()
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Query(() => [Card])
  async getUserCards(
    @Args('owner') owner: string,
    @Args({ name: 'excludeIds', type: () => [String], nullable: true })
    excludeIds?: string[],
  ) {
    return this.cardService.getUserCards(owner, excludeIds);
  }

  @Query(() => Number)
  async getUserCapital(@Args('owner') owner: string) {
    return this.cardService.getUserCapital(owner);
  }

  @Query(() => Card)
  async getUserFirstCard(@Args('owner') owner: string) {
    return this.cardService.getUserFirstCard(owner);
  }

  @Query(() => Card)
  async getCardById(@Args('_id') _id: Types.ObjectId) {
    return this.cardService.getCardById(_id);
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

  @Mutation(() => Boolean)
  async moneySend(
    @Args('to') to: Types.ObjectId,
    @Args('amount') amount: number,
    @Args('from', { nullable: true }) from?: Types.ObjectId,
  ) {
    return this.cardService.moneySend(to, amount, from);
  }
}
