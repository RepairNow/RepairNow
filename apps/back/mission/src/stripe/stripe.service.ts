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

    async createCheckoutSession(price: number): Promise<object> {
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
            success_url: this.configService.get('STRIPE_CHECKOUT_SUCCESS_URL'),
            cancel_url: this.configService.get('STRIPE_CHECKOUT_CANCEL_URL')
        });
    }
}
