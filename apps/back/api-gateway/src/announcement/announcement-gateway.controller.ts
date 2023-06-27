import { Controller, Request, Inject, Body, UseGuards, Post, Get, Param, Patch, UseFilters, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "../guards/auth.guard";
import { Observable } from "rxjs";
import { ExceptionFilter } from "../filters/rpc-exception.filter";
import { CurrentUserDto } from "@repairnow/dto"
@Controller('/announcements')
//@UseGuards(AuthGuard)
export class AnnouncementsController {
  constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

  @Post()
  createAnnouncement(@Body() createAnnouncementDto, @Request() request): Observable<any> {
    const { user } = request;
    return this.missionClient.send({ cmd: "createAnnouncement" }, { createAnnouncementDto, user });
  }

  @Get()
  findAll(): Observable<any> {
    return this.missionClient.send({ cmd: "findAllAnnouncements" }, '');
  }

  @Get('/my-announcements')
  @UseGuards(AuthGuard)
  findUserAnnouncements(@Request() request): Observable<any> {
    const { user }: { user: CurrentUserDto } = request;
    return this.missionClient.send({ cmd: "findUserAnnouncements" }, user);
  }

  @Get('/:id')
  findOne(@Param() param: { id: string }): Observable<any> {
    return this.missionClient.send({ cmd: "findOneAnnouncement" }, { id: param.id });
  }

  @Patch('/:id')
  @UseFilters(new ExceptionFilter())
  updateAnnouncement(@Param() params, @Body() updateAnnouncementDto, @Request() request): Observable<any> {
    const { user } = request;
    return this.missionClient.send({ cmd: "updateAnnouncement" }, { id: params.id, updateAnnouncementDto, user });
  }

  @Delete('/:id')
  remove(@Param() param: { id: string }): Observable<any> {
    return this.missionClient.send({ cmd: "removeAnnouncement" }, { id: param.id });
  }
}
