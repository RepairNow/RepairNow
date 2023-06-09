import {Controller, Request, ValidationPipe} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { CurrentUserDto } from '@repairnow/dto';
import {MissionService} from "../mission/mission.service";
import {CreateMissionDto} from "../mission/dto/create-mission.dto";
import {UpdateMissionDto} from "../mission/dto/update-mission.dto";
import { CreateFileDto } from './dto/create-file.dto';
@Controller()
export class AnnouncementsController {
  constructor(
      private readonly announcementsService: AnnouncementsService,
      private readonly missionService: MissionService
  ) { }

  @MessagePattern({ cmd: 'createAnnouncement' })
  create(@Payload() payload: { createAnnouncementDto: CreateAnnouncementDto, user: CurrentUserDto}) {
    return this.announcementsService.create(payload);
  }

  @MessagePattern({ cmd: 'findAllAnnouncements' })
  findAllAnnouncements(query: { status: string }) {
    return this.announcementsService.findAll(query);
  }

  @MessagePattern({ cmd: 'findUserAnnouncements' })
  findUserAnnouncements(@Payload() payload: { user: CurrentUserDto, status: string }) {
    return this.announcementsService.findUserAll(payload);
  }

  @MessagePattern({ cmd: 'findOneAnnouncement' })
  findOne(@Payload() payload: { id: string }) {
    return this.announcementsService.findOne(payload);
  }

  @MessagePattern({ cmd: 'updateAnnouncement' })
  update(@Payload() payload: { updateAnnouncementDto: UpdateAnnouncementDto, user: CurrentUserDto, id: string }) {
    return this.announcementsService.update(payload);
  }

  @MessagePattern({ cmd: 'uploadAnnouncementImages' })
  upload(@Payload() payload: { files: Array<Express.Multer.File>, user: CurrentUserDto, id: string }) {
    return this.announcementsService.upload(payload);
  }

  @MessagePattern({ cmd: 'removeAnnouncement' })
  remove(@Payload() payload: { id: string }) {
    return this.announcementsService.remove(payload);
  }

  @MessagePattern({ cmd: 'createMissionOfAnnouncement' })
  createMissionOfAnnouncement(@Payload() payload: { createMissionDto: CreateMissionDto, announcementId: string }) {
    return this.missionService.create(payload)
  }

  @MessagePattern({ cmd: 'findMissionOfAnnouncement' })
  findMissionOfAnnouncement(@Payload() payload: { announcementId: string }) {
    return this.missionService.findOneByAnnouncement(payload)
  }

  @MessagePattern({ cmd: 'updateMissionOfAnnouncement' })
  updateMissionOfAnnouncement(@Payload(ValidationPipe) payload: {updateMissionDto: UpdateMissionDto, announcementId: string}) {
    return this.missionService.updateByAnnouncement(payload)
  }

  @MessagePattern({ cmd: 'removeMissionOfAnnouncement' })
  removeMissionOfAnnouncement(@Payload() payload: { announcementId: string }) {
    return this.missionService.removeByAnnouncement(payload)
  }
}
