import { Module } from '@nestjs/common';
import { MissionModule } from './mission/mission.module';
import { ReviewModule } from './review/review.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { EstimatesModule } from './estimates/estimates.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@repairnow/prisma';
import { GeolocationModule } from './geolocation/geolocation.module';
import { ValidationCodeService } from './validation.code/validation.code.service';
import { ValidationCodeController } from './validation.code/validation.code.controller';
import { ValidationCodeModule } from './validation.code/validation.code.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAILER_SERVER'),
          port: 465,
          secure: true,
          auth: {
            user: configService.get('MAILER_FROM'),
            pass: configService.get('MAILER_PASSWORD'),
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>'
        },
      }),
      inject: [ConfigService],
    }),
    MissionModule, ReviewModule, AnnouncementsModule, EstimatesModule, GeolocationModule, ValidationCodeModule, MailerModule],
  providers: [PrismaService, ValidationCodeService],
  controllers: [ValidationCodeController]

})
export class AppModule { }
