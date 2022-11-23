import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Saving, SavingSchema } from './saving.schema';
import { SavingService } from './saving.service';
import { SavingResolver } from './saving.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Saving.name, schema: SavingSchema }]),
  ],
  providers: [SavingService, SavingResolver],
  exports: [SavingService],
})
export class SavingModule {}
