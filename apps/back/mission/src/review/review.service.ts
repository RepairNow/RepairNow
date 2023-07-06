import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '@repairnow/prisma';

@Injectable()
export class ReviewService {

  constructor(private prismaService: PrismaService) { }

  async create(createReviewDto: CreateReviewDto) {
    try {
      // check if mission exists
      const mission = await this.prismaService.mission.findUnique({
        where: {
          id: createReviewDto.missionId
        },
        include: {
          review: true
        }
      });

      if (!mission) {
        return new BadRequestException("La mission n'existe pas");
      }

      // check if mission is currentStatus is DONE
      if (mission.currentStatus !== 'DONE') {
        return new BadRequestException("La mission n'est pas terminée");
      }

      // check if review already exists for this mission
      const review = await this.prismaService.review.findFirst({
        where: {
          missionId: createReviewDto.missionId
        }
      });

      if (review) {
        return new BadRequestException("Une review existe déjà pour cette mission");
      }

      // create review
      return this.prismaService.review.create({
        data: {
          missionId: createReviewDto.missionId,
          rating: createReviewDto.rating,
          comment: createReviewDto.comment
        }
      });

    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.review.findMany();
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: id
        },
        include: {
          mission: true
        }
      });

      if (!announcement) {
        return new BadRequestException("L'annonce n'existe pas");
      }

      if (!announcement.mission) {
        return new BadRequestException("Aucune mission pour cette annonce");
      }

      const mission = await this.prismaService.mission.findUnique({
        where: {
          id: announcement.mission.id
        },
        include: {
          review: true
        }
      });

      if (!mission.review) {
        return new BadRequestException("La review n'existe pas");
      }

      return mission.review;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(payload: {announcementId: string, updateReviewDto: UpdateReviewDto}) {
    try {
      const { announcementId, updateReviewDto } = payload;

      // check if review exists
      const review = await this.prismaService.review.findUnique({
        where: {
          id: updateReviewDto.id
        }
      });

      if (!review) {
        return new BadRequestException("La review n'existe pas");
      }

      return await this.prismaService.review.update({
        where: {
          id: updateReviewDto.id
        },
        data: {
          rating: updateReviewDto.rating,
          comment: updateReviewDto.comment,
        }
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      // check if review exists
      const review = await this.prismaService.review.findUnique({
        where: {
          id: id
        }
      });

      if (!review) {
        return new BadRequestException("La review n'existe pas");
      }

      return await this.prismaService.review.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
