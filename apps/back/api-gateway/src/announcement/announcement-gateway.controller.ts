import { Controller, UseInterceptors, Inject, Body, UseGuards, Post, Get, Param, Patch, UseFilters, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "../guards/auth.guard";
import { Observable } from "rxjs";
import { ExceptionFilter } from "../filters/rpc-exception.filter";

@Controller('/announcements')
@UseGuards(AuthGuard)
export class AnnouncementsController {
  constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

  @Post('')
  createAnnouncement(@Body() payload): Observable<any> {
    return this.missionClient.send({ cmd: "createAnnouncement" }, { ...payload });
  }

  @Get('')
  findAll(): Observable<any> {
    return this.missionClient.send({ cmd: "findAllAnnouncements" }, {});
  }

  @Get('/:id')
  findOne(@Param() param: { id: string }): Observable<any> {
    return this.missionClient.send({ cmd: "findOneAnnouncement" }, { id: param.id });
  }

  @Patch('/:id')
  @UseFilters(new ExceptionFilter())
  updateAnnouncement(@Param() param: { id: string }, @Body() payload): Observable<any> {
    return this.missionClient.send({ cmd: "updateAnnouncement" }, { id: param.id, ...payload });
  }

  @Delete('/:id')
  remove(@Param() param: { id: string }): Observable<any> {
    return this.missionClient.send({ cmd: "removeAnnouncement" }, { id: param.id });
  }
}
