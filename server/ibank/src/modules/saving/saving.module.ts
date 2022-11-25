import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Saving, SavingSchema } from './saving.schema';
import { SavingService } from './saving.service';
import { SavingResolver } from './saving.resolver';
import { Card, CardSchema } from '../card/card.schema';
import {
  Transaction,
  TransactionSchema,
} from '../transaction/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: Saving.name, schema: SavingSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [SavingService, SavingResolver],
  exports: [SavingService],
})
export class SavingModule {}
