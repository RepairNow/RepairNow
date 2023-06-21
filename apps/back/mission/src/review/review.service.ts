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
      const review = await this.prismaService.review.findUnique({
        where: {
          id: id
        }
      });

      if (!review) {
        return new BadRequestException("La review n'existe pas");
      }

      return review;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(updateReviewDto: UpdateReviewDto) {
    try {
      const { id, ...reviewData } = updateReviewDto;

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
          id: id
        },
        data: reviewData
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
