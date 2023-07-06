import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('announcements/:announcementId/mission/review')
@UseGuards(AuthGuard)
export class ReviewController {
    constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

    @Post()
    create(@Param('announcementId') id: string, @Body() createReviewDto: any) {
        return this.missionClient.send({ cmd: 'createReview' }, { id, ...createReviewDto });
    }

    // @Get()
    // findAll() {
    //     return this.missionClient.send({ cmd: 'findAllReview' }, '');
    // }

    @Get()
    findOne(@Param('announcementId') id: string) {
        return this.missionClient.send({ cmd: 'findOneReview' }, id);
    }

    @Patch()
    update(@Param('announcementId') id: string, @Body() updateReviewDto: any) {
        return this.missionClient.send({ cmd: 'updateReview' }, {announcementId: id, payload: updateReviewDto});
    }

    @Delete(':id')
    remove(@Param('announcementId') id: string) {
        return this.missionClient.send({ cmd: 'removeReview' }, id);
    }
}