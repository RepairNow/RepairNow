import { Types } from 'mongoose';

export class ConversationDo {
  _id: Types.ObjectId;
  members: Array<object>;
  announcementId: string;

  constructor(props: Partial<ConversationDo>) {
    this._id = props._id || null;
    this.members = props.members || null;
    this.announcementId = props.announcementId || null;
  }
}
