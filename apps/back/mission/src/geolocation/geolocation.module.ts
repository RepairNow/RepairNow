import { Module } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { GeolocationController } from './geolocation.controller';
import { PrismaService } from '@repairnow/prisma';

@Module({
  controllers: [GeolocationController],
  providers: [GeolocationService, PrismaService]
})
export class GeolocationModule { }
