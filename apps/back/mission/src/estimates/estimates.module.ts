import { Module } from '@nestjs/common';
import { EstimatesService } from './estimates.service';
import { EstimatesController } from './estimates.controller';
import { PrismaService } from '@repairnow/prisma';
@Module({
  controllers: [EstimatesController],
  providers: [EstimatesService, PrismaService]
})
export class EstimatesModule { }
