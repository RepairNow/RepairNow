import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '@repairnow/prisma';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import SmsController from './sms/sms.controller';
import SmsService from './sms/sms.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    JwtModule.register({
      global: true,
      // TODO: I don't know if the secret is being read from the env file. Check this.
      secret: `${process.cwd()}/env/${process.env.NODE_ENV}.env.JWT_SECRET`,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController, SmsController],
  providers: [AuthService, PrismaService, SmsService],
})
export class AuthModule {}
