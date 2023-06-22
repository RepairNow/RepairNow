import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
@Controller()
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) { }

  @MessagePattern({ cmd: 'createAnnouncement' })
  create(@Payload() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @MessagePattern({ cmd: 'findAllAnnouncements' })
  findAll() {
    return this.announcementsService.findAll();
  }

  @MessagePattern({ cmd: 'findOneAnnouncement' })
  findOne(@Payload() payload: { id: string }) {
    return this.announcementsService.findOne(payload);
  }

  @MessagePattern({ cmd: 'updateAnnouncement' })
  update(@Payload() updateAnnouncementDto: UpdateAnnouncementDto) {
    return this.announcementsService.update(updateAnnouncementDto);
  }

  @MessagePattern({ cmd: 'removeAnnouncement' })
  remove(@Payload() payload: { id: string }) {
    return this.announcementsService.remove(payload);
  }
}
