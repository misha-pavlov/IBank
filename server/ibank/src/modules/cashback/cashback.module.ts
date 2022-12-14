import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CashbackResolver } from './cashback.resolver';
import { Cashback, CashbackSchema } from './cashback.schema';
import { CashbackService } from './cashback.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cashback.name, schema: CashbackSchema },
    ]),
  ],
  providers: [CashbackService, CashbackResolver],
  exports: [CashbackService],
})
export class CashbackModule {}
