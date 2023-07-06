import {Injectable, BadRequestException, NotFoundException} from '@nestjs/common';
import { PrismaService } from '@repairnow/prisma';
import { ValicationCodeDto } from './dto/validationCodeDto';
import { MissionStatus } from 'src/mission/enums/mission-status.enum';
import { ValidationStatus } from './enums/validation-status';
import {AnnouncementStatus} from "../announcements/announcements.service";
@Injectable()
export class ValidationCodeService {
  constructor(private prismaService: PrismaService) { }

  async create(payload: { missionId: string, validationCodeDto: ValicationCodeDto }) {
    try {
      const mission = await this.prismaService.mission.findUnique({
        where: {
          id: payload.missionId
        }
      });

      if (!mission){
        return new NotFoundException("Cette mission n'existe pas");
      }

      if (mission.currentStatus === MissionStatus.DONE) {
        return new BadRequestException("Cette mission est déjà validée");
      }

      const validationCode = await this.prismaService.validationCode.findUnique({
        where: {
          missionId: payload.missionId
        }
      });

      if (!validationCode) {
        return new BadRequestException("Aucun code pour cette mission");
      }

      if (validationCode.currentStatus === ValidationStatus.PENDING) {
        return new BadRequestException("En attente de validation du prestataire");
      }

      if (payload.validationCodeDto.code !== validationCode.code) {
        return new BadRequestException("Code invalide, veuillez réessayer");
      }

      await this.prismaService.validationCode.update({
        where: {
          missionId: payload.missionId
        },
        data: {
          currentStatus: ValidationStatus.VALIDATED
        }
      });

      await this.prismaService.mission.update({
        where: {
          id: payload.missionId
        },
        data: {
          currentStatus: MissionStatus.DONE
        }
      });

      const updatedAnnouncement = await this.prismaService.announcement.update({
        where: {
          id: mission.announcementId
        },
        data: {
          currentStatus: AnnouncementStatus.DONE
        }
      })

      return { message: "Code validé" }
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async validateMissionAsContractor(missionId: string) {
    try {
      const mission = await this.prismaService.mission.findUnique({
        where: {
          id: missionId
        }
      });

      if (mission.currentStatus === MissionStatus.DONE) {
        return new BadRequestException("Cette mission est déjà validée");
      }

      return this.prismaService.validationCode.update({
        where: {
          missionId: missionId
        },
        data: {
          currentStatus: ValidationStatus.WAITING_FOR_APPROVAL
        }
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async missionCode(missionId: string) {
    try {
      const mission = await this.prismaService.mission.findUnique({
        where: {
          id: missionId
        }
      });

      if (!mission){
        return new NotFoundException("Cette mission n'existe pas");
      }

      if (mission.currentStatus === MissionStatus.DONE) {
        return new BadRequestException("Cette mission est déjà validée");
      }

      return this.prismaService.validationCode.findFirst({
        where: {
          missionId: missionId
        }
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
