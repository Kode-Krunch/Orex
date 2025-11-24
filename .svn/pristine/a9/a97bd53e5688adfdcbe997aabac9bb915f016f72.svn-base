import { Button, Card, Dialog, Tooltip } from 'components/ui';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import React, { useState, useEffect, useMemo } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import {
  columnsToINRFormat,
  getDateFromDateTime,
  isChannelSelected,
  numberToINRFormat,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import HeaderExtra from 'views/Controls/HeaderExtra';
import AddCreditNoteDialog from './components/AddCreditNoteDialog';
import Loader from 'views/Controls/Loader';
import { getCreditNotes } from 'services/AccountsServices';
import DisplayTable from 'views/Controls/DisplayTable';
import { FaRegEye, FaRegTrashAlt } from 'react-icons/fa';
import GenerateCDNoteHeader from './components/GenerateCDNoteHeader';
import SpotsTable from './components/SpotsTable';
import { apiCallstoreprocedure } from 'services/CommonService';
import WarningDialog from '../../Controls/WarningDialog';
import SaveCDNoteStickyFooter from './components/SaveCDNoteStickyFooter';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { TbDownload } from 'react-icons/tb';

/* CONSTANTS */
const CDN_COLUMNS = [
  {
    header: 'Date',
    accessorKey: 'RefDate',
  },
  {
    header: 'Type',
    accessorKey: 'CreditDebitStatus',
  },
  {
    header: 'Reference No',
    accessorKey: 'RefNumber',
  },
  {
    header: 'Invoice No',
    accessorKey: 'InvoiceNumber',
  },
  {
    header: 'Amount',
    accessorKey: 'Amount',
  },
];

const CDN_BILLS_COLUMNS = [
  {
    header: 'Invoice No',
    accessorKey: 'INVOICENO',
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
    header: 'Gross Amount',
    accessorKey: 'GrossAmount',
  },
  {
    header: 'Discount',
    accessorKey: 'AgencyShare',
  },
  {
    header: 'Taxes',
    accessorKey: 'TotalTaxAmount',
  },
  {
    header: 'Payable',
    accessorKey: 'PayableAmount',
  },
];

/* COMPONENTS */
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex justify-end">
      <div className="flex items-center font-semibold">
        <InputwithVoice
          {...props}
          value={value}
          onChange={(e) => {
            if (/^[0-9a-zA-Z\s.]*$/.test(e.target.value)) {
              setValue(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
}

const headerExtraContent = (
  curPage,
  setIsAddCNDialogOpen,
  setIsDiscardDialogOpen,
  DebouncedInput,
  globalFilter,
  setGlobalFilter,
  channel,
) => {
  return (
    <div className="flex items-center gap-2">
      {curPage === 'home' && (
        <>
          <DebouncedInput
            value={globalFilter ?? ''}
            placeholder="Search all columns..."
            size="sm"
            onChange={(value) => {
              if (/^[0-9a-zA-Z\s.]*$/.test(value)) {
                setGlobalFilter(value);
              }
            }}
          />
          <Button
            variant="solid"
            size="sm"
            icon={<HiPlusCircle />}
            onClick={() => setIsAddCNDialogOpen(true)}
            disabled={!isChannelSelected(channel)}
          >
            Add Credit/Debit Note
          </Button>
        </>
      )}
      {curPage === 'bills' && (
        <>
          <DebouncedInput
            value={globalFilter ?? ''}
            placeholder="Search all columns..."
            size="sm"
            onChange={(value) => {
              if (/^[0-9a-zA-Z\s.]*$/.test(value)) {
                setGlobalFilter(value);
              }
            }}
          />
          <Tooltip title="Discard">
            <Button
              variant="twoTone"
              size="sm"
              icon={<FaRegTrashAlt />}
              onClick={() => {
                setIsDiscardDialogOpen(true);
              }}
            ></Button>
          </Tooltip>
        </>
      )}
    </div>
  );
};

function CreditNote() {
  /* REDUX STATES */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const loginId = useSelector((state) => state.auth.session.LoginId);
  const token = useSelector((state) => state.auth.session.token);

  /* STATES */
  // Core States
  const [existingCDNotes, setExistingCDNotes] = useState(null);
  const [noteType, setNoteType] = useState({ value: 1, label: 'Credit' });
  const [bills, setBills] = useState(null);
  const [cdNoteBill, setCDNoteBill] = useState(null);
  const [cdnDate, setCDNDate] = useState(null);
  const [spotsWithNewRate, setSpotsWithNewRate] = useState(null);
  const [newRateTotal, setNewRateTotal] = useState(0);
  const [firstNewRate, setFirstNewRate] = useState(true);
  const [remarks, setRemarks] = useState('');
  //Table States
  const [existingCDNGlobalFilter, setExistingCDNGlobalFilter] = useState('');
  const [CreditNoteDataTable, setCreditNoteDataTable] = useState([]);
  console.log(CreditNoteDataTable);

  const [selectedRowC_D_Note, setSelectedRowC_D_Note] = useState(null);
  const [selectedRowC_D_Note_Index, setSelectedRowC_D_Note_Index] =
    useState(null);
  const [cdnBillsGlobalFilter, setCDNBillsGlobalFilter] = useState('');
  const [ManagedColumnInvoiceDetails, setManagedColumnInvoiceDetails] =
    useState([]);
  const [
    ManagedColumnInvoiceDetailsNoteData,
    setManagedColumnInvoiceDetailsNoteData,
  ] = useState([]);
  const [existingCDNotesData, setExistingCDNotesData] = useState(null);
  const [ViewDataColumns] = useState(getTableColumnsWithActions());
  // UI States
  const [isAddCNDialogOpen, setIsAddCNDialogOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isResetAllNewRateDialogOpen, setIsResetAllNewRateDialogOpen] =
    useState(false);
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
  const [showCreditNoteDialog, onShowCreditNoteDialogClose] = useState(false);

  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [curPage, setCurPage] = useState('home');
  // UI Table Function
  function getTableColumnsWithActions() {
    try {
      return [
        ...CDN_COLUMNS,
        {
          header: 'Action',
          accessorKey: 'action',
          actions: [
            {
              action: (rowIndex, rowData) => (
                <div className="text-xs font-medium !w-max">
                  <div className="flex gap-2 justify-center">
                    <Tooltip title="View Note">
                      <Button
                        size="xs"
                        icon={<FaRegEye />}
                        onClick={() => {
                          setSelectedRowC_D_Note(rowData);
                          setSelectedRowC_D_Note_Index(rowIndex);
                          onShowCreditNoteDialogClose(true);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Download Note">
                      <Button
                        size="xs"
                        icon={<TbDownload />}
                        onClick={() => {
                          setSelectedRowC_D_Note(rowData);
                          setSelectedRowC_D_Note_Index(rowIndex);
                          onShowCreditNoteDialogClose(true);
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              ),
            },
          ],
        },
      ];
    } catch (error) {
      console.error(error);
    }
  }

  //
  const CreditNoteColumns = useMemo(() => {
    return [
      { header: 'Agency Name', accessorKey: 'AgencyName' },
      { header: 'Address Line1', accessorKey: 'AddressLine1' },
      { header: 'Payable Amount', accessorKey: 'PayableAmount' },
      { header: 'Client', accessorKey: 'ClientName' },
      { header: 'Amount', accessorKey: 'Amount' },
      { header: 'Ref Date', accessorKey: 'RefDate' },
      { header: 'Invoice Date', accessorKey: 'InvoiceDate' },
      { header: 'GSTN Id', accessorKey: 'GSTN_id' },
      { header: 'Brand', accessorKey: 'BrandName' },
      { header: 'Booking Ref', accessorKey: 'BookingRefNumber' },
    ];
  }, []);
  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (isChannelSelected(channel)) {
        getExisitingCreditNotes();
      }
    } catch (error) {
      openNotification(
        'danger',
        `Something went wrong while fetching credit notes.`,
      );
      setLoader(false);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      if (isChannelSelected(channel)) {
        resetPage();
      } else {
        openNotification(
          'warning',
          'Please select a channel to view credit notes',
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [channel]);

  /* EVENT HANDLERS */
  const handleEditNoteClick = async (clickedNote) => {
    try {
      // TODO: Fetch note details here for clicked note
      console.log(clickedNote);
    } catch (error) {
      openNotification('danger', `Something went wrong`);
      console.error(error);
    }
  };
  useEffect(() => {
    if (selectedRowC_D_Note !== null)
      handleGenerateCreditNoteClickPopUp(selectedRowC_D_Note.CreditDebitCode);
  }, [selectedRowC_D_Note_Index]);
  const handleGenerateCreditNoteClickPopUp = async (par_CreditDebitCode) => {
    setShowLoader(true);
    let data = {};
    data.par_LocationCode = channel.LocationCode;
    data.par_ChannelCode = channel.ChannelCode;
    data.par_CreditDebitCode = par_CreditDebitCode;
    data.par_Flag = 0;

    apiCallstoreprocedure('usp_Billing_CreditDebitPrint', data)
      .then((response) => {
        if (response.status == 200) {
          setShowLoader(false);
          setCreditNoteDataTable(response.data);
          console.log(response.status);
        } else if (response.status == 204) {
          setShowLoader(false);
          setCreditNoteDataTable([]);
        }
      })
      .catch((error) => {
        if (error.response.status) {
          setCreditNoteDataTable([]);
          setShowLoader(false);
        }
      });
  };

  const handleGenerateCreditNoteClick = async (clickedBill) => {
    try {
      let param = {
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
        InvoiceNumber: clickedBill.BillNumber,
      };
      let response = await apiCallstoreprocedure(
        'USP_ShowInvoiceDetail',
        param,
      );
      if (response.status === 200) {
        setSpotsWithNewRate(
          columnsToINRFormat(response.data, ['SpotRate', 'SpotAmount']).map(
            (spot) => {
              return {
                ...spot,
                TelecastDate: getDateFromDateTime(spot.TelecastDate),
                TelecastTime: spot.TelecastTime,
                NewRateAmount: '-',
              };
            },
          ),
        );
      } else if (response.status === 204) {
        setSpotsWithNewRate([]);
      } else {
        openNotification(
          'danger',
          `Something went wrong. Server responded with status code ${response.status} while fetching spots`,
        );
        setSpotsWithNewRate([]);
      }
      setCDNoteBill(clickedBill);
      setCurPage('generateNote');
    } catch (error) {
      openNotification('danger', `Something went wrong while fetching spots`);
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const getExisitingCreditNotes = async () => {
    try {
      setLoader(true);
      const response = await getCreditNotes(channel, token);
      if (response.status === 200) {
        setExistingCDNotes(response.data);
      } else if (response.status === 204) {
        setExistingCDNotes([]);
      } else {
        openNotification(
          'danger',
          `Something went wrong. Server responded with status code ${response.status} while fetching credit notes.`,
        );
      }
      setLoader(false);
    } catch (error) {
      throw error;
    }
  };

  const resetPage = () => {
    try {
      resetStates();
      getExisitingCreditNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const resetStates = () => {
    try {
      setExistingCDNotes(null);
      setNoteType({ value: 1, label: 'Credit' });
      setBills(null);
      setCDNoteBill(null);
      setCDNDate(null);
      setSpotsWithNewRate(null);
      setNewRateTotal(0);
      setRemarks('');
      setFirstNewRate(true);
      setExistingCDNGlobalFilter('');
      setCDNBillsGlobalFilter('');
      setIsAddCNDialogOpen(false);
      setIsResetAllNewRateDialogOpen(false);
      setIsDiscardDialogOpen(false);
      setIsSaveDialogOpen(false);
      setLoader(false);
      setCurPage('home');
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    if (existingCDNotes && existingCDNotes.length > 0) {
      setExistingCDNotesData(
        existingCDNotes.map((curNote) => {
          return {
            ...curNote,
            CreditDebitStatus:
              curNote.CreditDebitStatus === 0 ? 'Debit Note' : 'Credit Note',
            RefDate: getDateFromDateTime(curNote.RefDate),
            Amount: numberToINRFormat(curNote.Amount),
          };
        }),
      );
    }
  }, [existingCDNotes]);

  return (
    <>
      <Loader showLoader={showLoader} />
      <Card
        header={<HeaderExtra />}
        headerExtra={headerExtraContent(
          curPage,
          setIsAddCNDialogOpen,
          setIsDiscardDialogOpen,
          DebouncedInput,
          curPage === 'home'
            ? existingCDNGlobalFilter
            : curPage === 'bills'
            ? cdnBillsGlobalFilter
            : '',
          curPage === 'home'
            ? setExistingCDNGlobalFilter
            : curPage === 'bills'
            ? setCDNBillsGlobalFilter
            : '',
          channel,
        )}
        className="flex flex-col min-h-[87vh] mb-4"
        bodyClass="grow p-3"
      >
        {!isChannelSelected(channel) && (
          <div className="h-full flex justify-center items-center">
            Please select a channel to view credit notes
          </div>
        )}
        {isChannelSelected(channel) && (
          <>
            {curPage === 'home' && (
              <>
                {existingCDNotes && existingCDNotes.length === 0 && (
                  <div className="h-full flex justify-center items-center">
                    No Credit/Debit notes to show
                  </div>
                )}
                {existingCDNotes && existingCDNotes.length > 0 && (
                  <ReportsTable
                    tableData={existingCDNotesData}
                    originalColumns={ViewDataColumns}
                    managedColumns={ManagedColumnInvoiceDetails}
                    setManagedColumns={setManagedColumnInvoiceDetails}
                    exportFileName="Credit & Debit Note"
                    columnsToFormatInINR={[]}
                  />
                )}
              </>
            )}

            {curPage === 'bills' && (
              <>
                {bills && bills.tmpbilldata.length === 0 && (
                  <div className="h-full flex justify-center items-center">
                    No bills to show
                  </div>
                )}
                {bills && bills.tmpbilldata.length > 0 && (
                  <div className="h-full flex flex-col">
                    <h5 className="mb-3">{`${noteType.label} Note`}</h5>
                    <div className="grow">
                      <DisplayTable
                        data={bills.tmpbilldata.map((bill) => {
                          return {
                            ...bill,
                            TotalTaxAmount: numberToINRFormat(
                              bill.TotalTaxAmount,
                            ),
                            InvoiceDate: getDateFromDateTime(bill.InvoiceDate),
                            PayableAmount: numberToINRFormat(
                              bill.PayableAmount,
                            ),
                            GrossAmount: numberToINRFormat(bill.GrossAmount),
                            noteType: noteType,
                          };
                        })}
                        columns={CDN_BILLS_COLUMNS}
                        globalFilter={cdnBillsGlobalFilter}
                        setGlobalFilter={setCDNBillsGlobalFilter}
                        seteditData={handleGenerateCreditNoteClick}
                        ExportName={'Credit/Debit Note Bills'}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            {curPage === 'generateNote' && (
              <>
                {cdNoteBill &&
                  Array.isArray(spotsWithNewRate) &&
                  spotsWithNewRate.length === 0 && (
                    <div className="h-full flex justify-center items-center">
                      No Spots to show
                    </div>
                  )}
                {cdNoteBill &&
                  Array.isArray(spotsWithNewRate) &&
                  spotsWithNewRate.length > 0 && (
                    <>
                      <h5 className="mb-3">{`${noteType.label} Note`}</h5>
                      <GenerateCDNoteHeader
                        bill={cdNoteBill}
                        cdnDate={cdnDate}
                        setCDNDate={setCDNDate}
                        newRateTotal={newRateTotal}
                      />
                      <Card className="mt-4" bodyClass="p-3 pt-2">
                        <h6 className="mb-2">Spots</h6>
                        <SpotsTable
                          spots={spotsWithNewRate}
                          setSpots={setSpotsWithNewRate}
                          generateCDNDate={cdnDate}
                          newRateTotal={newRateTotal}
                          setNewRateTotal={setNewRateTotal}
                          firstNewRate={firstNewRate}
                          setFirstNewRate={setFirstNewRate}
                          isResetAllNewRateDialogOpen={
                            isResetAllNewRateDialogOpen
                          }
                          setIsResetAllNewRateDialogOpen={
                            setIsResetAllNewRateDialogOpen
                          }
                          setLoader={setLoader}
                          scrollHeight={'65vh'}
                        />
                      </Card>
                    </>
                  )}
              </>
            )}
          </>
        )}
      </Card>
      {curPage === 'generateNote' && (
        <SaveCDNoteStickyFooter
          setIsResetAllNewRateDialogOpen={setIsResetAllNewRateDialogOpen}
          setIsDiscardDialogOpen={setIsDiscardDialogOpen}
          isSaveDialogOpen={isSaveDialogOpen}
          setIsSaveDialogOpen={setIsSaveDialogOpen}
          firstNewRate={firstNewRate}
          newRateTotal={newRateTotal}
          cdnDate={cdnDate}
          noteType={noteType}
          cdNoteBill={cdNoteBill}
          spotsWithNewRate={spotsWithNewRate}
          remarks={remarks}
          setRemarks={setRemarks}
          resetPage={resetPage}
          channel={channel}
          token={token}
        />
      )}
      <AddCreditNoteDialog
        isAddCNDialogOpen={isAddCNDialogOpen}
        setIsAddCNDialogOpen={setIsAddCNDialogOpen}
        noteType={noteType}
        setNoteType={setNoteType}
        setBills={setBills}
        setShowLoader={setLoader}
        setCurPage={setCurPage}
        channel={channel}
        loginId={loginId}
        token={token}
      />
      <Loader showLoader={loader} />
      <WarningDialog
        isDialogOpen={isDiscardDialogOpen}
        title="Discard"
        description={`Are you sure you want to discard?`}
        submitButtonTitle="Discard"
        handleDialogSubmit={resetPage}
        handleDialogClose={() => setIsDiscardDialogOpen(false)}
      />
      <Dialog
        isOpen={showCreditNoteDialog}
        onClose={() => onShowCreditNoteDialogClose(false)}
        width={'90vw'}
        height={'80vh'}
        contentClassName="pt-3 flex flex-col"
      >
        <h5 className="border-b border-gray-700 pb-2">
          Credit & Debit Note Info{' '}
        </h5>
        {/* <div className="flex gap-3 py-2 border-b border-gray-700">
          <div className="flex flex-col border-r border-r-gray-700 pr-3">
            <span className="font-semibold text-teal-500 text-base">
              {originalSpots.length}
            </span>
            <span>Total Spots</span>
          </div>
          <div className="flex flex-col border-r border-r-gray-700 pr-3">
            <span className="font-semibold text-teal-500 text-base">
              {getFieldTotal(originalSpots, 'DurInSec')}
            </span>
            <span>Total Duration</span>
          </div>
          <div className="flex flex-col border-r border-r-gray-700 pr-3">
            <span className="font-semibold text-teal-500 text-base">
              {currencySymbol}{' '}
              {numberToINRFormat(
                getFieldTotal(originalSpots, 'BillSpotAmount'),
              )}
            </span>
            <span>Total Amount</span>
          </div>
        </div> */}
        {CreditNoteDataTable.length > 0 ? (
          <div className="grow mt-3">
            <ReportsTable
              tableData={CreditNoteDataTable}
              originalColumns={CreditNoteColumns}
              managedColumns={ManagedColumnInvoiceDetailsNoteData}
              setManagedColumns={setManagedColumnInvoiceDetailsNoteData}
              exportFileName="Credit & Debit Note"
              columnsToFormatInINR={[]}
            />
            {/* <DisplayTable
              data={CreditNoteDataTable}
              columns={CreditNoteColumns}
              globalFilter={creditNoteGlobalFilter}
              setGlobalFilter={setCreditNoteGlobalFilter}
              ExportName={`Credit Note`}
            /> */}
          </div>
        ) : (
          <p className="text-center">No Spots Found</p>
        )}
      </Dialog>
    </>
  );
}

export default CreditNote;
