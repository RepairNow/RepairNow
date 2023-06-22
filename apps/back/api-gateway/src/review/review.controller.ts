import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('announcements/:announcementId/reviews')
@UseGuards(AuthGuard)
export class ReviewController {
    constructor(@Inject('MISSION_SERVICE') private missionClient: ClientProxy) { }

    @Post()
    create(@Body() createReviewDto: any) {
        return this.missionClient.send({ cmd: 'createReview' }, createReviewDto);
    }

    @Get()
    findAll() {
        return this.missionClient.send({ cmd: 'findAllReview' }, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.missionClient.send({ cmd: 'findOneReview' }, id);
    }

    @Patch()
    update(@Body() updateReviewDto: any) {
        return this.missionClient.send({ cmd: 'updateReview' }, updateReviewDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.missionClient.send({ cmd: 'removeReview' }, id);
    }
}