import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { PrismaService } from '@repairnow/prisma';

@Module({
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService, PrismaService]
})
export class AnnouncementsModule { }
