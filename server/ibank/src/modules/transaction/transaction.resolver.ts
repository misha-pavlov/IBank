import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { Transaction, TRANSACTION_TYPE_ENUM } from './transaction.schema';
import { TransactionService } from './transaction.service';
import {
  GetCardTransactionsByDatesPayload,
  GetCardTransactionsPayload,
} from './../../object-types/transaction-payload.object-type';

@Resolver()
export class TransactionResolver {
  constructor(private transactionService: TransactionService) {}

  @Query(() => [GetCardTransactionsPayload])
  async getCardTransactions(
    @Args('cardId') cardId: string,
    @Args({ name: 'searchTerm', nullable: true })
    searchTerm: string,
  ) {
    return this.transactionService.getCardTransactions(cardId, searchTerm);
  }

  @Query(() => GetCardTransactionsByDatesPayload)
  async getCardTransactionsByDates(
    @Args('cardId') cardId: string,
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ) {
    return this.transactionService.getCardTransactionsByDates(
      cardId,
      startDate,
      endDate,
    );
  }

  @Mutation(() => Transaction)
  async createTransaction(
    @Args('type') type: TRANSACTION_TYPE_ENUM,
    @Args('amount') amount: number,
    @Args('title') title: string,
    @Args('userId') userId: string,
    @Args('amountOnCardAfter') amountOnCardAfter: number,
    @Args('isCanceled', { nullable: true }) isCanceled: boolean,
  ) {
    return this.transactionService.createTransaction(
      type,
      amount,
      title,
      userId,
      amountOnCardAfter,
      isCanceled,
    );
  }
}
