import React, { useEffect, useState } from 'react';
import BillsSummary from './components/BillsSummary';
import SelectableTable from './components/SelectableTable';
import { Button, Card } from 'components/ui';
import SelectedBillsSummary from './components/SelectedBillsSummary';
import { LuPenLine } from 'react-icons/lu';
import { GrDocumentPdf, GrDocumentText } from 'react-icons/gr';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
  generateBill,
  generateBillWithTC,
  generateTelecastReport,
} from './pdfDefinations/pdfGenerator';
import {
  columnsToINRFormat,
  getDateFromDateTime,
  numberToINRFormat,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { LiaClipboardListSolid, LiaFileInvoiceSolid } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import EInvoiceDialog from './components/EInvoiceDialog';
import { emailSend } from './components/utils';
import { MdOutlineAttachEmail, MdPayment } from 'react-icons/md';
import PaymentGatewayDialog from './components/Payment/PaymentGatewayDialog';
import PaymentSuccessDialog from './components/Payment/PaymentStatusDialogs/PaymentSuccessDialog';
import PaymentFailedDialog from './components/Payment/PaymentStatusDialogs/PaymentFailedDialog';
import PaymentInvalidDialog from './components/Payment/PaymentStatusDialogs/PaymentInvalidDialog';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

/* CONSTANTS */
const BILLS_TABLE_COLUMNS = [
  {
    header: 'Invoice No',
    accessorKey: 'INVOICENO',
    cell: (props) => {
      const row = props.row.original;
      return (
        <div
          className="flex justify-center "
          style={{
            padding: '5px',
            borderRadius: '100px',
            backgroundColor: '#5B92E633',
            color: '#fff',
            letterSpacing: '0.2px',
            fontWeight: 900,
          }}
        >
          {row.INVOICENO}
        </div>
      );
    },
    options: {
      cell: {
        style: {
          paddingBlock: '0px',
        },
      },
    },
  },
  {
    header: 'Invoice Date',
    accessorKey: 'InvoiceDate',
  },
  {
    header: 'Client',
    accessorKey: 'ClientName',
  },
  {
    header: 'Agency',
    accessorKey: 'AgencyName',
  },
  {
    header: 'Payable',
    accessorKey: 'formattedPayableAmount',
  },
];

function BillsDashboard({
  bills,
  setShowLoader,
  globalFilter,
  setGlobalFilter,
}) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const agencyCode = useSelector((state) => state.auth.user.AgencyCode);

  /* STATES */
  const [billsTableData, setBillsTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currencySymbol] = useState(
    bills.tmpbilldata.length > 0 ? bills.tmpbilldata[0].CurrencySymbol : '',
  );
  const [isEInvoiceDialogOpen, setIsEInvoiceDialogOpen] = useState(false);
  const [isPaymentGatewayDialogOpen, setIsPaymentGatewayDialogOpen] =
    useState(false);
  const [paymentRefNumber, setPaymentRefNumber] = useState('');
  const [isPaymentSuccessDialogOpen, setIsPaymentSuccessDialogOpen] =
    useState(false);
  const [isPaymentFailedDialogOpen, setIsPaymentFailedDialogOpen] =
    useState(false);
  const [isPaymentInvalidDialogOpen, setIsPaymentInvalidDialogOpen] =
    useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    setBillsTableData(
      columnsToINRFormat(
        bills.tmpbilldata.map((bill) => {
          return {
            ...bill,
            InvoiceDate: getDateFromDateTime(bill.InvoiceDate),
            formattedPayableAmount: bill.PayableAmount,
          };
        }),
        ['formattedPayableAmount'],
      ).map((bill) => {
        return {
          ...bill,
          formattedPayableAmount: `${currencySymbol} ${bill.formattedPayableAmount}`,
        };
      }),
    );
  }, [bills, currencySymbol]);

  /* EVENT HANDLERS */
  const handlePDFBillsClick = async (rows) => {
    try {
      setShowLoader(true);
      await generateAndDownloadPDFs(rows, bills, 'bill', false);
      setShowLoader(false);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong. Unable to generate PDFs.',
      );
      setShowLoader(false);
      console.error(error);
    }
  };

  const handleBillsWithTcClick = async (rows) => {
    try {
      setShowLoader(true);
      await generateAndDownloadPDFs(rows, bills, 'billWithTC', false);
      setShowLoader(false);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong. Unable to generate PDFs.',
      );
      setShowLoader(false);
      console.error(error);
    }
  };

  const handleBillsEmailSend = async (rows) => {
    try {
      setShowLoader(true);
      await generateAndDownloadPDFs(rows, bills, 'billWithTC', true);
      setShowLoader(false);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong. Unable to generate PDFs.',
      );
      setShowLoader(false);
      console.error(error);
    }
  };

  const handleTelecastReportClick = async (rows) => {
    try {
      setShowLoader(true);
      await generateAndDownloadPDFs(rows, bills, 'telecastReport', false);
      setShowLoader(false);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong. Unable to generate PDFs.',
      );
      setShowLoader(false);
      console.error(error);
    }
  };

  const handlePayNowClick = () => {
    const validInvoices = selectedRows.filter((row) => row.PayableAmount > 0);
    if (!validInvoices.length === 0)
      openNotification(
        'info',
        `Please select invoices having payable amount greater than ${currencySymbol} 0.00`,
      );
    else setIsPaymentGatewayDialogOpen(true);
  };

  /* HELPER FUNCTIONS */
  const generateAndDownloadPDFs = async (rows, bills, pdfType, isEmailSend) => {
    setShowLoader(true);
    try {
      if (rows.length === 0) {
        openNotification('warning', 'Please select an invoice to download.');
        return;
      }
      if (rows.length === 1) {
        // Single PDF case
        const originalBill = bills.tmpbilldata.find(
          (bill) => bill.INVOICENO === rows[0].INVOICENO,
        );
        let pdf;
        if (pdfType === 'bill') {
          pdf = await generateBill(originalBill, bills.tmpbilltaxdata, pdfType);
        } else if (pdfType === 'billWithTC') {
          const subReports = bills.tmpbilldatasubreport.filter(
            (bill) => originalBill.BillNumber === bill.BillNumber,
          );
          const distinctTelecastReport = subReports.reduce((acc, current) => {
            const exists = acc.find(
              (item) =>
                item.BookingSpotRate === current.BookingSpotRate &&
                item.timebandname === current.timebandname &&
                item.SpotType === current.SpotType &&
                item.CommercialCaption === current.CommercialCaption,
            );
            if (exists) {
              exists.count += 1;
            } else {
              acc.push({ ...current, count: 1 });
            }
            return acc;
          }, []);
          pdf = await generateBillWithTC(
            originalBill,
            bills.tmpbilltaxdata,
            subReports,
            distinctTelecastReport,
            channel,
          );
        } else if (pdfType === 'telecastReport') {
          const subReports = bills.tmpbilldatasubreport.filter(
            (bill) => originalBill.BillNumber === bill.BillNumber,
          );
          pdf = await generateTelecastReport(originalBill, subReports, channel);
        }
        const invoiceFileName = `${originalBill.INVOICENO.replaceAll(
          '/',
          '-',
        )}.pdf`;
        pdf.getBlob((pdfBlob) => {
          if (isEmailSend) {
            emailSend(pdfBlob, false, invoiceFileName, rows, channel);
          } else {
            saveAs(pdfBlob, invoiceFileName);
          }
        });
        return;
      }
      // Multiple PDFs case — create one ZIP with all PDFs inside
      const zip = new JSZip();
      for (const row of rows) {
        const originalBill = bills.tmpbilldata.find(
          (bill) => bill.INVOICENO === row.INVOICENO,
        );
        let pdf;
        if (pdfType === 'bill') {
          pdf = await generateBill(originalBill, bills.tmpbilltaxdata, pdfType);
        } else if (pdfType === 'billWithTC') {
          const subReports = bills.tmpbilldatasubreport.filter(
            (bill) => originalBill.BillNumber === bill.BillNumber,
          );
          const distinctTelecastReport = subReports.reduce((acc, current) => {
            const exists = acc.find(
              (item) =>
                item.BookingSpotRate === current.BookingSpotRate &&
                item.timebandname === current.timebandname &&
                item.SpotType === current.SpotType &&
                item.CommercialCaption === current.CommercialCaption,
            );
            if (exists) {
              exists.count += 1;
            } else {
              acc.push({ ...current, count: 1 });
            }
            return acc;
          }, []);
          pdf = await generateBillWithTC(
            originalBill,
            bills.tmpbilltaxdata,
            subReports,
            distinctTelecastReport,
            channel,
          );
        } else if (pdfType === 'telecastReport') {
          const subReports = bills.tmpbilldatasubreport.filter(
            (bill) => originalBill.BillNumber === bill.BillNumber,
          );
          pdf = await generateTelecastReport(originalBill, subReports, channel);
        }
        const invoiceFileName = `${originalBill.INVOICENO.replaceAll(
          '/',
          '-',
        )}.pdf`;
        const pdfBlob = await new Promise((resolve) => pdf.getBlob(resolve));
        zip.file(invoiceFileName, pdfBlob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipName = 'invoices.zip';
      if (isEmailSend) {
        emailSend(zipBlob, true, zipName, rows, channel);
      } else {
        saveAs(zipBlob, zipName);
      }
    } catch (error) {
      console.error('Error generating/downloading PDFs:', error);
      openNotification('error', error.message || 'Unexpected error occurred.');
    } finally {
      setShowLoader(false);
    }
  };

  const updateBillsTableDataForPaidBills = (paidBills) => {
    const paidBillsId = paidBills.map((item) => item.Id);
    const updatedBills = billsTableData.map((item) => {
      if (paidBillsId.includes(item.Id))
        return {
          ...item,
          PayableAmount: 0,
          formattedPayableAmount: `${currencySymbol} ${numberToINRFormat(0)}`,
        };
      else return item;
    });
    setBillsTableData(updatedBills);
    setSelectedRows([]);
  };

  return (
    <>
      <div className="grid grid-cols-9 gap-4">
        <BillsSummary bills={bills} currencySymbol={currencySymbol} />
      </div>
      <div className="grid grid-cols-9 gap-4 h-full mt-4" bodyClass="h-full">
        <Card
          className="col-span-7 border-none"
          bodyClass="p-3 h-[65vh] flex flex-col"
        >
          <div className="flex justify-between gap-2 mb-2">
            <h4>Bills</h4>
            <div className="flex gap-2">
              <Button
                icon={<LiaFileInvoiceSolid />}
                size="sm"
                variant="solid"
                onClick={() => setIsEInvoiceDialogOpen(true)}
                disabled={selectedRows.length === 0}
              >
                E-Invoice
              </Button>
              <Button
                icon={<MdOutlineAttachEmail />}
                size="sm"
                variant="solid"
                onClick={() => {
                  handleBillsEmailSend(selectedRows);
                }}
                disabled={selectedRows.length === 0}
              >
                Send Email
              </Button>
              <Button
                icon={<GrDocumentPdf />}
                size="sm"
                variant="solid"
                onClick={() => {
                  handlePDFBillsClick(selectedRows);
                }}
                disabled={selectedRows.length === 0}
              >
                PDF Bills
              </Button>
              <Button
                icon={<LiaClipboardListSolid />}
                size="sm"
                variant="solid"
                onClick={() => {
                  handleBillsWithTcClick(selectedRows);
                }}
                disabled={selectedRows.length === 0}
              >
                Bills with TC
              </Button>
              <Button
                icon={<GrDocumentText />}
                size="sm"
                variant="solid"
                onClick={() => {
                  handleTelecastReportClick(selectedRows);
                }}
                disabled={selectedRows.length === 0}
              >
                Telecast Report
              </Button>
              <Button icon={<LuPenLine />} size="sm" variant="solid">
                Digital Sign Bills
              </Button>
              {agencyCode > 0 && (
                <Button
                  icon={<MdPayment />}
                  size="sm"
                  variant="solid"
                  color="amber-500"
                  onClick={handlePayNowClick}
                >
                  Pay Now
                </Button>
              )}
            </div>
          </div>
          <div className="grow">
            {billsTableData.length > 0 ? (
              <SelectableTable
                tableColumns={BILLS_TABLE_COLUMNS}
                data={billsTableData}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                setSelectedRows={setSelectedRows}
                type="dashboard"
                setShowLoader={setShowLoader}
                additionalData={{
                  bills: bills,
                }}
                currencySymbol={currencySymbol}
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                No bills to show
              </div>
            )}
          </div>
        </Card>
        <div className="col-span-2 flex flex-col gap-3">
          <SelectedBillsSummary
            selectedBills={selectedRows}
            currencySymbol={currencySymbol}
          />
        </div>
      </div>
      {isEInvoiceDialogOpen && (
        <EInvoiceDialog
          isOpen={isEInvoiceDialogOpen}
          setIsOpen={setIsEInvoiceDialogOpen}
          tableData={selectedRows}
          columns={[...BILLS_TABLE_COLUMNS]}
          setShowLoader={setShowLoader}
          currencySymbol={currencySymbol}
          bills={bills}
        />
      )}
      {isPaymentGatewayDialogOpen && (
        <PaymentGatewayDialog
          isOpen={isPaymentGatewayDialogOpen}
          setIsOpen={setIsPaymentGatewayDialogOpen}
          invoices={selectedRows.filter((row) => row.PayableAmount > 0)}
          columns={BILLS_TABLE_COLUMNS}
          currencySymbol={currencySymbol}
          setIsPaymentSuccessDialogOpen={setIsPaymentSuccessDialogOpen}
          setIsPaymentFailedDialogOpen={setIsPaymentFailedDialogOpen}
          setIsPaymentInvalidDialogOpen={setIsPaymentInvalidDialogOpen}
          updateBillsTableDataForPaidBills={updateBillsTableDataForPaidBills}
          setPaymentRefNumber={setPaymentRefNumber}
        />
      )}
      {isPaymentSuccessDialogOpen && (
        <PaymentSuccessDialog
          isOpen={isPaymentSuccessDialogOpen}
          setIsOpen={setIsPaymentSuccessDialogOpen}
          refNumber={paymentRefNumber}
          setRefNumber={setPaymentRefNumber}
        />
      )}
      {isPaymentFailedDialogOpen && (
        <PaymentFailedDialog
          isOpen={isPaymentFailedDialogOpen}
          setIsOpen={setIsPaymentFailedDialogOpen}
          refNumber={paymentRefNumber}
          setRefNumber={setPaymentRefNumber}
        />
      )}
      {isPaymentInvalidDialogOpen && (
        <PaymentInvalidDialog
          isOpen={isPaymentInvalidDialogOpen}
          setIsOpen={setIsPaymentInvalidDialogOpen}
          refNumber={paymentRefNumber}
          setRefNumber={setPaymentRefNumber}
        />
      )}
    </>
  );
}

export default BillsDashboard;
