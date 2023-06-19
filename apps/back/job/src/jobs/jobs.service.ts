import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from '@repairnow/prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JobsService {

  constructor(private prismaService: PrismaService) { }

  async create(createJobDto: CreateJobDto) {
    try {
      return await this.prismaService.job.create({
        data: createJobDto
      })
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.job.findMany();
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.job.findUnique({
        where: {
          id: id
        }
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(updateJobDto: UpdateJobDto) {
    try {
      const { id, ...jobData } = updateJobDto;
      return await this.prismaService.job.update({
        where: {
          id: id
        },
        data: jobData
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.job.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
