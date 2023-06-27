const axios = require('axios')
const { v4: uuid } = require('uuid');
require('dotenv').config();

const generatePaymentRefUUID = async () => {
    const paymentReference = uuid().replace(/-/g, '').substring(0, 14);
      return String(paymentReference).toUpperCase();
}

const intializePayment = async (request) =>{
    const paymentRef = await generatePaymentRefUUID();
    const { email, amount } = request;
    const url = process.env.INITIALIZE_PAYMENT_URL;
    const amountInKobo = amount * 100;
    const value = JSON.stringify({
        email: email,
        amount: amountInKobo,
        metadata: {
        paymentRefUUID: paymentRef
        },
        // reference: paymentRef
    });
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(url, value, { headers });
        const data = response.data;
        if (!data.status || !data.data.authorization_url) {
            console.log('Hi I got here 4 data --> Failed to initiate transaction')
        throw new Error('Failed to initiate transaction');
        }
        console.log('data --> ', data.data)
        return data.data;
    } catch (error) {
        Logger.error(error);
        throw new BadRequestException('Sorry, an error occurred');
    }
}

const verifyPayment = async (request) => {
    const { reference } = request;
    
    const url = `${process.env.PAYMENT_VERIFICATION_URL}${reference}`;
    console.log('Hi I got here url --> ', reference)
    const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    };
    try {
        const response = await axios.get(url, { headers });
        const paymentResponse = response.data.data;
        console.log('Hi I got here data --> ', paymentResponse)

        if (paymentResponse?.paidAt || paymentResponse.paid_at) {
        return paymentResponse;
        }

        throw new Error('Payment Verification Failed');
    } catch (error) {
        Logger.error(error);
        throw new BadRequestException('Sorry, we are unable to verify this payment at this time');
    }
}

module.exports =  { intializePayment, verifyPayment }