import { BadGatewayException, BadRequestException, Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { UpdateEstimateDto } from './dto/update-estimate.dto';
import { PrismaService } from '@repairnow/prisma';
import { StripeService } from 'src/stripe/stripe.service';
import { AnnouncementStatus } from 'src/announcements/announcements.service';
import {CurrentUserI} from "../mission/dto/current-user.dto";

enum EstimateStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REFUSED = "REFUSED"
}
@Injectable()
export class EstimatesService {
  constructor(private prismaService: PrismaService, private stripeService: StripeService) { }

  async create(payload: { createEstimateDto: CreateEstimateDto, announcementId: string, user: CurrentUserI}) {

    try {
      const announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: payload.announcementId
        }
      })
      if (!announcement) {
        throw new NotFoundException();
      }

      console.log('ok')

      const estimate = await this.prismaService.estimate.create({
        data: {
          images: payload.createEstimateDto.images,
          description: payload.createEstimateDto.description,
          price: payload.createEstimateDto.price,
          currentStatus: EstimateStatus.PENDING,
          announcementId: payload.announcementId,
          prestataireId: payload.user.id
        },
      });

      return estimate;
    } catch (error) {
      return error;
    }
  }

  async findAll(id: string) {
    try {
      const announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: id
        },
        include: {
          estimates: true
        }
      })

      if (!announcement) {
        throw new NotFoundException();
      }

      return announcement.estimates;
    } catch (error) {
      return error;
    }
  }

  async findOne(payload: { announcementId: string, estimateId: string }) {
    try {
      if (Object.keys(payload).length === 0) {
        throw new BadRequestException();
      }
      const announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: payload.announcementId
        },
        include: {
          estimates: true
        }
      })

      if (!announcement) {
        throw new NotFoundException();
      }

      const estimate = announcement.estimates.find(e => e.id === payload.estimateId);

      if (!estimate) {
        throw new NotFoundException();
      }
      return estimate;
    } catch (error) {
      return error;
    }
  }

  async update(payload: { updateEstimateDto: UpdateEstimateDto, announcementId: string, estimateId: string }) {
    try {
      if (Object.keys(payload.updateEstimateDto).length === 0) {
        throw new BadRequestException();
      }

      const announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: payload.announcementId
        },
      })

      if (!announcement) {
        throw new NotFoundException();
      }

      const estimateAccepted = await this.prismaService.estimate.findFirst({
        where: {
          announcementId: payload.announcementId,
          currentStatus: EstimateStatus.ACCEPTED
        },
      });

      if (estimateAccepted) {
        throw new BadRequestException("Un devis est déjà accepté pour cette mission");
      }

      const estimate = await this.prismaService.estimate.findUnique({
        where: {
          id: payload.estimateId
        }
      });

      if (!estimate) {
        throw new NotFoundException();
      }

      if (estimate.currentStatus === EstimateStatus.ACCEPTED) {
        throw new BadRequestException("Le devis a déjà été validé");
      }

      // TODO: If Accepted, map through all estimates and set status refused ?
      const estimateUpdated = await this.prismaService.estimate.update({
        where: {
          id: payload.estimateId
        },
        // @ts-ignore
        data: {
          ...payload.updateEstimateDto
        }
      });

      // Send stripe checkout page url to the client if estimate is accepted
      if (estimateUpdated.currentStatus === EstimateStatus.ACCEPTED) {
        const checkoutPageUrl = await this.stripeService.createCheckoutSession(estimateUpdated.price);

        return { ...estimateUpdated, checkoutPageUrl: checkoutPageUrl };
      }

      return estimateUpdated;
    } catch (error) {
      return error;
    }
  }

  async acceptEstimate(payload: { announcementId: string, estimateId: string }) {
    try {
      const announcement = await this.prismaService.announcement.findUnique({
        where: {
          id: payload.announcementId
        }
      })

      if (!announcement) {
        throw new NotFoundException();
      }

      if (announcement.currentStatus === AnnouncementStatus.DONE) {
        throw new BadRequestException("L'annonce est n'est plus valable");
      }

      const estimateAccepted = await this.prismaService.estimate.findFirst({
        where: {
          announcementId: payload.announcementId,
          currentStatus: EstimateStatus.ACCEPTED
        },
      });

      if (estimateAccepted) {
        throw new BadRequestException("Un devis est déjà accepté pour cette mission");
      }

      const estimate = await this.prismaService.estimate.findUnique({
        where: {
          id: payload.estimateId
        }
      });

      if (!estimate) {
        throw new NotFoundException();
      }

      if (estimate.currentStatus === EstimateStatus.ACCEPTED) {
        throw new BadRequestException("Le devis a déjà été validé");
      }

      // TODO: If Accepted, map through all estimates and set status refused ?
      const estimateUpdated = await this.prismaService.estimate.update({
        where: {
          id: payload.estimateId
        },
        data: {
          currentStatus: EstimateStatus.ACCEPTED
        }
      });

      // Send stripe checkout page url to the client if estimate is accepted
      if (estimateUpdated.currentStatus === EstimateStatus.ACCEPTED) {
        const checkoutPageUrl = await this.stripeService.createCheckoutSession(estimateUpdated.price);

        return { ...estimateUpdated, checkoutPageUrl: checkoutPageUrl };
      }

      return estimateUpdated;
    } catch (error) {
      return error;
    }
  }

  remove(payload: { id: string, estimateId: string }) {
  }
}
