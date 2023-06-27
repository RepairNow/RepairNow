import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-with-email.dto';
import { PrismaService, User } from '@repairnow/prisma';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async isUserExist(email: SignInDto['email']): Promise<boolean> {
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
  ): Promise<{
    access_token: string;
    user: {
      id: string;
      email: string;
      firstname: string | null;
      lastname: string | null;
      phoneNumber: string | null;
      role: string;
    };
  } | null> {
    const user = await this.usersService.getUserByEmailAndCheckPassword(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
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
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    };
  }

  async signUpEmail({
    email,
    password,
    firstname,
    lastname,
    phoneNumber,
  }): Promise<{
    access_token: string;
    user: User;
  }> {
    const userCreated = await this.usersService.createUser({
      email,
      password,
      phoneNumber,
      firstname,
      lastname,
    });
    return {
      user: userCreated,
      access_token: this.jwtService.sign({
        email: userCreated.email,
        firstname: userCreated.firstname,
        lastname: userCreated.lastname,
        phoneNumber: userCreated.phoneNumber,
        role: userCreated.role,
        sub: userCreated.id,
      }),
    };
  }

  getHello(): string {
    return 'Hello World from auth service!';
  }

  getUsers() {
    return this.prismaService.user.findMany();
  }
}
