import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CardResolver } from './card.resolver';
import { Card, CardSchema } from './card.schema';
import { CardService } from './card.service';
import { User, UserSchema } from './../user/user.schema';
import {
  Transaction,
  TransactionSchema,
} from './../transaction/transaction.schema';
import { Saving, SavingSchema } from '../saving/saving.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: User.name, schema: UserSchema },
      { name: Saving.name, schema: SavingSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [CardService, CardResolver],
  exports: [CardService],
})
export class CardModule {}
