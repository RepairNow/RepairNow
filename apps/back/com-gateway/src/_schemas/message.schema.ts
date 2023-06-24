import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ versionKey: false, timestamps: true })
export class Message {
  @Prop({ ref: 'Conversation', type: SchemaTypes.ObjectId })
  conversation_id: ObjectId;

  @Prop({ ref: 'User', type: SchemaTypes.String })
  sender_id: string;

  @Prop()
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
