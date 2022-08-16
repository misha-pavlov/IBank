import { Module } from '@nestjs/common';

import { AppConfigModule } from './app-config.module';
import { AppResolver } from './app.resolver';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [AppConfigModule, AuthModule, UserModule],
  providers: [AppResolver],
})
export class AppModule {}
