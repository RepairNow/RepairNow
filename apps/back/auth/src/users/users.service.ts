import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService, User } from '@repairnow/prisma';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto/user.dto';
import { compare, hash } from 'bcrypt';

// utilisation de https://blog.bitsrc.io/jwt-authentication-with-nestjs-4f587c5dd649
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    // check if the user exists in the db
    const userInDb = await this.prismaService.user.findFirst({
      where: { email: userDto.email },
    });
    // if the user exists, throw an error
    if (userInDb) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }
    // if the user doesn't exist, create a new user. Hash the password before saving it in the db
    const user = await this.prismaService.user.create({
      data: {
        ...userDto,
        password: await hash(userDto.password, 10),
      },
    });
    return user;
  }

  async getUserByEmailAndCheckPassword(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await compare(password, user.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async getUsers(): Promise<any> {
    return this.prismaService.user.findMany();
  }

  async getUserById(id: string): Promise<any> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string): Promise<any> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updateUser(payload: UpdateUserDto, id: string): Promise<any> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
  }

  async deleteUser(id: string): Promise<any> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async updatePassword(payload: UpdatePasswordDto, id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await compare(payload.old_password, user.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.prismaService.user.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) },
    });
  }

  async markPhoneNumberAsConfirmed(id: string): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: { isPhoneVerified: true },
    });
  }
}
