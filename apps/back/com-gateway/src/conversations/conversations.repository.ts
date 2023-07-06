import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationDo } from 'src/_schemas/conversation.do';

export class ConversationsRepository {
  constructor(
    @InjectModel('Conversation')
    private conversationModel: Model<ConversationDo>,
  ) {}

  async createConversation(conversation): Promise<ConversationDo> {
    const createOne = await this.conversationModel.create(conversation);
    return createOne;
  }

  async findAllConversations(id): Promise<ConversationDo[]> {
    const findAll = await this.conversationModel.find({
      members: {
        $elemMatch: { userId: id },
      },
    });
    return findAll;
  }

  async isConversationExistWithMembersAndAnnouncementId(
    members: any[],
    announcementId: string,
  ) {
    const findConversation = await this.conversationModel.findOne({
      members: {
        $all: members,
      },
      announcementId: announcementId,
    });
    return findConversation;
  }
}
