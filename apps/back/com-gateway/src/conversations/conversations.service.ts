import { Injectable } from '@nestjs/common';
import { CreateConversationtDto } from './dto/create-conversation.dto';
import { ConversationsRepository } from './conversations.repository';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly conversationsRepository: ConversationsRepository,
  ) {}

  async createConversation(createConversationDto: CreateConversationtDto) {
    return await this.conversationsRepository.createConversation(
      createConversationDto,
    );
  }

  async findAllConversations(id: string) {
    return await this.conversationsRepository.findAllConversations(id);
  }
}
