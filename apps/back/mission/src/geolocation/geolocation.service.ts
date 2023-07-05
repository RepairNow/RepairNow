import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateGeolocationDto } from './dto/update-geolocation.dto';
import { PrismaService } from '@repairnow/prisma';

@Injectable()
export class GeolocationService {
  constructor(private readonly prisma: PrismaService) { }

  async findOne(id: string) {

    try {
      const geolocation = await this.prisma.geolocation.findUnique({
        where: {
          id: id
        }
      });

      if (!geolocation) {
        return new NotFoundException("La géolocalisation n'existe pas");
      }

      return geolocation;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAnnouncementGeoloc(announcementId: string) {
    try {
      const mission = await this.prisma.mission.findUnique({
        where: {
          announcementId: announcementId
        },
        include: {
          geolocation: true
        }
      });

      const geolocation = mission.geolocation;

      if (!geolocation) {
        return new NotFoundException("La géolocalisation n'existe pas");
      }

      return geolocation;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(updateGeolocationDto: UpdateGeolocationDto) {
    try {
      const { id, ...geolocationData } = updateGeolocationDto;

      if (!id) {
        return this.prisma.geolocation.create({
          data: geolocationData
        });
      }

      const geolocation = await this.prisma.geolocation.findUnique({
        where: {
          id: id
        }
      });

      if (!geolocation) {
        return new NotFoundException("La géolocalisation n'existe pas");
      }

      return this.prisma.geolocation.update({
        where: {
          id: id
        },
        data: geolocationData
      });

    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
