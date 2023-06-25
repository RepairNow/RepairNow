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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MissionModule, ReviewModule, AnnouncementsModule, EstimatesModule, GeolocationModule, ValidationCodeModule],
  providers: [PrismaService, ValidationCodeService],
  controllers: [ValidationCodeController]

})
export class AppModule { }
