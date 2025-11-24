import { Avatar, Button, Dialog, Input } from 'components/ui';
import React, { useRef, useState } from 'react';
import { MdPayment } from 'react-icons/md';
import {
  numberToINRFormat,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import StripePaymentDialog from './StripePaymentDialog';
import { RiSecurePaymentLine } from 'react-icons/ri';
import PaymentGatewayBtn from './PaymentGatewayBtn';
import { loadRazorpay } from 'configs/paymentGateways/razorPayConfig';
import GatewayDownDialog from './GatewayStatusDialogs/GatewayDownDialog';
import {
  apiPostRazorPayCreateOrder,
  apiPostRazorPayVerifyPayment,
} from 'services/PaymentGatewayService';

/* CONSTANTS */
const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: false };

function PaymentGatewayDialog({
  isOpen,
  setIsOpen,
  invoices,
  columns,
  currencySymbol,
  setIsPaymentSuccessDialogOpen,
  setIsPaymentFailedDialogOpen,
  setIsPaymentInvalidDialogOpen,
  updateBillsTableDataForPaidBills,
  setPaymentRefNumber,
}) {
  /* CONSTANTS */
  const totalAmount = Number(
    invoices
      .reduce((sum, invoice) => sum + invoice.PayableAmount, 0)
      .toFixed(2),
  );
  const formattedTotalAmount = `${currencySymbol} ${numberToINRFormat(
    totalAmount,
  )}`;

  /* STATES */
  const [selGateway, setSelGateway] = useState('razorPay');
  const [isStripeGatewayDialogOpen, setIsStripeGatewayDialogOpen] =
    useState(false);
  const [managedColumns, setManagedColumns] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isRazorPayDown, setIsRazorPayDown] = useState(false);

  /* REFS */
  const paymentRefNumberRef = useRef(null);
  const isPaymentFailedRef = useRef(false);
  const isPaymentInvalidRef = useRef(false);

  /* EVENT HANDLERS */
  const handleClose = () => setIsOpen(false);

  const handleCheckout = () => {
    if (selGateway === 'stripe') setIsStripeGatewayDialogOpen(true);
    else if (selGateway === 'razorPay') executePayWithRazorPay();
  };

  const executePayWithRazorPay = async () => {
    try {
      const razorPay = await loadRazorpay();
      if (!razorPay) {
        setIsRazorPayDown(true);
        return;
      }
      setIsRazorPayDown(false);
      const response = await apiPostRazorPayCreateOrder(totalAmount, 'INR');
      if (response.status !== 200) {
        throw new Error(response);
      }
      const orderInfo = response.data;
      const options = {
        key: orderInfo.razorpay_key,
        amount: orderInfo.amount,
        currency: 'INR',
        name: 'Cloudbats',
        description: '',
        order_id: orderInfo.order_id,
        handler: verifyRazorPayPayment,
        theme: {
          color: '#14b8a6',
        },
        modal: {
          ondismiss: handleGatewayClose,
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', (response) => {
        paymentRefNumberRef.current = response.error.metadata.payment_id;
        isPaymentFailedRef.current = true;
      });
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while paying from RazorPay',
      );
      console.error(error);
    }
  };

  const verifyRazorPayPayment = async (handlerResponse) => {
    try {
      paymentRefNumberRef.current = handlerResponse.razorpay_payment_id;
      const response = await apiPostRazorPayVerifyPayment(handlerResponse);
      if (response.status === 200) {
        if (response.data.status === 'success') {
          isPaymentFailedRef.current = false;
        } else {
          throw new Error(response);
        }
      } else throw new Error(response);
    } catch (error) {
      isPaymentInvalidRef.current = true;
      console.error(error);
    } finally {
      handleGatewayClose();
    }
  };

  const handleGatewayClose = () => {
    if (isPaymentFailedRef.current || !paymentRefNumberRef.current) {
      setIsPaymentFailedDialogOpen(true);
      setIsPaymentSuccessDialogOpen(false);
      setIsPaymentInvalidDialogOpen(false);
    } else {
      if (isPaymentInvalidRef.current) {
        setIsPaymentFailedDialogOpen(false);
        setIsPaymentSuccessDialogOpen(false);
        setIsPaymentInvalidDialogOpen(true);
      } else {
        setIsPaymentFailedDialogOpen(false);
        setIsPaymentSuccessDialogOpen(true);
        setIsPaymentInvalidDialogOpen(false);
        updateBillsTableDataForPaidBills(invoices);
      }
    }
    setPaymentRefNumber(paymentRefNumberRef.current);
    handleClose();
  };

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={false}
        width="95vw"
        contentClassName="mt-8"
      >
        <div className="flex">
          <div className="pr-2 border-r border-gray-600 w-[70%]">
            <div className="flex items-center justify-between">
              <h5 className="mb-3">Payment Summary</h5>
              <div>
                <Input
                  value={globalFilter}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  placeholder="Search All Columns"
                  size="sm"
                />
              </div>
            </div>
            <div className="h-[80vh] overflow-y-auto">
              <ReportsTable
                tableData={invoices}
                originalColumns={columns}
                exportFile={false}
                toolbarOptions={TOOLBAR_OPTIONS}
                managedColumns={managedColumns}
                setManagedColumns={setManagedColumns}
                externalGlobalFilter={globalFilter}
                emptyDataMsg="Please select invoices with valid payable amount"
              />
            </div>
          </div>
          <div className="grow pl-2 flex flex-col">
            <h5 className="mb-3">Payment Gateway</h5>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <PaymentGatewayBtn
                imgSrc="/assets/logos/razorpay-logo.svg"
                imgAlt="Razorpay Logo"
                active={selGateway === 'razorPay'}
                onClick={() => setSelGateway('razorPay')}
              />
              <PaymentGatewayBtn
                imgSrc="/assets/logos/stripe-logo.svg"
                imgAlt="Stripe Logo"
                imgHeight={20}
                active={selGateway === 'stripe'}
                onClick={() => setSelGateway('stripe')}
              />
              <PaymentGatewayBtn
                imgSrc="/assets/logos/ablepay-logo.png"
                imgAlt="AblePay Logo"
                imgHeight={20}
                active={selGateway === 'ablePay'}
                onClick={() => setSelGateway('ablePay')}
              />
            </div>
            <div className="grow flex flex-col justify-end gap-4">
              <div className="flex flex-col items-center justify-center gap-3 grow">
                <Avatar
                  shape="circle"
                  className="!bg-emerald-500"
                  size={120}
                  icon={<RiSecurePaymentLine />}
                />
                <p className="text-gray-300 font-semibold text-base">
                  Secured Payment
                </p>
              </div>
              <div className="flex justify-end">
                <div className="text-right">
                  <p>Total Amount</p>
                  <h6>{formattedTotalAmount}</h6>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center mt-4 pt-2 gap-3 border-t border-t-gray-600">
              <Button
                variant={invoices.length > 0 ? 'plain' : 'solid'}
                onClick={handleClose}
                size="sm"
              >
                Cancel
              </Button>
              {invoices.length > 0 && (
                <Button
                  variant={'solid'}
                  size="sm"
                  icon={<MdPayment />}
                  onClick={handleCheckout}
                >
                  Pay with{' '}
                  {selGateway === 'razorPay'
                    ? 'RazorPay'
                    : selGateway === 'stripe'
                    ? 'Stripe'
                    : 'AblePay'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Dialog>
      {isStripeGatewayDialogOpen && (
        <StripePaymentDialog
          isOpen={isStripeGatewayDialogOpen}
          setIsOpen={setIsStripeGatewayDialogOpen}
          totalAmount={totalAmount}
          formattedTotalAmount={formattedTotalAmount}
          isPaymentFailedRef={isPaymentFailedRef}
          paymentRefNumberRef={paymentRefNumberRef}
          handleGatewayClose={handleGatewayClose}
        />
      )}
      {isRazorPayDown && (
        <GatewayDownDialog
          isOpen={isRazorPayDown}
          setIsOpen={setIsRazorPayDown}
          title="Pay with RazorPay"
          gatewayLogo={
            <PaymentGatewayBtn
              imgSrc="/assets/logos/razorpay-logo.svg"
              imgAlt="Stripe Logo"
              imgHeight={20}
              active={true}
            />
          }
          formattedTotalAmount={formattedTotalAmount}
        />
      )}
    </>
  );
}

export default PaymentGatewayDialog;
