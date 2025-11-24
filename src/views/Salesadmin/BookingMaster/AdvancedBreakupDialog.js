import { Dialog } from 'components/ui';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';

function PaymentCard({ paymentInfo, currencySymbol }) {
  return (
    <div className="bg-gray-700 rounded-lg p-3">
      <div className="flex justify-between items-center">
        <p className="text-white">{paymentInfo.date}</p>
        <p className="text-white text-base font-semibold">
          {currencySymbol} {paymentInfo.amount.toLocaleString('en-IN')}
        </p>
      </div>
      <p>{paymentInfo.type}</p>
    </div>
  );
}

function AdvancedBreakupDialog({ isOpen, setIsOpen, dealNo, currencySymbol }) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  /* USE EFFECTS */
  useState(() => {
    (async () => {
      let paymentInfo = [];
      try {
        if (isOpen) {
          setShowLoader(true);
          const response = await apiCallstoreprocedure('USP_GetAgencyPayment', {
            par_LocationCode: channel.LocationCode,
            par_ChannelCode: channel.ChannelCode,
            par_DealNumber: dealNo,
          });
          if (response.status === 200 && response.data?.length > 0) {
            paymentInfo = response.data.map((item) => ({
              date: '11-11-2025',
              type: 'Cash',
              amount: item.NetAmount,
            }));
          } else if (response.status === 204)
            openNotification('info', 'No payment info found');
          else throw new Error(response);
        }
      } catch (error) {
        console.error(error);
        openNotification(
          'danger',
          'Something went wrong while fetching payment info',
        );
      } finally {
        setPaymentInfo(paymentInfo);
        setShowLoader(false);
      }
    })();
  }, [isOpen, dealNo]);

  /* EVENT HANDLERS */
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        onRequestClose={handleClose}
      >
        <h5 className="mb-4">Advanced Breakup</h5>
        {paymentInfo.length > 0 ? (
          <div className="max-h-[70vh] overflow-y-auto flex flex-col gap-3">
            {paymentInfo.map((payment, index) => (
              <PaymentCard
                key={index}
                paymentInfo={payment}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>
        ) : (
          <div className="h-56 flex items-center justify-center">
            No info to show
          </div>
        )}
      </Dialog>
      <Loader showLoader={showLoader} />
    </>
  );
}

export default AdvancedBreakupDialog;
