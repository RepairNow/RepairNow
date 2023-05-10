import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignWithEmailDto } from '@repairnow/dto';
import { PrismaService, User } from '@repairnow/prisma';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) { }

  async isUserExist(email: SignWithEmailDto['email']): Promise<boolean> {
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
        phoneNumber: user.phoneNumber,
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
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    if (!user) {
      const newUser = await this.prismaService.user.create({
        data: {
          email,
          password,
        },
      });
      return newUser;
    }
  }

  getHello(): string {
    return 'Hello World from auth service!';
  }

  getUsers() {
    return this.prismaService.user.findMany();
  }
}
