import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/notification.dto';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
    constructor(private readonly notificationRepository: NotificationsRepository) { }

    async createNotification(createNotificationDto: CreateNotificationDto) {
        return await this.notificationRepository.createNotification(createNotificationDto);
    }

    async findAllNotifications() {
        return await this.notificationRepository.findAllNotifications();
    }
}
