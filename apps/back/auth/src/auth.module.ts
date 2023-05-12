import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@repairnow/prisma';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
    }),
    UsersModule,
    JwtModule.register({
      global: true,
      // TODO: Store this secret differently
      secret: 'CHANGE_ME',
      signOptions: { expiresIn: '6s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
