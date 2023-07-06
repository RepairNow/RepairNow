import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;
@Schema({ versionKey: false, timestamps: true })
export class Conversation {
  @Prop({ ref: 'User', type: Object })
  members: [object];

  @Prop({ ref: 'Announcement', type: String })
  announcementId: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
