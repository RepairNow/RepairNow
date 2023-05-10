import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repairnow/prisma-pg';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World from auth service!';
  }

  getUsers() {
    return this.prismaService.user.findMany();
  }
}
