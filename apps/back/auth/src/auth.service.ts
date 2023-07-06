import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-with-email.dto';
import { PrismaService, User } from '@repairnow/prisma';
import { UsersService } from './users/users.service';
import { verify, hash } from 'argon2';
import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CurrentUserDto } from '@repairnow/dto';
import { compare, hash as bHash } from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdateUserDto } from './users/dto/user.dto';

interface IJwtPayload {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  isPhoneVerified: boolean;
  role: string;
  sub: string;
}

function genererMdpRobuste(longueur) {
  const caracteres =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?!!@@##$$%%^^&&';
  let mdp = '';
  while (mdp.length < longueur) {
    const index = Math.floor(Math.random() * caracteres.length);
    mdp += caracteres.charAt(index);
  }
  return mdp;
}

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerService: MailerService,
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
    if (user.isUserDeleted) {
      throw new ForbiddenException('User is deleted');
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
    const changeFirstLetterToUpperCase = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);
    const firstnameCapitalized = changeFirstLetterToUpperCase(firstname);
    const lastnameCapitalized = changeFirstLetterToUpperCase(lastname);

    const userCreated = await this.usersService.createUser({
      email,
      password,
      phoneNumber,
      firstname: firstnameCapitalized,
      lastname: lastnameCapitalized,
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

  async updateAvatar(payload: {
    file: Express.Multer.File;
    user: CurrentUserDto;
  }) {
    const userAvatar = await this.prismaService.files.findUnique({
      where: {
        // @ts-ignore
        userId: payload.user.sub,
      },
    });
    if (userAvatar) {
      await this.prismaService.files.update({
        where: {
          // @ts-ignore
          userId: payload.user.sub,
        },
        include: {
          user: true,
        },
        data: {
          ...payload.file,
        },
      });
    } else {
      await this.prismaService.files.create({
        include: {
          user: true,
        },
        data: {
          userId: payload.user.sub,
          ...payload.file,
        },
      });
    }
    return 'file(s) created';
  }

  getUsers() {
    return this.prismaService.user.findMany();
  }

  getUser(userId: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        avatar: true,
      },
    });
  }

  async patchUser(payload: { userId: string; updateUserDto: UpdateUserDto }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${payload.userId} not found`);
    }
    return this.prismaService.user.update({
      where: {
        id: payload.userId,
      },
      data: {
        ...payload.updateUserDto,
      },
    });
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
          expiresIn: '7d',
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

  async resetPassword(payload: {
    user: CurrentUserDto;
    oldPassword: string;
    newPassword: string;
  }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.user.sub,
      },
    });

    const areEqual = await compare(payload.oldPassword, user.password);

    if (!areEqual) {
      throw new RpcException(new BadRequestException());
    }

    await this.prismaService.user.update({
      where: {
        id: payload.user.sub,
      },
      data: {
        password: await bHash(payload.newPassword, 10),
      },
    });

    return 'password updated';
  }

  async passwordForgotten(payload: { email: string }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new BadRequestException();
    }

    const password = genererMdpRobuste(20);
    await this.prismaService.user.update({
      where: {
        email: payload.email,
      },
      data: {
        password: await bHash(password, 10),
      },
    });

    const emailBody = `
      <p>Bonjour,</p>
      <p>Nous avons reçu une demande de réinitialisation de votre mot de passe. Votre nouveau mot de passe est :</p>
      <p><strong>${password}</strong></p>
      <p>Veuillez utiliser ce mot de passe pour vous connecter à votre compte et n'oubliez pas de le changer après vous être connecté(e).</p>
      <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet email.</p>
      <p>Cordialement,</p>
      <p>Nom de votre entreprise</p>
    `;

    this.mailerService
      .sendMail({
        to: payload.email, // list of receivers
        from: this.configService.get('MAILER_FROM'), // sender address
        subject: 'Réinitialisation de votre mot de passe', // Subject line
        html: emailBody, // HTML body content
      })
      .then(async () => {
        console.log('email sent');
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return 'email sent';
  }
}
