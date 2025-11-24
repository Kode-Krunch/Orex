import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { Button, Dialog } from 'components/ui';
import {
  stripeAppearance,
  stripePromise,
} from 'configs/paymentGateways/stripeConfig';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiPostStripeCreatePaymentIntent } from 'services/PaymentGatewayService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';
import PaymentGatewayBtn from './PaymentGatewayBtn';
import GatewayDownDialog from './GatewayStatusDialogs/GatewayDownDialog';

export default function StripePaymentDialog({
  isOpen,
  setIsOpen,
  totalAmount,
  formattedTotalAmount,
  isPaymentFailedRef,
  paymentRefNumberRef,
  handleGatewayClose,
}) {
  /* REDUX */
  const user = useSelector((state) => state.auth.user);

  /* STATES */
  const [stripeClientSecret, setStripeClientSecret] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      let clientSecret = '';
      try {
        setShowLoader(true);
        const response = await apiPostStripeCreatePaymentIntent({
          amount: totalAmount * 100,
          currency: 'inr',
          description: 'test description',
          name: user.userName || 'testuser',
          email: user.email || 'test@email.com',
          addressLine1: 'test address line 1',
          postalCode: '000000',
          city: 'Mumbai',
          state: 'MH',
          country: 'IN',
        });
        const responseData = response.data;
        if (response.status === 200) {
          clientSecret = responseData.client_secret;
          paymentRefNumberRef.current = responseData.id;
        } else {
          throw new Error(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setStripeClientSecret(clientSecret);
        setShowLoader(false);
      }
    })();
  }, [user]);

  return (
    <>
      {stripeClientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: stripeClientSecret,
            appearance: stripeAppearance,
          }}
        >
          <DialogContent
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            formattedTotalAmount={formattedTotalAmount}
            setShowLoader={setShowLoader}
            isPaymentFailedRef={isPaymentFailedRef}
            handleGatewayClose={handleGatewayClose}
          />
        </Elements>
      )}
      <Loader showLoader={showLoader} />
    </>
  );
}

function DialogContent({
  isOpen,
  setIsOpen,
  formattedTotalAmount,
  setShowLoader,
  isPaymentFailedRef,
  handleGatewayClose,
}) {
  /* STATES */
  const [isGatewayDownDialogOpen, setIsGatewayDownDialogOpen] = useState(false);

  /* HOOKS */
  const stripe = useStripe();
  const elements = useElements();

  /* USE EFFECTS */
  useEffect(() => {
    if (stripe) setIsGatewayDownDialogOpen(false);
    else setIsGatewayDownDialogOpen(true);
  }, [stripe]);

  /* EVENTH HANDLERS */
  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!stripe || !elements) {
        isPaymentFailedRef.current = true;
        return;
      }
      setShowLoader(true);
      // TODO: Store transaction info in DB
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });
      // TODO: Store transaction result in DB
      if (error) {
        isPaymentFailedRef.current = true;
      } else {
        isPaymentFailedRef.current = false;
      }
    } catch (error) {
      isPaymentFailedRef.current = true;
      console.error(error);
      openNotification('danger', 'Something went wrong while checkout');
    } finally {
      handleGatewayClose();
      setShowLoader(false);
    }
  };

  return (
    <>
      {isGatewayDownDialogOpen ? (
        <GatewayDownDialog
          isOpen={isGatewayDownDialogOpen}
          setIsOpen={setIsGatewayDownDialogOpen}
          title="Pay with Stripe"
          gatewayLogo={
            <PaymentGatewayBtn
              imgSrc="/assets/logos/stripe-logo.svg"
              imgAlt="Stripe Logo"
              imgHeight={20}
              active={true}
            />
          }
          formattedTotalAmount={formattedTotalAmount}
        />
      ) : (
        <Dialog
          isOpen={isOpen}
          onClose={handleClose}
          contentClassName="bg-white"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col h-full justify-between"
          >
            <div className="flex items-center justify-between mb-4 mr-4">
              <h5>Pay with Stripe</h5>
              <PaymentGatewayBtn
                imgSrc="/assets/logos/stripe-logo.svg"
                imgAlt="Stripe Logo"
                imgHeight={20}
                active={true}
              />
            </div>
            <div className="h-[60vh] overflow-y-auto">
              <PaymentElement />
            </div>
            <div className="flex justify-between items-center gap-3 mt-4 pt-3 border-t border-t-gray-600">
              <div>
                <p>Total Amount</p>
                <h6>{formattedTotalAmount}</h6>
              </div>
              <div className="flex items-center gap-3">
                <Button className="ml-2" variant="plain" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="solid">
                  Pay
                </Button>
              </div>
            </div>
          </form>
        </Dialog>
      )}
    </>
  );
}
