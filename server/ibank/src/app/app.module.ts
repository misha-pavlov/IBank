import { Module } from '@nestjs/common';

import { AppConfigModule } from './app-config.module';
import { AppResolver } from './app.resolver';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { CardModule } from '../modules/card/card.module';

@Module({
  imports: [AppConfigModule, AuthModule, UserModule, CardModule],
  providers: [AppResolver],
})
export class AppModule {}
