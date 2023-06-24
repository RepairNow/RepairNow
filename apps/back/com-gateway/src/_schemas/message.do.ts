import { Types } from 'mongoose';

export class MessageDo {
  _id: Types.ObjectId;
  conversation_id: Types.ObjectId;
  sender_id: string;
  message: string;

  constructor(props: Partial<MessageDo>) {
    this._id = props._id || null;
    this.conversation_id = props.conversation_id || null;
    this.sender_id = props.sender_id || null;
    this.message = props.message || null;
  }
}
