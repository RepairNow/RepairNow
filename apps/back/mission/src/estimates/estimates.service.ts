import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ParseUUIDPipe
} from '@nestjs/common';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { UpdateEstimateDto } from './dto/update-estimate.dto';
import { PrismaService } from '@repairnow/prisma';
import { StripeService } from 'src/stripe/stripe.service';
import { AnnouncementStatus } from 'src/announcements/announcements.service';
import {CurrentUserI} from "../mission/dto/current-user.dto";
import {MissionStatus} from "../mission/enums/mission-status.enum";
import { MailerService } from '@nestjs-modules/mailer/dist';
import { ConfigService } from '@nestjs/config';
enum EstimateStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REFUSED = "REFUSED",
  WAITING_PAYMENT = "WAITING_PAYMENT"
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 9000) + 1000;
}

@Injectable()
export class EstimatesService {
  constructor(private prismaService: PrismaService, private stripeService: StripeService, private mailerService: MailerService, private configService: ConfigService) { }

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

      const estimateExist = await this.prismaService.estimate.findMany({
        where: {
          announcementId: payload.announcementId,
          prestataireId: payload.user.sub
        }
      })

      if(estimateExist.length) {
        throw new ForbiddenException(
            'Vous avez déjà générer un devis',
        );
      }

      if(payload.createEstimateDto.price <= 0) {
        throw new ForbiddenException(
            'Le prix ne peut pas être inférieur ou égal à 0'
        )
      }

      const estimate = await this.prismaService.estimate.create({
        // @ts-ignore
        data: {
          images: payload.createEstimateDto.images,
          description: payload.createEstimateDto.description,
          price: payload.createEstimateDto.price,
          currentStatus: EstimateStatus.PENDING,
          announcementId: payload.announcementId,
          prestataireId: payload.user.sub,
          checkoutSession: ''
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


      const estimatesUpdated = await this.prismaService.estimate.updateMany({
        where: {
          announcementId: payload.announcementId
        },
        data: {
          currentStatus: EstimateStatus.REFUSED
        }
      })

      const checkoutSession = await this.stripeService.createCheckoutSession(estimate.price, payload.announcementId, payload.estimateId);

      // TODO: If Accepted, map through all estimates and set status refused ?
      const estimateUpdated = await this.prismaService.estimate.update({
        where: {
          id: payload.estimateId
        },
        data: {
          currentStatus: EstimateStatus.WAITING_PAYMENT,
          checkoutSession: checkoutSession.id
        }
      });


      // Send stripe checkout page url to the client if estimate is waiting payment
      //if (estimateUpdated.currentStatus === EstimateStatus.WAITING_PAYMENT) {

        // @ts-ignore
        return { ...estimateUpdated, checkoutPageUrl: checkoutSession.url };
      //}

      //return estimateUpdated;
    } catch (error) {
      return error;
    }
  }

  async checkEstimate(payload: { announcementId: string, estimateId: string }) {
    const estimate = await this.prismaService.estimate.findUnique({
      where: {
        id: payload.estimateId
      }
    });

    if (!estimate) {
      throw new NotFoundException('Devis introuvable')
    }

    const checkoutSession = await this.stripeService.retrieveCheckoutSession(estimate.checkoutSession)

    if (!checkoutSession) {
      throw new NotFoundException('Session de paiement introuvable')
    }

    if(checkoutSession.payment_status === 'paid') {
      const estimateUpdated = await this.prismaService.estimate.update({
        where: {
          id: payload.estimateId
        },
        include: {
          prestataire: true
        },
        data: {
          currentStatus: EstimateStatus.ACCEPTED
        }
      });

      const announcementClient = await this.prismaService.announcement.findUnique({
        where: {
          id: estimateUpdated.announcementId
        }
      });

      const client = await this.prismaService.user.findUnique({
        where: {
          id: announcementClient.userId
        }
      });

      const missionAlreadyExist = await this.prismaService.mission.findUnique({
        where: {
          announcementId: estimateUpdated.announcementId
        }
      });

      if (missionAlreadyExist) {
        throw new BadRequestException();
      } else {

        const createdMission = await this.prismaService.mission.create({
          data: {
            prestataireId: estimateUpdated.prestataireId,
            announcementId: estimateUpdated.announcementId,
            currentStatus: MissionStatus.IN_PROGRESS
          }
        })
  
        const emailBody = `
          <h2>Récapitulatif de la facture</h2>
        
          <table>
              <tr>
                  <th>Description</th>
                  <th>Prix</th>
              </tr>
              <tr>
                  <td>${estimateUpdated.description}</td>
                  <td>${estimateUpdated.price}€</td>
              </tr>
              <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>${estimateUpdated.price}€</strong></td>
              </tr>
          </table>
          
          <p>Paiement effectué par Stripe</p>
          
          <p>Merci de votre confiance. Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter.</p>
          
          <p>Cordialement,</p>
          <p>Nom du prestataire : ${estimateUpdated.prestataire.firstname} ${estimateUpdated.prestataire.lastname}</p>
        `;
      
        this.mailerService.sendMail({
          to: client.email, // list of receivers
          from: this.configService.get('MAILER_FROM'), // sender address
          subject: 'Récapitulatif facture RepairNow', // Subject line
          html: emailBody, // HTML body content
        })
        .then(async () => {
          console.log('email sent')   
        }) 
        .catch(err => {
          throw new BadRequestException(err)
        });

        const updatedAnnouncement = await this.prismaService.announcement.update({
          where: {
            id: payload.announcementId
          },
          data: {
            currentStatus: AnnouncementStatus.ACTIVE
          }
        })
  
        await this.prismaService.validationCode.create({
          // @ts-ignore
          data: {
            missionId: createdMission.id,
            code: generateRandomNumber()
          }
        });
  
        return estimateUpdated;
      }

    }
  }

  async getCheckoutUrlEstimate(payload: { announcementId: string, estimateId: string }) {
    const estimate = await this.prismaService.estimate.findUnique({
      where: {
        id: payload.estimateId
      }
    });

    if (!estimate) {
      throw new NotFoundException('Devis introuvable')
    }

    if (estimate.currentStatus === EstimateStatus.WAITING_PAYMENT) {
      const session = await this.stripeService.retrieveCheckoutSession(estimate.checkoutSession)

      if (!session) {
        throw new NotFoundException('Session de paiement introuvable')
      }

      return session.url
    } else {
      throw new ForbiddenException('Devis déjà payé')
    }
  }

  remove(payload: { id: string, estimateId: string }) {
  }
}
