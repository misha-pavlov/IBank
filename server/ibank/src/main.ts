import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app/app.module';

async function server() {
  const app = await NestFactory.create(AppModule, { logger: ["log"] });

  app.enableCors();

  await app.listen(8080);
}

server();
