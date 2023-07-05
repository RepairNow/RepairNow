import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
    private stripe;

    constructor(private configService: ConfigService) {
        const stripeSecretKey = this.configService.get('STRIPE_SECRET_KEY');
        this.stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2022-11-15',
        });
    }

    async createCheckoutSession(price: number, announcementId: string, estimateId: string): Promise<any> {
        return await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        unit_amount: Math.round(price * 100),
                        product_data: {
                            name: 'Service Repair Now',
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${this.configService.get('STRIPE_CHECKOUT_SUCCESS_URL')}/client/announcement/${announcementId}?estimate_id=${estimateId}`,
            cancel_url: `${this.configService.get('STRIPE_CHECKOUT_CANCEL_URL')}/client/announcement/${announcementId}?estimate_id=${estimateId}`
        });
    }

    async retrieveCheckoutSession(id: string): Promise<any> {
        try {
            const session = await this.stripe.checkout.sessions.retrieve(id);

            return session;
        } catch (error) {
            console.error('Failed to retrieve Stripe session:', error);
            return null;
        }
    }
}
