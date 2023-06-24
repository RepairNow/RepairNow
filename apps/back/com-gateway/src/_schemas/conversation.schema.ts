import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ versionKey: false, timestamps: true })
export class Conversation {
  @Prop({ ref: 'User', type: [SchemaTypes.String] })
  members: [string];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
