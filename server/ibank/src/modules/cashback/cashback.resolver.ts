import { Query, Resolver } from '@nestjs/graphql';
import { Cashback } from './cashback.schema';

import { CashbackService } from './cashback.service';

@Resolver()
export class CashbackResolver {
  constructor(private cashbackService: CashbackService) {}

  @Query(() => [Cashback])
  async getCashbacks(): Promise<Cashback[]> {
    return this.cashbackService.getCashbacks();
  }
}
