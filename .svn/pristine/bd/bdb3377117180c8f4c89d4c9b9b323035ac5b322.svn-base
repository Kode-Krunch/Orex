import React, { useState } from 'react';
import BillsSummary from './components/BillsSummary';
import SelectableTable from './components/SelectableTable';
import { Button, Card } from 'components/ui';
import SelectedBillsSummary from './components/SelectedBillsSummary';
import { HiOutlineSearch } from 'react-icons/hi';
import DebouncedInput from 'views/Controls/DebouncedInput';
import {
  columnsToINRFormat,
  getDateFromDateTime,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { MdDelete } from 'react-icons/md';
import WarningDialog from 'views/Controls/WarningDialog';
import { apiCallstoreprocedure } from 'services/CommonService';

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
    accessorKey: 'PayableAmount',
  },
];

function BillsDashboard({ bills, setShowLoader }) {
  /* STATES */
  const [billsTableData, setBillsTableData] = useState(bills.tmpbilldata);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currencySymbol] = useState(
    billsTableData.length > 0 ? billsTableData[0].CurrencySymbol : '',
  );
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);

  /* EVENT HANDLERS */
  const handleDeleteBills = async () => {
    try {
      setShowLoader(true);
      let deletedBills = [];
      let skippedBills = [];
      for (let index = 0; index < selectedRows.length; index++) {
        const curBill = selectedRows[index];
        try {
          const response = await apiCallstoreprocedure('USP_BILL_DELETE', {
            InvoiceNumber: curBill.BillNumber,
          });
          if (response.status === 200) {
            deletedBills.push(curBill.BillNumber);
          } else {
            skippedBills.push(curBill.BillNumber);
          }
        } catch (error) {
          console.error(error);
          skippedBills.push(curBill.BillNumber);
        }
      }
      setBillsTableData((prev) =>
        prev.filter((bill) => !deletedBills.includes(bill.BillNumber)),
      );
      setRowSelection([]);
      setSelectedRows([]);
      setGlobalFilter('');
      skippedBills.length > 0
        ? openNotification('danger', `${skippedBills.length} bills not deleted`)
        : openNotification(
            'success',
            `${deletedBills.length} bills deleted successfully`,
          );
    } catch (error) {
      console.error(error);
      openNotification('danger', 'Something went wrong while deleting bills');
    } finally {
      setShowLoader(false);
      setIsConfirmDeleteDialogOpen(false);
    }
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
          <div className="flex justify-between gap-2">
            <h4>Bills</h4>
            <div className="flex gap-2">
              <Button
                icon={<MdDelete />}
                size="sm"
                variant="solid"
                color="red-700"
                onClick={() => setIsConfirmDeleteDialogOpen(true)}
                disabled={selectedRows.length === 0}
              >
                Delete
              </Button>
              <DebouncedInput
                value={globalFilter ?? ''}
                className="lg:w-52"
                size="sm"
                prefix={<HiOutlineSearch className="text-lg" />}
                placeholder="Search"
                onChange={(value) => setGlobalFilter(String(value))}
                showSearchLabel={false}
              />
            </div>
          </div>
          <div className="grow">
            {billsTableData.length > 0 ? (
              <SelectableTable
                tableColumns={BILLS_TABLE_COLUMNS}
                data={columnsToINRFormat(
                  billsTableData.map((bill) => {
                    return {
                      ...bill,
                      InvoiceDate: getDateFromDateTime(bill.InvoiceDate),
                    };
                  }),
                  ['PayableAmount'],
                ).map((bill) => {
                  return {
                    ...bill,
                    PayableAmount: `${currencySymbol} ${bill.PayableAmount}`,
                  };
                })}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
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
            selectedBills={selectedRows?.map((row) => {
              return {
                ...row,
                PayableAmount: Number(
                  typeof row?.PayableAmount === 'string'
                    ? row.PayableAmount.replaceAll(',', '')
                        .replaceAll(currencySymbol, '')
                        .replaceAll(' ', '')
                    : row?.PayableAmount,
                ),
                TotalTaxAmount: Number(
                  typeof row?.TotalTaxAmount === 'string'
                    ? row.TotalTaxAmount.replaceAll(',', '')
                    : row?.TotalTaxAmount,
                ),
              };
            })}
            currencySymbol={currencySymbol}
          />
        </div>
      </div>
      {isConfirmDeleteDialogOpen && (
        <WarningDialog
          isDialogOpen={isConfirmDeleteDialogOpen}
          title="Delete Bills"
          description={`Are you sure you want to delete ${selectedRows.length} bills?`}
          submitButtonTitle="Delete"
          submitButtonColor="red-700"
          handleDialogSubmit={handleDeleteBills}
          handleDialogClose={() => setIsConfirmDeleteDialogOpen(false)}
        />
      )}
    </>
  );
}

export default BillsDashboard;
