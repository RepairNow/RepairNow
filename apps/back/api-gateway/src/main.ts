import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  await app.listen(
    configService.get('API_GATEWAY_PORT'),
    '0.0.0.0',
    function () {
      console.log(
        'Hey ya ya ya ! ApiGateway is listening on port ' +
          configService.get('API_GATEWAY_PORT'),
      );
    },
  );
}
bootstrap();
