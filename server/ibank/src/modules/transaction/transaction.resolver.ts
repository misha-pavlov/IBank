import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Transaction, TRANSACTION_TYPE_ENUM } from './transaction.schema';
import { TransactionService } from './transaction.service';

@Resolver()
export class TransactionResolver {
  constructor(private transactionService: TransactionService) {}

  @Mutation(() => Transaction)
  async createCard(
    @Args('type') type: TRANSACTION_TYPE_ENUM,
    @Args('amount') amount: number,
    @Args('title') title: string,
    @Args('amountOnCardAfter') amountOnCardAfter: number,
    @Args('isCanceled', { nullable: true }) isCanceled: boolean,
  ) {
    return this.transactionService.createTransaction(
      type,
      amount,
      title,
      amountOnCardAfter,
      isCanceled,
    );
  }
}
