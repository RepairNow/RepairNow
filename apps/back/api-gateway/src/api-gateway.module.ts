import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { StatusInterceptor } from './interceptors/status.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { JobController } from './job/job.controller';
import { AnnouncementsController } from './announcement/announcement-gateway.controller';
import { EstimatesController } from './estimate/estimate.controller';
import { MissionController } from './mission/mission.controller';
import { ReviewController } from './review/review.controller';
import { GeolocationController } from './geolocation/geolocation.controller';
import { ValicationCodeController } from './valication.code/valication.code.controller';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from '@repairnow/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT')
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'JOB_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('JOB_HOST'),
            port: configService.get('JOB_PORT')
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'MISSION_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('MISSION_HOST'),
            port: configService.get('MISSION_PORT')
          },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' }
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [ApiGatewayController, JobController, EstimatesController, AnnouncementsController, MissionController, ReviewController, GeolocationController, ValicationCodeController],
  providers: [
    PrismaService,
    ApiGatewayService,
    // 👇 Both tokens strategies replace our previous @useGuards(AuthGuard) in controllers
    // went from api-gateway/src/guards/auth.guard.ts
    AccessTokenStrategy,
    RefreshTokenStrategy,
    // list of global interceptors, not needed if you use the interceptor only in one controller
    {
      provide: APP_INTERCEPTOR,
      useClass: StatusInterceptor,
    },
  ],
})
export class ApiGatewayModule { }
