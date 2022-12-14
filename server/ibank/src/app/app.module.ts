import { Module } from '@nestjs/common';

import { AppResolver } from './app.resolver';
import { AppConfigModule } from './app-config.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { CardModule } from '../modules/card/card.module';
import { SavingModule } from '../modules/saving/saving.module';
import { CashbackModule } from '../modules/cashback/cashback.module';
import { TransactionModule } from '../modules/transaction/transaction.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CardModule,
    SavingModule,
    CashbackModule,
    AppConfigModule,
    TransactionModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
