import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma-pg';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) { }

  getHello(): string {
    return 'Hello World!';
  }

  getUsers() {
    return this.prismaService.user.findMany();
  }
}
