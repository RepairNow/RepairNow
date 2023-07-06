import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { PrismaService } from '@repairnow/prisma';
import { MissionStatus } from './enums/mission-status.enum';
import { CurrentUserI } from "./dto/current-user.dto";

function generateRandomNumber() {
  return Math.floor(Math.random() * 9000) + 1000;
}
@Injectable()
export class MissionService {
  constructor(private prismaService: PrismaService) { }

  async create(payload: { createMissionDto: CreateMissionDto, announcementId: string }) {

    try {
      const { createMissionDto, announcementId } = payload

      const prestataire = await this.prismaService.user.findUnique({
        where: {
          id: createMissionDto.prestataireId
        }
      });

      if (!prestataire) {
        return new NotFoundException("Le Prestataire n'existe pas");
      }

      const announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: announcementId
        }
      });

      if (!announcement) {
        return new NotFoundException("L'annonce n'existe pas");
      }

      // check if a mission already exists for this announcement
      const mission = await this.prismaService.mission.findFirst({
        where: {
          announcementId: announcementId
        }
      });

      if (mission) {
        return new BadRequestException("Une mission existe déjà pour cette annonce");
      }

      const createdMission = await this.prismaService.mission.create({
        data: {
          prestataireId: createMissionDto.prestataireId,
          announcementId: announcementId,
          currentStatus: MissionStatus.IN_PROGRESS
        }
      });

      await this.prismaService.validationCode.create({
        // @ts-ignore
        data: {
          missionId: createdMission.id,
          code: generateRandomNumber()
        }
      });

      return createdMission;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.mission.findMany();
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findUserAll(payload: { user: CurrentUserI, status: string }) {
    try {
      if (payload.status && MissionStatus[payload.status]) {

        return await this.prismaService.mission.findMany({
          where: {
            prestataireId: payload.user.id,
            currentStatus: MissionStatus[payload.status]
          },
          include: {
            announcement: {
              include: {
                images: true
              }
            }
          }
        })
      } else {
        return await this.prismaService.mission.findMany({
          where: {
            prestataireId: payload.user.id,
          },
          include: {
            announcement: {
              include: {
                job: true
              }
            }
          }
        })
      }
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(payload: { id: string }) {
    try {
      const mission = await this.prismaService.mission.findUnique({
        where: {
          id: payload.id
        },
        include: {
          announcement: {
            include: {
              images: true,
              estimates: {
                include: {
                  prestataire: true
                }
              },
              job: true
            }
          },
          validationCode: {
            select: {
              currentStatus: true
            }
          }
        }
      });
      if (!mission) {
        throw new NotFoundException();
      }
      return mission;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOneByAnnouncement(payload: { announcementId: string }) {
    try {
      const mission = await this.prismaService.mission.findUnique({
        where: {
          announcementId: payload.announcementId
        },
        include: {
          announcement: true,
          prestataire: true
        }
      });

      if (!mission) {
        return new NotFoundException("La mission n'existe pas pour cette annonce");
      }

      /*if (!announcement.mission) {
        return new NotFoundException("Aucune mission trouvée pour cette annonce");
      }*/

      return mission;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(payload: { updateMissionDto: UpdateMissionDto, id: string }) {
    try {
      const { updateMissionDto, id } = payload
      const mission = await this.prismaService.mission.findUnique({
        where: {
          id: id
        }
      });

      if (!mission) {
        return new NotFoundException("La mission n'existe pas");
      }

      if (mission.currentStatus === MissionStatus.DONE) {
        return new BadRequestException("La mission est déjà terminée");
      }

      return await this.prismaService.mission.update({
        where: {
          id: id
        },
        data: {
          currentStatus: updateMissionDto.currentStatus
        }
      });

    } catch (error) {
      return new BadRequestException(error.message);
    }
  }


  async updateByAnnouncement(payload: { updateMissionDto: UpdateMissionDto, announcementId: string }) {
    try {
      const { updateMissionDto, announcementId } = payload
      const mission = await this.prismaService.mission.findUnique({
        where: {
          announcementId: announcementId
        }
      });

      if (!mission) {
        return new NotFoundException("La mission n'existe pas");
      }

      if (mission.currentStatus === MissionStatus.DONE) {
        return new BadRequestException("La mission est déjà terminée");
      }

      return await this.prismaService.mission.update({
        where: {
          announcementId: announcementId
        },
        data: {
          currentStatus: updateMissionDto.currentStatus
        }
      });

    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const mission = await this.prismaService.mission.findUnique({
        where: {
          id: id
        }
      });

      if (!mission) {
        return new NotFoundException("La mission n'existe pas");
      }

      return await this.prismaService.mission.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
  async removeByAnnouncement(payload: { announcementId: string }) {
    try {
      const mission = await this.prismaService.mission.findUnique({
        where: {
          announcementId: payload.announcementId
        }
      });

      if (!mission) {
        return new NotFoundException("La mission n'existe pas");
      }

      await this.prismaService.validationCode.delete({
        where: {
          missionId: mission.id
        }
      })

      return await this.prismaService.mission.delete({
        where: {
          id: mission.id
        }
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
