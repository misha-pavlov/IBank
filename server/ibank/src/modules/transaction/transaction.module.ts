import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';
import { Transaction, TransactionSchema } from './transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [TransactionService, TransactionResolver],
  exports: [TransactionService],
})
export class TransactionModule {}
