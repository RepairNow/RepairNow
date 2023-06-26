import { Module } from '@nestjs/common';
import { ValidationCodeController } from './validation.code.controller';
import { ValidationCodeService } from './validation.code.service';
import { PrismaService } from '@repairnow/prisma';

@Module({
  controllers: [ValidationCodeController],
  providers: [ValidationCodeService, PrismaService]
})
export class ValidationCodeModule { }
