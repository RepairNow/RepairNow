import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    @Body('email') email: CreateUserDto['email'],
    @Body('password') password: string,
    @Body('firstname') firstname: CreateUserDto['firstname'],
    @Body('lastname') lastname: CreateUserDto['lastname'],
    @Body('phoneNumber') phoneNumber: CreateUserDto['phoneNumber'],
    @Body('avatar') avatar: CreateUserDto['avatar'],
    @Body('birthdate') birthdate: CreateUserDto['birthdate'],
  ) {
    const generatedId = await this.userService.createUser({
      email,
      password,
      firstname,
      lastname,
      phoneNumber,
      avatar,
      birthdate,
    });
    return { id: generatedId };
  }

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }
}
