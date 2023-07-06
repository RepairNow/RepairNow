import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ComModule } from './com.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log("com-gateway");
  const app = await NestFactory.create<NestExpressApplication>(ComModule);
  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(process.env.COM_PORT);
}
bootstrap();
