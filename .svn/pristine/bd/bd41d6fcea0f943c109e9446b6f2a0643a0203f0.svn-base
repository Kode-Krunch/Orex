import { Button, Dialog, Input } from 'components/ui';
import React from 'react';
import { apiCreateCreditDebitMaster } from 'services/AccountsServices';
import {
  numberToINRFormat,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';

function SaveCDNoteDialog({
  isSaveDialogOpen,
  setIsSaveDialogOpen,
  noteType,
  invoiceNo,
  clientName,
  cdNoteDate,
  spotsWithNewRate,
  newRateTotal,
  remarks,
  setRemarks,
  cdNoteBill,
  resetPage,
  channel,
  token,
}) {
  /* EVENT HANDLER */
  const handleSaveCDNote = async () => {
    try {
      let details = [];
      spotsWithNewRate.forEach((spot) => {
        if (spot.NewRateAmount !== '-' && spot.NewRateAmount > 0) {
          details.push({
            BookingNumber: cdNoteBill.BookingNumber,
            BookingDetailID: spot.BookingDetailID,
            DealNumber: spot.DealNumber,
            DealLineItemID: spot.DealLineItemNo,
            CreditDebitCode: noteType.value,
            CreditDebitamount: spot.NewRateAmount,
          });
        }
      });
      const data = {
        request: {
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
          BookingNumber: cdNoteBill.BookingNumber,
          InvoiceNumber: cdNoteBill.BillNumber,
          InvoiceDate: cdNoteBill.InvoiceDate,
          CancelDate: '',
          Amount: newRateTotal,
          Remarks: remarks,
          CreditDebitStatus: noteType.value,
          ServiceTax: 0,
          QRCODE: '',
          IRNNumber: '',
          AckNo: '',
          IRNStatus: '',
          SignedInvoice: '',
          IsActive: 1,
          RefDate: cdNoteDate,
        },
        details,
      };

      // Do API call here to create credit note
      const response = await apiCreateCreditDebitMaster(data, token);
      if (response.status === 200) {
        openNotification('success', 'Credit Note created successfully');
      } else {
        openNotification(
          'danger',
          `Unable to create ${noteType.label} note. Server responded with status code ${response.status}`,
        );
      }
      handleDialogClose();
      // Back to home screen.
      resetPage();
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong. Unable to create credit note.',
      );
      console.error(error);
    }
  };

  const handleDialogClose = () => {
    try {
      setIsSaveDialogOpen(false);
      setRemarks('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      isOpen={isSaveDialogOpen}
      onClose={handleDialogClose}
      onRequestClose={handleDialogClose}
      className="!w-[27%]"
    >
      <h5 className="mb-4 border-b pb-3 border-gray-600">
        {noteType.label} Note
      </h5>
      <div className="flex flex-col gap-4">
        <div className={`flex items-center justify-between`}>
          <span>Invoice No</span>
          <span className="font-medium max-w-[50%] text-end">{invoiceNo}</span>
        </div>
        <div className={`flex items-center justify-between`}>
          <span>Client</span>
          <span className="font-medium max-w-[50%] text-end">{clientName}</span>
        </div>
        <div className={`flex items-center justify-between`}>
          <span>{noteType.label} Note Date</span>
          <span className="font-medium max-w-[50%] text-end">{cdNoteDate}</span>
        </div>
        <div className={`flex items-center justify-between`}>
          <span>Spots count</span>
          <span className="font-medium max-w-[50%] text-end">
            {
              spotsWithNewRate.filter(
                (spot) => spot.NewRateAmount !== '-' && spot.NewRateAmount > 0,
              ).length
            }
          </span>
        </div>
        <div className={`flex items-center justify-between`}>
          <span>New rate total</span>
          <span className="font-medium max-w-[50%] text-end">
            {numberToINRFormat(newRateTotal)}
          </span>
        </div>
        <div>
          <Input
            className="mt-1"
            size="sm"
            textArea
            placeholder="Remarks"
            autoFocus
            value={remarks}
            maxLength={150}
            onChange={(e) => setRemarks(e.target.value)}
          ></Input>
        </div>
      </div>
      <div className="text-right mt-4 flex items-center justify-end">
        <Button
          className="ltr:mr-2 rtl:ml-2"
          variant="plain"
          size="sm"
          onClick={handleDialogClose}
        >
          Cancel
        </Button>
        <Button variant="solid" size="sm" onClick={handleSaveCDNote}>
          Confirm
        </Button>
      </div>
    </Dialog>
  );
}

export default SaveCDNoteDialog;
