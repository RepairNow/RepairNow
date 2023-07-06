import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationDo } from 'src/_schemas/conversation.do';

export class ConversationsRepository {
  constructor(
    @InjectModel('Conversation')
    private conversationModel: Model<ConversationDo>,
  ) {}

  async createConversation(conversation): Promise<any> {
    const createOne = await this.conversationModel.create(conversation);
    return createOne;
  }

  async findAllConversations(id): Promise<any> {
    const findAll = await this.conversationModel.find({
      members: {
        $elemMatch: { userId: id },
      },
    });
    return findAll;
  }
}
