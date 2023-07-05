import { Controller, UseFilters, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GeolocationService } from './geolocation.service';
import { UpdateGeolocationDto } from './dto/update-geolocation.dto';
import { RpcValidationFilter } from 'src/filters/rpc-validation.filter';

@Controller()
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) { }

  @MessagePattern({ cmd: 'findOneGeolocation' })
  findOne(@Payload() id: string) {
    return this.geolocationService.findOne(id);
  }

  @MessagePattern({ cmd: 'findAnnouncementGeoloc' })
  findAnnouncementGeoloc(@Payload() announcementId: string) {
    return this.geolocationService.findAnnouncementGeoloc(announcementId);
  }

  @MessagePattern({ cmd: 'updateGeolocation' })
  @UseFilters(RpcValidationFilter)
  update(@Payload(ValidationPipe) updateGeolocationDto: UpdateGeolocationDto) {
    return this.geolocationService.update(updateGeolocationDto);
  }
}
