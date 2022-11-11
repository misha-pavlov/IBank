import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CardResolver } from './card.resolver';
import { Card, CardSchema } from './card.schema';
import { CardService } from './card.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  providers: [CardService, CardResolver],
  exports: [CardService],
})
export class CardModule {}
