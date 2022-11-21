import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CardService } from './card.service';
import { Card, CARD_TYPE_ENUM } from './card.schema';
import { TRANSACTION_TYPE_ENUM } from '../transaction/transaction.schema';

@Resolver()
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Query(() => [Card])
  async getUserCards(
    @Args('owner') owner: string,
    @Args({ name: 'searchTerm', nullable: true })
    searchTerm: string,
    @Args({ name: 'excludeIds', type: () => [String], nullable: true })
    excludeIds?: string[],
  ) {
    return this.cardService.getUserCards(owner, searchTerm, excludeIds);
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

  @Query(() => Card, { nullable: true })
  async isCardExist(@Args('number') number: number) {
    return this.cardService.isCardExist(number);
  }

  @Mutation(() => Card)
  async createCard(
    @Args('pin') pin: string,
    @Args('owner') owner: string,
    @Args('ownerFullName') ownerFullName: string,
    @Args('isMasterCard') isMasterCard: boolean,
    @Args('type') type: CARD_TYPE_ENUM,
  ) {
    return this.cardService.createCard(
      owner,
      ownerFullName,
      pin,
      isMasterCard,
      type,
    );
  }

  @Mutation(() => Boolean)
  async moneySend(
    @Args('amount') amount: number,
    @Args('to', { nullable: true }) to?: Types.ObjectId,
    @Args('from', { nullable: true }) from?: Types.ObjectId,
    @Args('sendOnNumber', { nullable: true }) sendOnNumber?: string,
    @Args('type', { nullable: true }) type?: TRANSACTION_TYPE_ENUM,
  ) {
    return this.cardService.moneySend(amount, to, from, sendOnNumber, type);
  }

  @Mutation(() => Card)
  async updateInternetLimit(
    @Args('cardId') cardId: Types.ObjectId,
    @Args('newInternetLimit') newInternetLimit: number,
  ) {
    return this.cardService.updateInternetLimit(cardId, newInternetLimit);
  }
}
