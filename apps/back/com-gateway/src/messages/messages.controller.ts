import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDtoBody } from './dto/create-message.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Post('create-message')
  async createMessage(
    @Request() req,
    @Body() createMessageDto: CreateMessageDtoBody,
  ) {
    return await this.messagesService.createMessage({
      ...createMessageDto,
      sender_id: req.user.sub,
    });
  }

  @Get(':id')
  async getAllMessagesByConversationId(@Param('id') id: string) {
    return await this.messagesService.findAllMessages(id);
  }
}
