import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { PrismaService } from '@repairnow/prisma';


enum MissionStatus {
  IN_PROGRESS = "IN PROGRESS",
  DONE = "DONE"
}

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
        return new BadRequestException("Le Prestataire n'existe pas");
      }

      const announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: createMissionDto.announcementId
        }
      });

      if (!announcement) {
        return new BadRequestException("L'annonce n'existe pas");
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
          status: MissionStatus.IN_PROGRESS
        }
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all mission`;
  }

  findOne(id: string) {
    return `This action returns a #${id} mission`;
  }

  update(id: string, updateMissionDto: UpdateMissionDto) {
    return `This action updates a #${id} mission`;
  }

  remove(id: string) {
    return `This action removes a #${id} mission`;
  }
}
