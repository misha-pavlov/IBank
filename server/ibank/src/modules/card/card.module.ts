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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: User.name, schema: UserSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [CardService, CardResolver],
  exports: [CardService],
})
export class CardModule {}
