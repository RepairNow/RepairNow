import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { PrismaService } from '@repairnow/prisma';
import {MissionService} from "../mission/mission.service";

@Module({
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService, MissionService, PrismaService]
})
export class AnnouncementsModule { }
