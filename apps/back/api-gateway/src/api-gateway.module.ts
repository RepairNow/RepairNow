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
            host: configService.get('AUTH_HOST'),
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
            host: configService.get('AUTH_HOST'),
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
        signOptions: { expiresIn: '1h' }
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ApiGatewayController, JobController, EstimatesController, AnnouncementsController, MissionController, ReviewController, GeolocationController, ValicationCodeController],
  providers: [
    ApiGatewayService,
    // list of global interceptors, not needed if you use the interceptor only in one controller
    {
      provide: APP_INTERCEPTOR,
      useClass: StatusInterceptor,
    },
  ],
})
export class ApiGatewayModule { }
