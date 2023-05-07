import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'prisma-pg';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
})
export class AuthModule { }
