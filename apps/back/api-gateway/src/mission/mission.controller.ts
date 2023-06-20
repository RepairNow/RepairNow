import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('missions')
@UseGuards(AuthGuard)
export class MissionController {
    constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

    @Post()
    create(@Body() createMissionDto: any) {
        return this.missionClient.send({ cmd: 'createMission' }, createMissionDto);
    }

    @Get()
    findAll() {
        return this.missionClient.send({ cmd: 'findAllMission' }, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.missionClient.send({ cmd: 'findOneMission' }, id);
    }

    @Patch()
    update(@Body() updateMissionDto: any) {
        return this.missionClient.send({ cmd: 'updateMission' }, updateMissionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.missionClient.send({ cmd: 'removeMission' }, id);
    }
}