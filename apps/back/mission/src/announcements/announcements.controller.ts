import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Controller()
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @MessagePattern('createAnnouncement')
  create(@Payload() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @MessagePattern('findAllAnnouncements')
  findAll() {
    return this.announcementsService.findAll();
  }

  @MessagePattern('findOneAnnouncement')
  findOne(@Payload() id: number) {
    return this.announcementsService.findOne(id);
  }

  @MessagePattern('updateAnnouncement')
  update(@Payload() updateAnnouncementDto: UpdateAnnouncementDto) {
    return this.announcementsService.update(updateAnnouncementDto.id, updateAnnouncementDto);
  }

  @MessagePattern('removeAnnouncement')
  remove(@Payload() id: number) {
    return this.announcementsService.remove(id);
  }
}
