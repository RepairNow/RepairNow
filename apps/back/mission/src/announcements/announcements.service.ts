import {
  Injectable,
  Inject,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Prisma, PrismaService } from '@repairnow/prisma';
import { RpcException } from '@nestjs/microservices';
import { CurrentUserDto } from '@repairnow/dto';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export enum AnnouncementStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  CANCEL = 'CANCEL',
  ACTIVE = 'ACTIVE',
  DONE = 'DONE',
}

@Injectable()
export class AnnouncementsService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: {
    createAnnouncementDto: CreateAnnouncementDto;
    user: CurrentUserDto;
  }): Promise<any> {
    try {
      const announcement = await this.prismaService.announcement.create({
        // @ts-ignore
        data: {
          ...payload.createAnnouncementDto,
          userId: payload.user.sub,
          currentStatus: AnnouncementStatus.PUBLISHED.toString(),
        },
      });
      return announcement;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll(query: { status: string }) {
    try {
      if (query && AnnouncementStatus[query.status]) {
        const announcement = await this.prismaService.announcement.findMany({
          where: {
            currentStatus: AnnouncementStatus[query.status],
          },
          include: {
            images: true,
            estimates: {
              include: {
                prestataire: {
                  select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                  },
                },
              },
            },
            job: true,
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                phoneNumber: true,
                role: true,
              },
            },
          },
        });
        return announcement;
      } else {
        const announcement = await this.prismaService.announcement.findMany({
          where: {
            currentStatus: AnnouncementStatus.PUBLISHED,
          },
          include: {
            images: true,
            estimates: {
              include: {
                prestataire: {
                  select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                  },
                },
              },
            },
            job: true,
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                phoneNumber: true,
                role: true,
              },
            },
          },
        });
        return announcement;
      }
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findUserAll(payload: { user: CurrentUserDto; status: string }) {
    try {
      if (payload.status && AnnouncementStatus[payload.status]) {
        const announcement = await this.prismaService.announcement.findMany({
          where: {
            currentStatus: AnnouncementStatus[payload.status],
            userId: payload.user.sub,
          },
          include: {
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                phoneNumber: true,
                role: true,
              },
            },
            images: true,
            estimates: {
              include: {
                prestataire: {
                  select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                  },
                },
              },
            },
            job: true,
            mission: {
              include: {
                review: true,
              },
            },
          },
        });

        return announcement;
      } else {
        const announcement = await this.prismaService.announcement.findMany({
          where: {
            currentStatus: AnnouncementStatus.PUBLISHED,
            userId: payload.user.sub,
          },
          include: {
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                phoneNumber: true,
                role: true,
              },
            },
            images: true,
            estimates: {
              include: {
                prestataire: {
                  select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                  },
                },
              },
            },
            job: true,
          },
        });

        return announcement;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(payload: { id: string }) {
    try {
      const announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: payload.id,
        },
        include: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true,
              phoneNumber: true,
              role: true,
            },
          },
          images: true,
          estimates: {
            include: {
              prestataire: {
                select: {
                  id: true,
                  firstname: true,
                  lastname: true,
                  email: true,
                  phoneNumber: true,
                  role: true,
                },
              },
            },
          },
          mission: {
            include: {
              review: true,
            },
          },
          job: true,
        },
      });
      if (!announcement) {
        throw new NotFoundException();
      }
      return announcement;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async upload(payload: { id: string; files: Array<Express.Multer.File> }) {
    let announcement = await this.prismaService.announcement.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!announcement) {
      throw new RpcException(new NotFoundException());
    }

    for (let file of payload.files) {
      await this.prismaService.files.create({
        data: {
          announcementId: payload.id,
          ...file,
        },
      });
    }

    return 'file(s) created';
  }

  async update(payload: {
    updateAnnouncementDto: UpdateAnnouncementDto;
    user: CurrentUserDto;
    id: string;
  }): Promise<any> {
    try {
      let updatableAnnouncementStatus = [
        AnnouncementStatus.DRAFT.toString(),
        AnnouncementStatus.PUBLISHED.toString(),
      ];

      let announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: payload.id,
        },
        include: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true,
              phoneNumber: true,
              role: true,
            },
          },
        },
      });
      if (!announcement) {
        throw new RpcException(new NotFoundException());
      }
      if (updatableAnnouncementStatus.includes(announcement.currentStatus)) {
        const updatedAnnouncement =
          await this.prismaService.announcement.update({
            where: {
              id: payload.id,
            },
            // @ts-ignore
            data: {
              ...payload.updateAnnouncementDto,
            },
          });
        return updatedAnnouncement;
      } else {
        throw new ForbiddenException(
          'Vous ne pouvez pas mettre à jour une annonce qui a été acceptée, annulée ou terminée',
        );
      }
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(payload: { id: string }) {
    let updatableAnnouncementStatus = [
      AnnouncementStatus.DRAFT.toString(),
      AnnouncementStatus.PUBLISHED.toString(),
    ];
    try {
      let announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: payload.id,
        },
        include: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true,
              phoneNumber: true,
              role: true,
            },
          },
        },
      });
      if (!announcement) {
        throw new NotFoundException();
      }
      if (updatableAnnouncementStatus.includes(announcement.currentStatus)) {
        return await this.prismaService.announcement.update({
          where: {
            id: payload.id,
          },
          // @ts-ignore
          data: {
            ...announcement,
            currentStatus: AnnouncementStatus.CANCEL,
          },
        });
      }
      throw new ForbiddenException(
        'Vous ne pouvez pas mettre à jour une annonce qui a été acceptée, annulée ou terminée',
      );
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
