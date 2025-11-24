import { Avatar, Button, Dialog, Spinner } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { FaSadTear } from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';

function GatewayDownDialog({
  isOpen,
  setIsOpen,
  title,
  gatewayLogo,
  formattedTotalAmount,
}) {
  /* STATES */
  const [showError, setShowError] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    setTimeout(() => setShowError(true), 3000);
  }, []);

  /* EVENT HANDLERS */
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} contentClassName="bg-white">
      <div className="flex items-center justify-between mb-4 mr-4">
        <h5>{title}</h5>
        {gatewayLogo}
      </div>
      <div className="h-[60vh] overflow-y-auto">
        {showError ? (
          <div className="h-full flex flex-col items-center justify-center gap-5">
            <Avatar
              className="!bg-red-500"
              size={100}
              shape="circle"
              icon={<FaSadTear />}
            />
            <div className="flex flex-col justify-center">
              <p className="text-gray-200 text-base text-center">
                Payment Gateway Down
              </p>
              <p>Please try another payment gateway</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <Spinner size="40px" />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center gap-3 mt-4 pt-3 border-t border-t-gray-600">
        <div>
          <p>Total Amount</p>
          <h6>{formattedTotalAmount}</h6>
        </div>
        <Button
          className="ml-2"
          variant="twoTone"
          size="sm"
          icon={<RiSecurePaymentLine />}
          onClick={handleClose}
        >
          Change Gateway
        </Button>
      </div>
    </Dialog>
  );
}

export default GatewayDownDialog;
