import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { Cashback } from './cashback.schema';
import { CashbackService } from './cashback.service';

@Resolver()
export class CashbackResolver {
  constructor(private cashbackService: CashbackService) {}

  @Query(() => [Cashback])
  async getCashbacks(): Promise<Cashback[]> {
    return this.cashbackService.getCashbacks();
  }

  @Mutation(() => Boolean)
  async switchCashback(
    @Args('userId') userId: Types.ObjectId,
    @Args('cashbackId') cashbackId: Types.ObjectId,
  ): Promise<boolean> {
    return this.cashbackService.switchCashback(userId, cashbackId);
  }
}
