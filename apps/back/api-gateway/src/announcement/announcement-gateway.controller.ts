import { Controller, Request, Inject, Body, UseGuards, ParseFilePipe, MaxFileSizeValidator, Post, Query, Get, Param, Patch, UseFilters, Delete, UseInterceptors, UploadedFiles } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "../guards/auth.guard";
import { Observable, firstValueFrom } from "rxjs";
import { ExceptionFilter } from "../filters/rpc-exception.filter";
import { CurrentUserDto } from "@repairnow/dto"

@Controller('/announcements')
//@UseGuards(AuthGuard)
export class AnnouncementsController {
  constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

  @Post()
  @UseGuards(AuthGuard)
  createAnnouncement(@Body() createAnnouncementDto, @Request() request): Observable<any> {
    const { user } = request;
    return this.missionClient.send({ cmd: "createAnnouncement" }, { createAnnouncementDto, user });
  }

  @Get()
  findAll(@Query() query): Observable<any> {
    const { status } = query;
    return this.missionClient.send({ cmd: "findAllAnnouncements" }, { status: status ? status : null });
  }

  @Get('/my-announcements')
  @UseGuards(AuthGuard)
  findUserAnnouncements(@Request() request, @Query() query): Observable<any> {
    const { user }: { user: CurrentUserDto } = request;
    const { status } = query;
    return this.missionClient.send({ cmd: "findUserAnnouncements" }, { user, status: status ? status : null });
  }

  @Get('/:id')
  findOne(@Param() param: { id: string }): Observable<any> {
    return this.missionClient.send({ cmd: "findOneAnnouncement" }, { id: param.id });
  }

  @Patch('/:id')
  @UseFilters(new ExceptionFilter())
  @UseGuards(AuthGuard)
  updateAnnouncement(@Param() params, @Body() updateAnnouncementDto, @Request() request): Observable<any> {
    const { user } = request;
    return this.missionClient.send({ cmd: "updateAnnouncement" }, { updateAnnouncementDto: updateAnnouncementDto, user, id: params.id });
  }

  @Patch('/:id/uploads')
  @UseFilters(new ExceptionFilter())
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  uploadAnnouncementImages(@UploadedFiles(new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 1000000 })]})) files: Array<Express.Multer.File>, @Param() params, @Request() request): Observable<any> {
    const { user } = request;
    return this.missionClient.send({ cmd: "uploadAnnouncementImages" }, { files, user, id: params.id });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  remove(@Param() param: { id: string }): Observable<any> {
    return this.missionClient.send({ cmd: "removeAnnouncement" }, { id: param.id });
  }

  /**
   * Announcement mission
   */

  @Post('/:id/mission')
  @UseGuards(AuthGuard)
  createMissionOfAnnouncement(@Param('id') id: string, @Body() createMissionDto: any) {
    return this.missionClient.send({ cmd: 'createMissionOfAnnouncement' },{createMissionDto: createMissionDto, announcementId: id});
  }

  @Get('/:id/mission')
  @UseGuards(AuthGuard)
  findMissionOfAnnouncement(@Param('id') id: string): Observable<any> {
    return this.missionClient.send({ cmd: 'findMissionOfAnnouncement' }, { announcementId: id });
  }

  @Patch('/:id/mission')
  @UseGuards(AuthGuard)
  updateMissionOfAnnouncement(@Param('id') id: string, @Body() updateMissionDto: any) {
    return this.missionClient.send({ cmd: 'updateMissionOfAnnouncement' }, {updateMissionDto: updateMissionDto, announcementId: id});
  }

  @Delete('/:id/mission')
  @UseGuards(AuthGuard)
  removeMissionOfAnnouncement(@Param('id') id: string) {
    return this.missionClient.send({ cmd: 'removeMissionOfAnnouncement' }, { announcementId: id });
  }
}
