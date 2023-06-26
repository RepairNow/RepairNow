import { Module } from '@nestjs/common';
import { EstimatesService } from './estimates.service';
import { EstimatesController } from './estimates.controller';
import { PrismaService } from '@repairnow/prisma';
import { StripeService } from 'src/stripe/stripe.service';
@Module({
  controllers: [EstimatesController],
  providers: [EstimatesService, PrismaService, StripeService]
})
export class EstimatesModule { }
