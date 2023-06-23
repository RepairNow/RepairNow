import { Module } from '@nestjs/common';
import { MissionModule } from './mission/mission.module';
import { ReviewModule } from './review/review.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { EstimatesModule } from './estimates/estimates.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@repairnow/prisma';
import { GeolocationModule } from './geolocation/geolocation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MissionModule, ReviewModule, AnnouncementsModule, EstimatesModule, GeolocationModule],
  providers: [PrismaService]

})
export class AppModule { }
