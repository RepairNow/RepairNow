import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@repairnow/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
  controllers: [JobsController],
  providers: [JobsService, PrismaService]
})
export class JobsModule { }
