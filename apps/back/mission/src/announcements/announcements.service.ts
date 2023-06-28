import { Injectable, Inject, ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Prisma, PrismaService } from '@repairnow/prisma';
import { RpcException } from '@nestjs/microservices';
import { CurrentUserDto } from "@repairnow/dto";

export enum AnnouncementStatus {
  PUBLISHED = "PUBLISHED",
  DRAFT = "DRAFT",
  CANCEL = "CANCEL",
  ACTIVE = "ACTIVE",
  DONE = "DONE"
}

@Injectable()
export class AnnouncementsService {
  constructor(private prismaService: PrismaService) { }

  async create(payload: { createAnnouncementDto: CreateAnnouncementDto, user: CurrentUserDto }): Promise<any> {

    try {
      console.log(payload.createAnnouncementDto)
      const announcement = await this.prismaService.announcement.create({
        // @ts-ignore
        data: {
          ...payload.createAnnouncementDto,
          userId: payload.user.sub,
          currentStatus: AnnouncementStatus.PUBLISHED.toString()
        }
      });
      return announcement;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }


  async findAll() {
    try {
      const announcement = await this.prismaService.announcement.findMany({
        where: {
          currentStatus: AnnouncementStatus.PUBLISHED
        }
      })
      return announcement;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findUserAll(user: any) {
    try {
      const announcement = await this.prismaService.announcement.findMany({
        where: {
          currentStatus: AnnouncementStatus.PUBLISHED
        },
        include: {
          user: true
        }
      })
      return announcement;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(payload: { id: string }) {
    try {
      const announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: payload.id
        },
        include: {
          user: true
        }
      });
      if (!announcement) {
        throw new NotFoundException();
      }
      return announcement;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(payload: { updateAnnouncementDto: UpdateAnnouncementDto, user: CurrentUserDto, id: string }): Promise<any> {
    try {
      console.log(payload)
      let updatableAnnouncementStatus = [AnnouncementStatus.DRAFT.toString(), AnnouncementStatus.PUBLISHED.toString()];

      let announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: payload.id
        },
        include: {
          user: true
        }
      });
      if (!announcement) {
        throw new RpcException(new NotFoundException());
      }
      if (updatableAnnouncementStatus.includes(announcement.currentStatus)) {
        const updatedAnnouncement = await this.prismaService.announcement.update({
          where: {
            id: payload.id
          },
          // @ts-ignore
          data: {
            ...payload.updateAnnouncementDto
          }
        });
        return updatedAnnouncement;
      } else {
        throw new ForbiddenException('Vous ne pouvez pas mettre à jour une annonce qui a été acceptée, annulée ou terminée')
      }
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(payload: { id: string }) {
    let updatableAnnouncementStatus = [AnnouncementStatus.DRAFT.toString(), AnnouncementStatus.PUBLISHED.toString()];
    try {
      let announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: payload.id
        },
        include: {
          user: true
        }
      });
      if (!announcement) {
        throw new NotFoundException();
      }
      if (updatableAnnouncementStatus.includes(announcement.currentStatus)) {
        return await this.prismaService.announcement.update({
          where: {
            id: payload.id
          },
          // @ts-ignore
          data: {
            ...announcement,
            currentStatus: AnnouncementStatus.CANCEL
          }
        });
      }
      throw new ForbiddenException('Vous ne pouvez pas mettre à jour une annonce qui a été acceptée, annulée ou terminée')
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
