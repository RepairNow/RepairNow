import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService, User } from '@repairnow/prisma-pg';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async isUserExist(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    return !!user;
  }

  async signInEmail(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    if (user?.password === password) {
      const payload = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        sub: user.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async signUpEmail(email: string, password: string): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        email,
        password,
      },
    });
  }

  getHello(): string {
    return 'Hello World from auth service!';
  }

  getUsers() {
    return this.prismaService.user.findMany();
  }
}
