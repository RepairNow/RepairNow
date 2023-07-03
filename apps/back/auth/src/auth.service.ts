import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-with-email.dto';
import { PrismaService, User } from '@repairnow/prisma';
import { UsersService } from './users/users.service';
import { verify, hash } from 'argon2';
import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface IJwtPayload {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  isPhoneVerified: boolean;
  role: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
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
    refresh_token: string;
    user: {
      id: string;
      email: string;
      firstname: string | null;
      lastname: string | null;
      phoneNumber: string | null;
      isPhoneVerified: boolean;
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
    const payload: IJwtPayload = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      isPhoneVerified: user.isPhoneVerified,
      role: user.role,
      sub: user.id,
    };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phoneNumber: user.phoneNumber,
        isPhoneVerified: user.isPhoneVerified,
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
    isContractorRoleAsked,
  }): Promise<{
    access_token: string;
    refresh_token: string;
    user: User;
  }> {
    const userCreated = await this.usersService.createUser({
      email,
      password,
      phoneNumber,
      firstname,
      lastname,
      isContractorRoleAsked,
    });
    const payload: IJwtPayload = {
      email: userCreated.email,
      firstname: userCreated.firstname,
      lastname: userCreated.lastname,
      phoneNumber: userCreated.phoneNumber,
      isPhoneVerified: userCreated.isPhoneVerified,
      role: userCreated.role,
      sub: userCreated.id,
    };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(userCreated.id, tokens.refreshToken);
    return {
      user: userCreated,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  getHello(): string {
    return 'Hello World from auth service!';
  }

  getUsers() {
    return this.prismaService.user.findMany();
  }

  async logout(userId: string) {
    await this.usersService.updateUser({ refreshToken: null }, userId);
    return 'Logout success';
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken);
    return await this.usersService.updateUser(
      {
        refreshToken: hashedRefreshToken,
      },
      userId,
    );
  }

  async getTokens(payload: IJwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: payload.sub,
          email: payload.email,
          firstname: payload.firstname,
          lastname: payload.lastname,
          phoneNumber: payload.phoneNumber,
          isPhoneVerified: payload.isPhoneVerified,
          role: payload.role,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: '1h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: payload.sub,
          email: payload.email,
          firstname: payload.firstname,
          lastname: payload.lastname,
          phoneNumber: payload.phoneNumber,
          isPhoneVerified: payload.isPhoneVerified,
          role: payload.role,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = await verify(user.refreshToken, refreshToken);
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const payload: IJwtPayload = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      isPhoneVerified: user.isPhoneVerified,
      role: user.role,
      sub: user.id,
    };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
