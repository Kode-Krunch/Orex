import { Avatar, Button, Dialog } from 'components/ui';
import React from 'react';
import { FaSadTear } from 'react-icons/fa';

function PaymentInvalidDialog({ isOpen, setIsOpen, refNumber, setRefNumber }) {
  /* EVENT HANDLERS */
  const handleClose = () => {
    setIsOpen(false);
    setRefNumber('');
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} onRequestClose={handleClose}>
      <h5 className="mb-4">Payment Invalid</h5>
      <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
        <Avatar
          className="!bg-red-500"
          size={100}
          shape="circle"
          icon={<FaSadTear />}
        />
        <div className="flex flex-col justify-center gap-2">
          <p className="text-gray-200 text-base text-center">Payment Invalid</p>
          <p>
            Reference No: <strong>{refNumber}</strong>
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="solid" onClick={handleClose}>
          Close
        </Button>
      </div>
    </Dialog>
  );
}

export default PaymentInvalidDialog;
