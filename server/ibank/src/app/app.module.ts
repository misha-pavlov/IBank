import { Module } from '@nestjs/common';

import { AppResolver } from './app.resolver';
import { AppConfigModule } from './app-config.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { CardModule } from '../modules/card/card.module';
import { TransactionModule } from '../modules/transaction/transaction.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CardModule,
    AppConfigModule,
    TransactionModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
