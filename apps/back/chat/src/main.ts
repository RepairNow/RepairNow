import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // First message when the app is ready
  await app.listen(3004, 'localhost', function () {
    console.log('Hey ya ya ya ! Chat app listening 3004');
  });
}
bootstrap();
