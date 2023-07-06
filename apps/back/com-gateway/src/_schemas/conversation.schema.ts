import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;
@Schema({ versionKey: false, timestamps: true })
export class Conversation {
  @Prop({ ref: 'User', type: Object })
  members: [object];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
