
const Flutterwave = require('flutterwave-node-v3');
import { config } from '../config';

const flw = new Flutterwave(config.flutterwavePublicKey, config.flutterwaveSecretKey);

export const initializePayment = async (email: string, amount: number, meta: any) => {
    try {
        const payload = {
            tx_ref: 'JINO-' + Date.now(),
            amount,
            currency: 'NGN',
            redirect_url: config.flutterwaveRedirectUrl,
            customer: {
                email,
            },
            meta,
            customizations: {
                title: 'Jino',
                description: 'Payment for subscription',
                logo: 'https://jino.com/favicon.ico',
            },
        };
        const response = await flw.Payment.initiate(payload);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error initializing payment');
    }
}

export const verifyPayment = async (transactionId: string) => {
    try {
        const response = await flw.Transaction.verify({ id: transactionId });
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error verifying payment');
    }
}
