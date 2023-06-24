import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationtDto } from './dto/create-conversation.dto';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  // TODO: add JWT guard
  @Post('create-conv')
  async createConversation(
    @Body() createConversationDto: CreateConversationtDto,
  ) {
    return await this.conversationsService.createConversation(
      createConversationDto,
    );
  }

  // TODO: add JWT guard
  @Get(':id')
  async getAllConversationsByUserId(@Param('id') id: string) {
    return await this.conversationsService.findAllConversations(id);
  }
}
