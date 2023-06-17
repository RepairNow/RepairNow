import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { JobModule } from './job/job.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(JobModule);
  // when using dto validation, all the request body will be validated
  // see https://docs.nestjs.com/techniques/validation#auto-validation
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('JOB_PORT'),
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
