import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      return new RpcException({ message: error.message, statusCode: HttpStatus.BAD_REQUEST });
    }
  }

  async findAll() {
    try {
      return await this.prismaService.job.findMany();
    } catch (error) {
      return new RpcException({ message: error.message, statusCode: HttpStatus.BAD_REQUEST });
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
      return new RpcException({ message: error.message, statusCode: HttpStatus.BAD_REQUEST });
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
      return new RpcException({ message: error.message, statusCode: HttpStatus.BAD_REQUEST });
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
      return new RpcException({ message: error.message, statusCode: HttpStatus.BAD_REQUEST });
    }
  }
}
