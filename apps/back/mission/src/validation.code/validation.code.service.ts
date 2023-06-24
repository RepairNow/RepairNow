import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@repairnow/prisma';
import { ValicationCodeDto } from './dto/validationCodeDto';
import { MissionStatus } from 'src/mission/enums/mission-status.enum';
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

      if (payload.validationCodeDto.code !== validationCode.code) {
        return new BadRequestException("Code invalide, veuillez réessayer");
      }

      await this.prismaService.mission.update({
        where: {
          id: payload.missionId
        },
        data: {
          currentStatus: MissionStatus.DONE
        }
      });

      return { message: "Code validé" }
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
