import { Types } from 'mongoose';

export class NotificationDo {
  _id: Types.ObjectId;
  title: string;
  content: string;

  constructor(props: Partial<NotificationDo>) {
    this._id = props._id || null;
    this.title = props.title || null;
    this.content = props.content || null;
  }
}
