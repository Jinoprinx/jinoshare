const Flutterwave = require('flutterwave-node-v3');
import axios from 'axios';
import { config } from '../config';

const flw = new Flutterwave(config.flutterwavePublicKey, config.flutterwaveSecretKey);

export const initializePayment = async (email: string, amount: number, meta: any) => {
    try {
        // Validate that Flutterwave keys are configured
        if (!config.flutterwavePublicKey || !config.flutterwaveSecretKey) {
            throw new Error('Flutterwave keys not configured. Please set FLUTTERWAVE_PUBLIC_KEY and FLUTTERWAVE_SECRET_KEY in your environment variables.');
        }

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

        // Use direct API call for Flutterwave Standard (hosted checkout)
        const response = await axios.post(
            'https://api.flutterwave.com/v3/payments',
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${config.flutterwaveSecretKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error: any) {
        console.log('Flutterwave initialization error:', error.response?.data || error.message);
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