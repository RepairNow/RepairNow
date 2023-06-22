import { Body, Controller, Get, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('geoloc')
@UseGuards(AuthGuard)
export class GeolocationController {
    constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.missionClient.send({ cmd: 'findOneGeolocation' }, id);
    }

    @Patch()
    update(@Body() updateGeolocationDto: any) {
        return this.missionClient.send({ cmd: 'updateGeolocation' }, updateGeolocationDto);
    }
}
