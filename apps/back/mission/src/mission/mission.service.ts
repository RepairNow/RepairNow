import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { PrismaService } from '@repairnow/prisma';
import { MissionStatus } from './enums/mission-status.enum';

@Injectable()
export class MissionService {
  constructor(private prismaService: PrismaService) { }

  async create(createMissionDto: CreateMissionDto) {

    try {

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
          id: createMissionDto.announcementId
        }
      });

      if (!announcement) {
        return new NotFoundException("L'annonce n'existe pas");
      }

      // check if a mission already exists for this announcement
      const mission = await this.prismaService.mission.findFirst({
        where: {
          announcementId: createMissionDto.announcementId
        }
      });

      if (mission) {
        return new BadRequestException("Une mission existe déjà pour cette annonce");
      }


      return this.prismaService.mission.create({
        data: {
          prestataireId: createMissionDto.prestataireId,
          announcementId: createMissionDto.announcementId,
          currentStatus: MissionStatus.IN_PROGRESS
        }
      });
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

  async findOne(announcementId: string) {
    try {
      const announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: announcementId
        },
        include: {
          mission: true
        }
      });

      if (!announcement) {
        return new NotFoundException("L'annonce n'existe pas");
      }

      if (!announcement.mission) {
        return new NotFoundException("Aucune mission trouvée pour cette annonce");
      }

      return announcement.mission;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(updateMissionDto: UpdateMissionDto) {
    try {
      const mission = await this.prismaService.mission.findUnique({
        where: {
          id: updateMissionDto.id
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
          id: mission.id
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
}
