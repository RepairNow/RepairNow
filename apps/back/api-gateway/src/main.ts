import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Repair Now API Doc')
    .setDescription('The Repair Now API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('API_GATEWAY_PORT'), '0.0.0.0', function () {
    console.log('Hey ya ya ya ! ApiGateway is listening on port ' + configService.get('API_GATEWAY_PORT'));
  });
}
bootstrap();