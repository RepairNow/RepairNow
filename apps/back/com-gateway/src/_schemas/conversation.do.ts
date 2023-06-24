import { Types } from 'mongoose';

export class ConversationDo {
  _id: Types.ObjectId;
  members: Array<string>;

  constructor(props: Partial<ConversationDo>) {
    this._id = props._id || null;
    this.members = props.members || null;
  }
}