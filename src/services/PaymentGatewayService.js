import axios from 'axios';
import appConfig from 'configs/app.config';

// ==================== STRIPE =====================
function apiPostStripeCreatePaymentIntent({
  amount,
  currency = 'inr',
  description = '',
  name,
  email,
  addressLine1,
  postalCode,
  city,
  state,
  country,
}) {
  return axios.post(`${appConfig.stripeHost}/stripe/create-payment-intent`, {
    amount,
    currency,
    description,
    name,
    email,
    address_line1: addressLine1,
    postal_code: postalCode,
    city,
    state,
    country,
  });
}

// ==================== RAZORPAY =====================
async function apiPostRazorPayCreateOrder(amount, currency = 'INR') {
  return axios.post(`${appConfig.razorPayHost}/razorpay/create-order`, {
    amount,
    currency,
  });
}

async function apiPostRazorPayVerifyPayment(paymentInfo) {
  return await axios.post(
    `${appConfig.razorPayHost}/razorpay/verify-payment`,
    paymentInfo,
  );
}

export {
  apiPostStripeCreatePaymentIntent,
  apiPostRazorPayCreateOrder,
  apiPostRazorPayVerifyPayment,
};
