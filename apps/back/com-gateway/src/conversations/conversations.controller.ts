import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationtDto } from './dto/create-conversation.dto';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @UseGuards(AuthGuard)
  @Post('create-conv')
  async createConversationWithMeInside(
    @Req() req,
    @Body() createConversationDto: CreateConversationtDto,
  ) {
    const membersWithMe = {
      members: [
        ...createConversationDto.members,
        { userId: req.user.sub, userFirstname: req.user.firstname },
      ],
    };
    return await this.conversationsService.createConversation(membersWithMe);
  }

  @Get(':id')
  async getAllConversationsByUserId(@Param('id') id: string) {
    return await this.conversationsService.findAllConversations(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllMyConversations(@Req() req) {
    return await this.conversationsService.findAllConversations(req.user.sub);
  }
}
