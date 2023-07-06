import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDo } from 'src/_schemas/notification.do';

export class NotificationsRepository {
  constructor(
    @InjectModel('Notification')
    private notificationModel: Model<NotificationDo>
  ) { }

  async createNotification(notification): Promise<any> {
    const createOne = await this.notificationModel.create(notification);
    return createOne;
  }

  async findAllNotifications(): Promise<any> {
    const findAll = await this.notificationModel.find();
    return findAll;
  }
}
