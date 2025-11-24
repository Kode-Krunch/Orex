import {
  Avatar,
  Badge,
  Button,
  Card,
  DatePicker,
  Dialog,
  Input,
  Table,
  Tabs,
  Tooltip,
} from 'components/ui';
import React, { useEffect, useState } from 'react';
import { hideStackedSideNav } from 'views/Scheduling/general';
import BillingTable from './BillingTable';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { GetAgency, GetBooking, GetClient, GetSponsor } from 'views/Controls/APICALL';
import { useSelector } from 'react-redux';
import { convertDateToYMD } from 'components/validators';
import { getRandomColorClass } from './dtat';
import {
  apiCallSponsorSP,
  apiCallstoreprocedure,
  apiCallstoreprocedureRRR,
} from 'services/CommonService';
import {
  CurrencyFormatter,
  FORMATDATE_FOR_EVERY,

  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { MdInfoOutline } from 'react-icons/md';
import { GRAY_300 } from 'views/Controls/Dashboard/constants/tw_colors';
import { FaFileInvoice } from 'react-icons/fa';
import { StickyFooter } from 'components/shared';

const getColor = (itemType) => {
  switch (itemType) {
    case 'Slot Revenue':
      return 'blue-500';
    case 'Secondary Revenue':
      return 'emerald-500';
    case 'Program Revenue':
      return 'red-500';
    case 'RODP Revenue':
      return 'yellow-500';
    default:
      return 'gray-500'; // Default color
  }
};
const TABLE_COLUMNS = [
  {
    header: 'Invoice No',
    accessorKey: 'InvoiceNumber',
  },

  {
    header: 'Invoice Date',
    accessorKey: 'InvoiceOnDate',
    cell: (props) => {
      const row = props.row.original;
      const formattedDate = new Date(row.InvoiceOnDate).toLocaleDateString(
        'en-US',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      );
      return <span>{formattedDate}</span>;
    },
  },
  {
    header: 'Due Date',
    accessorKey: 'DueDate',
    cell: (props) => {
      const row = props.row.original;
      const formattedDate = new Date(row.DueDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      return <span>{formattedDate}</span>;
    },
  },
  {
    header: 'Deal No',
    accessorKey: 'DealCode',
  },
  {
    header: 'Booking No',
    accessorKey: 'BookingCode',
  },
  {
    header: 'Sales Executive',
    accessorKey: 'Executive',
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
    header: 'Brand',
    accessorKey: 'BrandName',
  },
  {
    header: 'Zone',
    accessorKey: 'ZoneName',
  },
  {
    header: 'Gross Amt',
    accessorKey: 'GrossAmount',
    cell: (props) => {
      const row = props.row.original;
      // CurrencySymbol;
      return (
        <span>
          <CurrencyFormatter
            amountString={row.CurrencySymbol + '' + row.GrossAmount}
          />
        </span>
      );
    },
  },
  {
    header: 'CGST',
    accessorKey: 'Tax1Percent',
  },
  {
    header: 'SGST',
    accessorKey: 'Tax2Percent',
  },
  {
    header: 'IGST',
    accessorKey: 'Tax3Percent',
  },
  {
    header: 'Payable Amt',
    accessorKey: 'CompanyNetAmount',
    cell: (props) => {
      const row = props.row.original;
      // CurrencySymbol;
      return (
        <span>
          <CurrencyFormatter
            amountString={row.CurrencySymbol + '' + row.CompanyNetAmount}
          />
        </span>
      );
    },
  },
];
const TABLE_COLUMNS_InvoiceDetails = [
  {
    header: 'Invoice No',
    accessorKey: 'InvoiceNumber',
  },

  {
    header: 'Invoice Date',
    accessorKey: 'InvoiceDate',
    cell: (props) => {
      const row = props.row.original;
      const formattedDate = new Date(row.InvoiceDate).toLocaleDateString(
        'en-US',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      );
      return <span>{formattedDate}</span>;
    },
  },

  {
    header: 'Commercial Caption',
    accessorKey: 'CommercialCaption',
  },
  {
    header: 'TelecastDate',
    accessorKey: 'TelecastDate',
    cell: (props) => {
      const row = props.row.original;
      const formattedDate = new Date(row.TelecastDate).toLocaleDateString(
        'en-US',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      );
      return <span>{formattedDate}</span>;
    },
  },
  {
    header: 'TelecastTime',
    accessorKey: 'TelecastTime',
    cell: (props) => {
      const row = props.row.original;
      const formattedDate = new Date(row.TelecastTime).toLocaleDateString(
        'en-US',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      );
      return <span>{formattedDate}</span>;
    },
  },
  {
    header: 'Program',
    accessorKey: 'ProgramName',
  },
  {
    header: 'DurInSec',
    accessorKey: 'DurInSec',
  },
  {
    header: 'SpotRate',
    accessorKey: 'SpotRate',
  },
  {
    header: 'SpotAmount',
    accessorKey: 'SpotAmount',
  },
];
const TABLE_COLUMNS_Invoice_TAX_Details = [
  {
    header: 'Invoice No',
    accessorKey: 'InvoiceNumber',
  },

  {
    header: 'Invoice Date',
    accessorKey: 'InvoiceDate',
    cell: (props) => {
      const row = props.row.original;
      const formattedDate = new Date(row.InvoiceDate).toLocaleDateString(
        'en-US',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      );
      return <span>{formattedDate}</span>;
    },
  },
  {
    header: 'TaxName',
    accessorKey: 'TaxName',
  },

  {
    header: 'Tax Percentage',
    accessorKey: 'TaxPercentage',
  },
];
const { TabNav, TabList, TabContent } = Tabs;
const { Tr, Th, Td, THead, TBody } = Table;
var BillFilterType = 1;

const Clientcol = [
  {
    header: 'Client Name',
    accessorKey: 'ClientName',
  },
];

const Agencycol = [
  {
    header: 'Agency Name',
    accessorKey: 'AgencyName',
  },
];
const Dealcol = [
  {
    header: 'Deal',
    accessorKey: 'DealCode',
  },
];
const Bookingcol = [
  {
    header: 'Booking Code',
    accessorKey: 'BookingCode',
  },
];
// const Sponsorcol = [
//   {
//     header: 'Sponsor',
//     accessorKey: 'SponsorName',
//   },
// ];
const Sponsorcol = [
  { header: 'Deal Code', accessorKey: 'DealCode' },
  { header: 'Agency Name', accessorKey: 'AgencyName' },
  { header: 'Client Name', accessorKey: 'ClientName' },
  { header: 'Sponsor Deal No', accessorKey: 'SponsorDealNumber' },
]

const BillGeneration = () => {
  const currentHref = window.location.href; // Get the full URL
  const hashPart = currentHref.split('#')[1]; // Get the part after the '#'
  const spotBooking = hashPart ? hashPart.split('/')[1] : ''; // Extract "SpotBooking"

  const Channel = useSelector((state) => state.locale.selectedChannel);
  const Username = useSelector((state) => state.auth.session.Username);
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const [showLoader, setshowLoader] = useState(false);
  const [ViewDataColumns] = useState(getTableColumnsWithActions());
  const [Client, setClient] = useState([]);
  const [Agency, setAgency] = useState([]);
  const [Booking, setBooking] = useState([]);
  const [Sponsor, setSponsor] = useState([]);
  const [Deal, setDeal] = useState([]);
  const [FromToDate, setFromToDate] = useState([null, null]);
  const [SummaryShow, setSummaryShow] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [InvoiceDate, setInvoiceDate] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [SummaryShowData, setSummaryShowData] = useState([]);
  const [ClientList, setClientList] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [counts, setCounts] = useState({
    clientNames: {},
    brandNames: {},
    programNames: {},
    totalDuration: 0,
    totalGrossAmount: 0,
    totalCompanyNetAmount: 0,
    totalTaxAmount: 0,
  });

  const [dialogIsOpen, setIsOpen] = useState(true);
  const [BillTableShow, setBillTableShow] = useState(false);
  const [BillTableData, setBillTableData] = useState([]);
  const [BillGenerationClickRow, setBillGenerationClickRow] = useState({});
  const [ShowDetail_or_Tax, setShowDetail_or_Tax] = useState('');
  const [activeTab, setActiveTab] = useState("1");

  const columns = [
    {
      header: 'Deal Number',
      accessorKey: 'DealNumber',
    },
    {
      header: 'Client Name',
      accessorKey: 'ClientName',
    },
    {
      header: 'Amount',
      accessorKey: 'Amount',
    },
  ];

  function getTableColumnsWithActions() {
    try {
      return [
        {
          header: 'Action',
          accessorKey: 'action',
          actions: [
            {
              action: (rowIndex, rowData) => (
                <div className="flex items-center">
                  <Tooltip title="View Invoice Details" key={rowIndex}>
                    <Button
                      size="xs"
                      variant="plain"
                      shape="circle"
                      className="mr-2"
                      icon={<FaFileInvoice color={GRAY_300} />}
                      onClick={() => {
                        setBillTableShow(true);
                        setShowDetail_or_Tax('Invoice Details');
                        setBillGenerationClickRow(rowData);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="View Invoice Tax Detail" key={rowIndex}>
                    <Button
                      size="xs"
                      variant="plain"
                      shape="circle"
                      icon={<MdInfoOutline color={GRAY_300} />}
                      onClick={() => {
                        setBillTableShow(true);
                        setShowDetail_or_Tax('Invoice Tax Detail');
                        setBillGenerationClickRow(rowData);
                      }}
                    />
                  </Tooltip>
                </div>
              ),
            },
          ],
        },
        ...TABLE_COLUMNS,
      ];
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

    if (BillGenerationClickRow && ShowDetail_or_Tax == 'Invoice Details') {
      // alert('Details');
      functionBillTableData(
        BillGenerationClickRow?.InvoiceNumber,
        SummaryShowData.InvoiceDetailsDisplay,
      );
    }
    if (BillGenerationClickRow && ShowDetail_or_Tax == 'Invoice Tax Detail') {
      // alert('Tax');
      functionBillTableData(
        BillGenerationClickRow?.InvoiceNumber,
        SummaryShowData.InvoiceTaxDetailDisplay,
      );
    }
  }, [BillGenerationClickRow, ShowDetail_or_Tax]);

  const functionBillTableData = (InvoiceNumber, DetailDisplay) => {
    const filterData = DetailDisplay?.filter(
      (item) => item.InvoiceNumber == InvoiceNumber,
    );
    if (filterData.length == 0) {
      openNotification('warning', ShowDetail_or_Tax + 'Not Found!');
      return;
    }
    setBillTableData(filterData);
  };

  const GenrateApi = async () => {
    setshowLoader(true);
    try {
      const resp = await apiCallstoreprocedure(
        'usp_Billing_BillGenerationSave',
        { AddedBy: `${LoginId}` },
      );
      console.log(resp);
      if (resp.status == 200) {
        openNotification('success', 'Bill Generated Succesfully');
        setshowLoader(false);
        setSummaryShow(true);
        setInvoiceDate(null);
        setClient([]);
        setAgency([]);
        setBooking([]);
        setSelectedRows([]);
        setFromToDate([null, null]);
        setClientList([]);
        setBillTableShow(false);
        setBillTableData([]);
        setBillGenerationClickRow({});
        setShowDetail_or_Tax('');
        setCounts({
          clientNames: {},
          brandNames: {},
          programNames: {},
          totalDuration: 0,
          totalGrossAmount: 0,
          totalCompanyNetAmount: 0,
        });
      }
    } catch (error) {
      if (error.response.status == 500) {
        openNotification('danger', 'Server Error.');
        setshowLoader(false);
        setSummaryShow(true);
        setInvoiceDate(null);
        setClient([]);
        setAgency([]);
        setBooking([]);
        setSelectedRows([]);
        setFromToDate([null, null]);
        setClientList([]);
        setCounts({
          clientNames: {},
          brandNames: {},
          programNames: {},
          totalDuration: 0,
          totalGrossAmount: 0,
          totalCompanyNetAmount: 0,
        });
      }
    }
  };

  useEffect(() => {
    const processCounts = () => {
      const clientNames = {};
      const brandNames = {};
      const programNames = {};
      let totalDuration = 0;
      let totalGrossAmount = 0;
      let totalCompanyNetAmount = 0;

      SummaryShowData.InvoiceMasterDisplay?.forEach((invoice) => {
        clientNames[invoice.ClientName] =
          (clientNames[invoice.ClientName] || 0) + 1;
        brandNames[invoice.BrandName] =
          (brandNames[invoice.BrandName] || 0) + 1;
        setCurrencySymbol(invoice.CurrencySymbol);
      });
      const calculateTotalTax = (data) => {

        const total = data.reduce((sum, invoice) => {
          const { CompanyNetAmount, Tax3Percent, Tax2Percent, Tax1Percent } =
            invoice;
          return (
            sum +
            CompanyNetAmount * (Tax3Percent + Tax2Percent + Tax1Percent) * 0.01
          );
        }, 0);
        return Math.floor(total);
      };
      let totalTaxAmount = 0;
      if (SummaryShowData?.InvoiceMasterDisplay?.length > 0) {
        totalTaxAmount = calculateTotalTax(
          SummaryShowData.InvoiceMasterDisplay,
        );

      }

      SummaryShowData.InvoiceDetailsDisplay?.forEach((detail) => {
        programNames[detail.ProgramName] =
          (programNames[detail.ProgramName] || 0) + 1;
      });
      SummaryShowData.InvoiceDetailsDisplay?.forEach((detail) => {
        const { DurInSec } = detail;
        totalDuration += DurInSec;
      });
      SummaryShowData.InvoiceMasterDisplay?.forEach((detail) => {
        const { GrossAmount } = detail;
        totalGrossAmount += GrossAmount;
      });
      SummaryShowData.InvoiceMasterDisplay?.forEach((detail) => {
        const { CompanyNetAmount } = detail;
        totalCompanyNetAmount += CompanyNetAmount;
      });

      const uniqueClientCount = Object.keys(clientNames).length;
      const uniqueBrandNameCount = Object.keys(brandNames).length;
      const uniqueProgramNameCount = Object.keys(programNames).length;

      setCounts({
        clientNames,
        brandNames,
        programNames,
        totalDuration,
        uniqueClientCount,
        uniqueBrandNameCount,
        uniqueProgramNameCount,
        totalGrossAmount,
        totalCompanyNetAmount,
        totalTaxAmount,
      });
    };

    processCounts();

    const sortedData = SummaryShowData.InvoiceMasterDisplay?.sort(
      (a, b) => b.GrossAmount - a.GrossAmount,
    );
    setClientList(sortedData);
  }, [SummaryShowData]);

  const fetchSponsorData = async () => {
    try {
      const Sponsor = await GetSponsor(
        Channel.ChannelCode,
        Channel.LocationCode,
        FromToDate[0],
        FromToDate[1],
        5,
        spotBooking == 'BillGeneration' || spotBooking == '/BillGeneration'
          ? 0
          : 1,
      );
      setSponsor(Sponsor);
    } catch (error) {
      console.error('Error fetching', error);
    }
  };

  useEffect(() => {
    hideStackedSideNav();
    console.log(spotBooking);
    const fetchClientData = async () => {
      try {
        const Client = await GetClient(
          Channel.ChannelCode,
          Channel.LocationCode,
          FromToDate[0],
          FromToDate[1],
          2,
          spotBooking == 'BillGeneration' ||
            spotBooking == '/BillGeneration' ||
            spotBooking == '/BillGeneration'
            ? 0
            : 1,
        );
        setClient(Client);
      } catch (error) {
        console.error('Error fetching', error);
      }
    };

    const fetchAgencyData = async () => {
      try {
        const Agency = await GetAgency(
          Channel.ChannelCode,
          Channel.LocationCode,
          FromToDate[0],
          FromToDate[1],
          1,
          spotBooking == 'BillGeneration' || spotBooking == '/BillGeneration'
            ? 0
            : 1,
        );
        setAgency(Agency);
      } catch (error) {
        console.error('Error fetching', error);
      }
    };

    const fetchBookingData = async () => {
      try {
        const Booking = await GetBooking(
          Channel.ChannelCode,
          Channel.LocationCode,
          FromToDate[0],
          FromToDate[1],
          3,
          spotBooking == 'BillGeneration' || spotBooking == '/BillGeneration'
            ? 0
            : 1,
        );
        setBooking(Booking);
      } catch (error) {
        console.error('Error fetching', error);
      }
    };
    const fetchDealData = async () => {
      try {
        const Deal = await GetBooking(
          Channel.ChannelCode,
          Channel.LocationCode,
          FromToDate[0],
          FromToDate[1],
          4,
          spotBooking == 'BillGeneration' || spotBooking == '/BillGeneration'
            ? 0
            : 1,
        );
        setDeal(Deal);
      } catch (error) {
        console.error('Error fetching', error);
      }
    };

    if (FromToDate[0] && FromToDate[1] && InvoiceDate) {
      fetchClientData();
      fetchAgencyData();
      fetchBookingData();
      fetchDealData();
      //fetchSponsorData();
    }
  }, [FromToDate[0], FromToDate[1], InvoiceDate]);

  // const SummaryShowApi = async () => {
  const Filter = selectedRows.map((item) =>
    parseInt(
      item.ClientCode ||
      item.AgencyCode ||
      item.BookingNumber ||
      item.DealNumber,
      10,
    ),
  );
  const FilterDeal = selectedRows.map((item) =>
    parseInt(
      item.DealNumber,
    ),
  );
  const formattedCodes = `(${Filter.join(', ')})`;
  const filterformattedDealNumber = `(${FilterDeal.join(', ')})`;
  console.log(filterformattedDealNumber);

  //   const fetchData = async () => {
  //     try {
  //       const billdata = await apiCallstoreprocedureRRR(
  //         Channel.ChannelCode,
  //         Channel.LocationCode,
  //         convertDateToYMD(FromToDate[0]),
  //         convertDateToYMD(FromToDate[1]),
  //         convertDateToYMD(InvoiceDate),
  //         `${formattedCodes}`,
  //         BillFilterType,
  //         LoginId,
  //         spotBooking == 'BillGeneration' || spotBooking == '/BillGeneration'
  //           ? 0
  //           : 1,
  //       );
  //       console.log('billdata', billdata);
  //       setSummaryShowData(billdata.data);
  //       setSummaryShow(false);
  //     } catch (error) {
  //       console.error('Error fetching', error);
  //     }
  //   };
  //   console.log(fetchData());
  // };
  const SummaryShowApi = async (mode = "default") => {
    try {
      setshowLoader(true);

      let response;

      if (mode === "sponsor") {
        // 🟢 Call Sponsor SP
        response = await apiCallSponsorSP(
          Channel.ChannelCode,
          Channel.LocationCode,
          convertDateToYMD(FromToDate[0]),
          convertDateToYMD(FromToDate[1]),
          convertDateToYMD(InvoiceDate),
          `${filterformattedDealNumber}`,
          '4',
          LoginId,
          spotBooking == 'BillGeneration' || spotBooking == '/BillGeneration'
            ? 0
            : 1,
        );
      } else {
        // 🟢 Call existing SP
        response = await apiCallstoreprocedureRRR(
          Channel.ChannelCode,
          Channel.LocationCode,
          convertDateToYMD(FromToDate[0]),
          convertDateToYMD(FromToDate[1]),
          convertDateToYMD(InvoiceDate),
          `${formattedCodes}`,
          BillFilterType,
          LoginId,
          spotBooking == 'BillGeneration' || spotBooking == '/BillGeneration'
            ? 0
            : 1,
        );
      }

      if (response.status === 200) {
        openNotification("success", "Bill generated successfully");
        //console.log("Response:", response);
        console.log('response', response);
        setSummaryShowData(response.data);
        setSummaryShow(false);
      } else {
        openNotification("warning", "No data returned");
      }
    } catch (error) {
      openNotification("danger", "Error generating bill");
      console.error(error);
    } finally {
      setshowLoader(false);
    }
  };

  const onDialogClose = (e) => {
    setIsOpen(false);
  };

  const onDialogOk = (e) => {
    if (FromToDate[0] && FromToDate[1] && InvoiceDate) {
      setIsOpen(false);
    } else {
      openNotification('danger', 'Select Bill Period & Invoice Date ');
    }
  };

  const [BillGenerationmanagedColumns, setBillGenerationManagedColumns] =
    useState([]);
  const [ManagedColumnInvoiceDetails, setManagedColumnInvoiceDetails] =
    useState([]);
  return (
    <>
      <Loader showLoader={showLoader} />
      <Dialog
        isOpen={BillTableShow}
        width={1000}
        height={600}
        onClose={() => setBillTableShow(false)}
      >
        {' '}
        {/* <div className="flex flex-col h-full justify-between"> */}
        <h5 className="mb-4">{ShowDetail_or_Tax}</h5>
        <div className="max-h-[500px] overflow-y-auto">
          <ReportsTable
            tableData={BillTableData}
            originalColumns={
              ShowDetail_or_Tax == 'Invoice Details'
                ? TABLE_COLUMNS_InvoiceDetails
                : TABLE_COLUMNS_Invoice_TAX_Details
            }
            managedColumns={ManagedColumnInvoiceDetails}
            setManagedColumns={setManagedColumnInvoiceDetails}
            exportFileName="Bill Generation Details"
            columnsToFormatInINR={[]}
          />
        </div>
        {/* </div> */}
      </Dialog>
      <Card
        header={<HeaderExtra />}
        headerExtra={
          <div className="flex items-center ">
            <div className="mr-2">
              <p>
                Bill Period <span className="text-red-500">*</span>
              </p>
              <DatePickerRange
                maxDate={new Date()}
                value={FromToDate}
                placeholder="Select Billing Period."
                size="sm"
                onChange={(e) => setFromToDate(e)}
              />
            </div>
            <div className="">
              <p>
                Invoice Date <span className="text-red-500">*</span>
              </p>
              <DatePicker
                maxDate={
                  new Date(new Date().setDate(new Date().getDate() + 30))
                }
                value={InvoiceDate}
                placeholder="Select Invoice Date"
                size="sm"
                onChange={(e) => setInvoiceDate(e)}
              />
            </div>
          </div>
        }
        className="h-[90vh] flex flex-col"
        bodyClass="grow"
      >
        {FromToDate[0] && FromToDate[1] && InvoiceDate ? (
          <>
            <div className={SummaryShow ? 'block' : ' hidden'}>
              {/* <Tabs
                defaultValue="1"
                variant="pill"
                onChange={(e) => {

                  if (e == "5") { fetchSponsorData() }
                }}
              > */}
              <Tabs
                defaultValue="1"
                variant="pill"
                onChange={(e) => { setActiveTab(e); if (e == "5") { fetchSponsorData() } }} // ✅ update state
              >

                <div className="flex justify-between items-center mx-5">
                  <TabList >
                    <TabNav value="1">Agency</TabNav>
                    <TabNav value="2">Client</TabNav>
                    <TabNav value="3">Booking</TabNav>
                    <TabNav value="4">Deal</TabNav>
                    <TabNav value="5">Sponsor</TabNav>
                  </TabList>
                  <div>
                    <Input
                      value={globalFilter ?? ''}
                      className=" solid"
                      placeholder="Search all columns..."
                      size="sm"
                      onChange={(e) => {
                        if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
                          setGlobalFilter(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <TabContent value="1">
                    <BillingTable
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      data={Agency}
                      SummaryShowApi={SummaryShowApi}
                      col={Agencycol}
                      globalFilter={globalFilter}
                      setGlobalFilter={setGlobalFilter}
                    />
                  </TabContent>
                  <TabContent value="2">
                    <BillingTable
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      data={Client}
                      SummaryShowApi={SummaryShowApi}
                      col={Clientcol}
                      globalFilter={globalFilter}
                      setGlobalFilter={setGlobalFilter}
                    />
                  </TabContent>
                  <TabContent value="3">
                    <BillingTable
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      data={Booking}
                      SummaryShowApi={SummaryShowApi}
                      col={Bookingcol}
                      globalFilter={globalFilter}
                      setGlobalFilter={setGlobalFilter}
                    />
                  </TabContent>
                  <TabContent value="4">
                    <BillingTable
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      data={Deal}
                      SummaryShowApi={SummaryShowApi}
                      col={Dealcol}
                      globalFilter={globalFilter}
                      setGlobalFilter={setGlobalFilter}
                    />
                  </TabContent>
                  <TabContent value="5">
                    <BillingTable
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      SummaryShowApi={SummaryShowApi}
                      data={Sponsor} // or whichever data array
                      col={columns}
                      globalFilter={globalFilter}
                      setGlobalFilter={setGlobalFilter}
                      activeTab={activeTab} // ✅ new prop
                    />
                  </TabContent>

                </div>
              </Tabs>
            </div>
            {/* <p>{SummaryShow}</p> */}
            <div className={SummaryShow ? ' hidden' : ' block'}>
              <Tabs defaultValue="Tab1" variant="pill">
                <TabList>
                  <TabNav value="Tab1">Generated Bill Summary</TabNav>
                  <TabNav value="Tab2">Generated Bill </TabNav>
                </TabList>
                <TabContent value="Tab1">
                  <div className="mt-2">
                    <div className="grid grid-cols-5 gap-2 mb-2">
                      <div
                        className="col-span-1 p-3 rounded-lg"
                        style={{ border: '1px solid #9c909085' }}
                      >
                        <h4 className="mb-2">Bill Summary</h4>
                        <div
                          className="p-2 rounded-lg flex justify-between mb-1"
                          style={{ background: '#D5E4FA' }}
                        >
                          <p style={{ color: '#000' }}>Bills</p>
                          <p
                            style={{
                              color: '#000',
                              padding: '2px 5px',
                              background: 'rgb(188, 210, 242)',
                              borderRadius: '10px',
                              fontWeight: 900,
                            }}
                          >
                            {SummaryShowData.InvoiceMasterDisplay?.length}
                          </p>
                        </div>
                        <div
                          className="p-2 rounded-lg flex justify-between mb-1"
                          style={{ background: '#E5D6FB' }}
                        >
                          <p style={{ color: '#000' }}>Clients</p>
                          <p
                            style={{
                              color: '#000',
                              padding: '2px 5px',
                              background: 'rgb(216, 193, 251)',
                              borderRadius: '10px',
                              fontWeight: 900,
                            }}
                          >
                            {counts?.uniqueClientCount}
                          </p>
                        </div>
                        <div
                          className="p-2 rounded-lg flex justify-between mb-1"
                          style={{ background: '#FBD4F5' }}
                        >
                          <p style={{ color: '#000' }}>Brands</p>
                          <p
                            style={{
                              color: '#000',
                              padding: '2px 5px',
                              background: 'rgb(251, 187, 241)',
                              borderRadius: '10px',
                              fontWeight: 900,
                            }}
                          >
                            {counts?.uniqueBrandNameCount}
                          </p>
                        </div>
                        <div
                          className="p-2 rounded-lg flex justify-between mb-1"
                          style={{ background: '#FFFDC7' }}
                        >
                          <p style={{ color: '#000' }}>Spots</p>
                          <p
                            style={{
                              color: '#000',
                              padding: '2px 5px',
                              background: 'rgb(255, 251, 143)',
                              borderRadius: '10px',
                              fontWeight: 900,
                            }}
                          >
                            {SummaryShowData.InvoiceDetailsDisplay?.length}
                          </p>
                        </div>
                        <div
                          className="p-2 rounded-lg flex justify-between mb-1"
                          style={{ background: '#E1F994' }}
                        >
                          <p style={{ color: '#000' }}>Program</p>
                          <p
                            style={{
                              color: '#000',
                              padding: '2px 5px',
                              background: 'rgb(201, 236, 88)',
                              borderRadius: '10px',
                              fontWeight: 900,
                            }}
                          >
                            {counts?.uniqueProgramNameCount}
                          </p>
                        </div>
                        <div
                          className="p-2 rounded-lg flex justify-between mb-1"
                          style={{ background: '#FD7178' }}
                        >
                          <p style={{ color: '#000' }}>FCT</p>
                          <p
                            style={{
                              color: '#000',
                              padding: '2px 5px',
                              background: 'rgba(249, 89, 97, 0.72)',
                              borderRadius: '10px',
                              fontWeight: 900,
                            }}
                          >
                            {counts?.totalDuration}
                          </p>
                        </div>
                      </div>
                      <div
                        className="col-span-2 p-3 rounded-lg"
                        style={{ border: '1px solid #9c909085' }}
                      >
                        <Tabs
                          defaultValue="tab4"
                          variant="pill"
                          style={{ height: 300, overflow: 'scroll' }}
                        >
                          <TabList>
                            <TabNav value="tab4">Top Client Bills</TabNav>
                            <TabNav value="tab5">Top Agencies Bills</TabNav>
                          </TabList>

                          <TabContent value="tab4">
                            <div className="mt-2">
                              <Table compact borderlessRow={false}>
                                <THead>
                                  <Tr>
                                    <Th>Client Name</Th>
                                    <Th>Gross Amount</Th>
                                  </Tr>
                                </THead>
                                <TBody>
                                  {ClientList?.map((item, key) => (
                                    <Tr>
                                      <Td className="flex items-center">
                                        <Avatar
                                          size="sm"
                                          shape="circle"
                                          className={`mr-2 dark:${getRandomColorClass()} ${getRandomColorClass()}`}
                                        >
                                          {item.ClientName.charAt(0)}
                                        </Avatar>
                                        {item.ClientName}
                                      </Td>
                                      <Td>
                                        {item.GrossAmount.toLocaleString(
                                          'en-IN',
                                        )}
                                      </Td>
                                    </Tr>
                                  ))}
                                </TBody>
                              </Table>
                            </div>
                          </TabContent>
                          <TabContent value="tab5">
                            <div className="mt-2">
                              <Table compact borderlessRow={false}>
                                <THead>
                                  <Tr>
                                    <Th>Agency Name</Th>
                                    <Th>Gross Amount</Th>
                                  </Tr>
                                </THead>
                                <TBody>
                                  {ClientList?.map((item, key) => (
                                    <Tr>
                                      <Td className="flex items-center">
                                        <Avatar
                                          size="sm"
                                          shape="circle"
                                          className={`mr-2 dark:${getRandomColorClass()} ${getRandomColorClass()}`}
                                        >
                                          {item.AgencyName.charAt(0)}
                                        </Avatar>
                                        {item.AgencyName}
                                      </Td>
                                      <Td>
                                        {item.GrossAmount.toLocaleString(
                                          'en-IN',
                                        )}
                                      </Td>
                                    </Tr>
                                  ))}
                                </TBody>
                              </Table>
                            </div>
                          </TabContent>
                        </Tabs>
                      </div>
                      <div className="col-span-1 ">
                        <div
                          className="col-span-1 p-3 rounded-lg mb-1"
                          style={{ border: '1px solid #9c909085' }}
                        >
                          <h4 className="mb-1">Revenue Details</h4>
                          <span className="font-semibold text-blue-500 text-2xl">
                            {currencySymbol}{' '}
                            {counts.totalGrossAmount.toLocaleString('en-IN')}
                          </span>
                          <p className="">Division Level Revenue</p>
                          {/* <div className='mt-2 mb-2' style={{ height: '1px', width: '100%', background: '#b7b5b524' }}></div> */}
                        </div>
                        <div
                          className="col-span-1 p-3 rounded-lg mb-1"
                          style={{ border: '1px solid #9c909085' }}
                        >
                          <h4 className="mb-1">Tax Details</h4>
                          <span className="font-semibold text-blue-500 text-2xl">
                            {currencySymbol}{' '}
                            {counts.totalTaxAmount.toLocaleString('en-IN')}.00
                          </span>
                          <p className="">Total Tax Amount</p>
                        </div>
                        <div
                          className="col-span-1 p-3 rounded-lg mb-1"
                          style={{ border: '1px solid #9c909085' }}
                        >
                          <h4 className="mb-1">Net Amount Details</h4>
                          <span className="font-semibold text-blue-500 text-2xl">
                            {currencySymbol}{' '}
                            {counts.totalCompanyNetAmount.toLocaleString(
                              'en-IN',
                            )}
                          </span>
                          <p className="">Total Net Amount</p>
                        </div>
                      </div>
                      <div
                        className="col-span-1 p-3 rounded-lg"
                        style={{ border: '1px solid #9c909085' }}
                      >
                        <h4 className="mb-2">Revenue Summary</h4>
                        <div className="px-2 mb-5">
                          {/* <h3>130</h3> */}
                          {/* <p>Total Revenue</p> */}
                        </div>
                        <div>
                          {SummaryShowData &&
                            SummaryShowData.tbl_billingsummary &&
                            SummaryShowData.tbl_billingsummary.map(
                              (item, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center px-2 border-b pb-3 border-inherit mt-3"
                                >
                                  <div className="flex items-center">
                                    <Badge
                                      className="mr-4"
                                      innerClass={`bg-${getColor(
                                        item.ItemType,
                                      )}`}
                                    />
                                    {item.ItemType}
                                  </div>
                                  <p>{item.Number}</p>
                                </div>
                              ),
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabContent>
                <TabContent value="Tab2">
                  <div className="mt-2">
                    <ReportsTable
                      tableData={SummaryShowData.InvoiceMasterDisplay}
                      originalColumns={ViewDataColumns}
                      managedColumns={BillGenerationmanagedColumns}
                      setManagedColumns={setBillGenerationManagedColumns}
                      exportFileName="Bill Generation"
                      columnsToFormatInINR={[]}
                    />
                  </div>
                </TabContent>
              </Tabs>{' '}
            </div>

            {!SummaryShow && (
              <StickyFooter
                className="-mx-8 px-12 flex items-center justify-end py-4 mt-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div>
                  <Button
                    size="sm"
                    onClick={() => {
                      setshowLoader(false);
                      setSummaryShow(true);
                      setInvoiceDate(null);
                      setClient([]);
                      setAgency([]);
                      setBooking([]);
                      setDeal([]);
                      setSelectedRows([]);
                      setFromToDate([null, null]);
                      setClientList([]);
                      setBillTableShow(false);
                      setBillTableData([]);
                      setBillGenerationClickRow({});
                      setShowDetail_or_Tax('');
                    }}
                  >
                    Discard
                  </Button>
                  <Button
                    className="ml-2"
                    size="sm"
                    variant="solid"
                    onClick={() =>
                      GenrateApi(SummaryShowData, Channel, spotBooking, LoginId)
                    }
                  >
                    Save
                  </Button>
                </div>
              </StickyFooter>
            )}
          </>
        ) : (
          <p className="h-full flex justify-center items-center">
            Please Select Date
          </p>
        )}
      </Card>
      <Dialog isOpen={dialogIsOpen} onClose={onDialogClose}>
        <h4 className="mb-2">Select Bill Generation Date</h4>
        <div className="flex items-center ">
          <div className="mr-2">
            <p>
              Bill Period <span className="text-red-500">*</span>
            </p>
            <DatePickerRange
              maxDate={new Date()}
              value={FromToDate}
              placeholder="Select Billing Period"
              size="sm"
              onChange={(e) => setFromToDate(e)}
            />
          </div>
          <div className="">
            <p>
              Invoice Date <span className="text-red-500">*</span>
            </p>
            <DatePicker
              maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
              value={InvoiceDate}
              placeholder="Select Invoice Date"
              size="sm"
              onChange={(e) => setInvoiceDate(e)}
            />
          </div>
        </div>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onDialogClose}
          >
            Cancel
          </Button>

          <Button variant="solid" onClick={onDialogOk}>
            Okay
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default BillGeneration;
