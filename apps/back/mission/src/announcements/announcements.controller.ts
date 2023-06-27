import { Controller, Request } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { CurrentUserDto } from '@repairnow/dto';
@Controller()
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) { }

  @MessagePattern({ cmd: 'createAnnouncement' })
  create(@Payload() payload: { createAnnouncementDto: CreateAnnouncementDto, user: CurrentUserDto }) {
    return this.announcementsService.create(payload);
  }

  @MessagePattern({ cmd: 'findAllAnnouncements' })
  findAllAnnouncements() {
    return this.announcementsService.findAll();
  }

  @MessagePattern({ cmd: 'findUserAnnouncements' })
  findUserAnnouncements(@Payload() user) {
    return this.announcementsService.findUserAll(user);
  }

  @MessagePattern({ cmd: 'findOneAnnouncement' })
  findOne(@Payload() payload: { id: string }) {
    return this.announcementsService.findOne(payload);
  }

  @MessagePattern({ cmd: 'updateAnnouncement' })
  update(@Payload() payload: { updateAnnouncementDto: UpdateAnnouncementDto, user: CurrentUserDto, id: string }) {
    return this.announcementsService.update(payload);
  }

  @MessagePattern({ cmd: 'removeAnnouncement' })
  remove(@Payload() payload: { id: string }) {
    return this.announcementsService.remove(payload);
  }
}
