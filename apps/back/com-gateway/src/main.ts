import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ComModule } from './com.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log("start");
  const app = await NestFactory.create<NestExpressApplication>(ComModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(process.env.COM_PORT);
}
bootstrap();
