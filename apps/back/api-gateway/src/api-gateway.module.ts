import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { StatusInterceptor } from './interceptors/status.interceptor';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST') || 'localhost',
            port: configService.get('AUTH_PORT') || 3001,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule.register({
      global: true,
      // TODO: Store this secret differently
      secret: 'CHANGE_ME',
      signOptions: { expiresIn: '6s' },
    }),
  ],
  controllers: [ApiGatewayController],
  providers: [
    ApiGatewayService,
    // list of global interceptors, not needed if you use the interceptor only in one controller
    {
      provide: APP_INTERCEPTOR,
      useClass: StatusInterceptor,
    },
  ],
})
export class ApiGatewayModule {}
