import React, { useState, useEffect } from 'react';
import { Button, Card, Tabs } from 'components/ui';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import { useSelector } from 'react-redux';
import { convertDateToYMD } from 'components/validators';
import { apiCallstoreprocedure } from 'services/CommonService';
import TabContent from 'components/ui/Tabs/TabContent';
import TabList from 'components/ui/Tabs/TabList';
import TabNav from 'components/ui/Tabs/TabNav';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdArrowForward } from 'react-icons/io';
import { apiGetTelecastReport } from 'services/BillingService';
import {
  getGroupedDataFromJSONArray,
  hideCursorLoader,
  isChannelSelected,
  openNotification,
  showCursorLoader,
} from 'views/Controls/GLOBALFUNACTION';
import { apiGetspottypemasterdrop } from 'services/DealServices';
import DebouncedInput from 'views/Controls/DebouncedInput';
import { AxiosError } from 'axios';
import './telecastCertificate.css';
import Loader from 'views/Controls/Loader';
import SelectChannelDialog from 'views/Controls/SelectChannelDialog';
import {
  ntcTelecastCertificateRouteTitle,
  telecastCertificateRouteTitle,
} from 'configs/routes.config';
import SelectXs from 'views/Controls/SelectXs/SelectXs';
import SelectableTable from '../BillPrinting/components/SelectableTable';
import { generateTelecastCertificateForTCPage } from '../BillPrinting/pdfDefinations/pdfGeneratorORG';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function TelecastCertificate() {
  /* REDUX STATES */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const loginId = useSelector((state) => state.auth.session.LoginId);
  const token = useSelector((state) => state.auth.session.token);
  const currentRouteTitle = useSelector(
    (state) => state.base.common.currentRouteTitle,
  );

  /* STATES */
  const [datesRange, setDatesRange] = useState([null, null]);
  const [baseFilterTables, setBaseFilterTables] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [bills, setBills] = useState(null);
  const [spotTypes, setSpotTypes] = useState(null);
  const [selectedspotTypes, setSelectedSpotTypes] = useState(null);

  // UI States
  const [showLoader, setShowLoader] = useState(false);
  const [curTab, setCurTab] = useState('agency');

  /* USE EFFECTS */
  useEffect(() => {
    try {
      (async (values) => {
        const SpotType = await apiGetspottypemasterdrop(values);
        const formattedOptions = SpotType.data.map((option) => ({
          value: option.SpotTypeCode,
          label: option.SpotTypeName,
        }));
        setSpotTypes(formattedOptions);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      (async () => {
        if (datesRange && datesRange[0] && datesRange[1]) {
          hideStackedSideNav_secondary();
          setShowLoader(true);
          setBaseFilterTables({
            agencyTable: await getBaseFilterTableData('agency'),
            clientTable: await getBaseFilterTableData('client'),
            bookingTable: await getBaseFilterTableData('booking'),
          });
          setShowLoader(false);
        }
      })();
    } catch (error) {
      console.error(error);
    }
  }, [datesRange]);

  useEffect(() => {
    try {
      resetState();
    } catch (error) {
      console.error(error);
    }
  }, [channel]);

  /* EVENT HANDLERS */
  const handleDownloadTCs = async () => {
    try {
      showCursorLoader();
      let param = {
        loginCode: loginId,
        locationCode: channel.LocationCode,
        fromDate: convertDateToYMD(datesRange[0]),
        uptoDate: convertDateToYMD(datesRange[1]),
        channelCode: channel.ChannelCode,
        SpotTypeCode: selectedspotTypes.map((row) => row.value).join(','),
      };
      if ('BookingCode' in selectedRows[0]) {
        param.filter = selectedRows.map((row) => row.BookingNumber).join(',');
        param.id = 3;
      } else if ('AgencyCode' in selectedRows[0]) {
        param.filter = selectedRows.map((row) => row.AgencyCode).join(',');
        param.id = 1;
      } else if ('ClientCode' in selectedRows[0]) {
        param.filter = selectedRows.map((row) => row.ClientCode).join(',');
        param.id = 2;
      }
      let response = null;
      if (currentRouteTitle === telecastCertificateRouteTitle) {
        response = await apiGetTelecastReport(param, token);
      } else if (currentRouteTitle === ntcTelecastCertificateRouteTitle) {
        // response = await apiGetInvoiceNTC(param, token);
      }
      if (response) {
        let responseData = [];
        if (response.status === 200 && response.data.length > 0)
          responseData = response.data;
        else if (response.status !== 204) {
          openNotification(
            'danger',
            `Something went wrong. Server responded with status code ${response.status}.`,
          );
        }
        if (responseData.length > 0) {
          await downloadTCs(
            responseData.map((row) => ({
              ...row,
              TelecastDate: row.ScheduleDate,
              DurInSec: row.CommercialDuration,
              BookingSpotRate: 0,
              BillSpotAmount: 0,
            })),
          );
        } else {
          openNotification(
            'info',
            `No telecast certificates found for selected ${curTab === 'agency'
              ? 'agencies'
              : curTab === 'client'
                ? 'clients'
                : 'bookings'
            }`,
          );
        }
      } else {
        openNotification(
          'danger',
          `Something went wrong while downloading telecast certificates`,
        );
      }
    } catch (error) {
      console.error(error);
      openNotification(
        'danger',
        'Something went wrong while downloading telecast certificates',
      );
    } finally {
      hideCursorLoader();
    }
  };

  /* HELPER FUNCTIONS */
  const getBaseFilterTableData = async (type) => {
    try {
      let param = {
        location: channel.LocationCode,
        channel: channel.ChannelCode,
        fromDate: convertDateToYMD(datesRange[0]),
        todate: convertDateToYMD(datesRange[1]),
        Flag: null,
        IsNTC: 0,
        SpotTypeCode: selectedspotTypes.map((row) => row.value).join(','),
      };
      console.log(param);
      if (type === 'agency') {
        param.Flag = 1;
      } else if (type === 'client') {
        param.Flag = 2;
      } else if (type === 'booking') {
        param.Flag = 3;
      }
      let response = await apiCallstoreprocedure('usp_BookingTC_List', param);
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 204) {
        return [];
      } else {
        openNotification(
          'danger',
          `Something went wrong. Server responded with status code ${response.status}.`,
        );
        throw new Error(
          `Response status code: ${response.status}. Response: ${response}`,
        );
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        openNotification(
          'danger',
          `Something went wrong. Server responded with status code ${error.response.status}`,
        );
      }
      throw error;
    }
  };

  const downloadTCs = async (tableData) => {
    const groupedData = getGroupedDataFromJSONArray(
      tableData,
      curTab === 'agency'
        ? 'AgencyName'
        : curTab === 'client'
          ? 'ClientName'
          : 'BookingNumber',
    );
    const groups = Object.keys(groupedData);
    let headerDetails = {
      fromDate: datesRange[0],
      toDate: datesRange[1],
    };
    if (curTab === 'booking') {
      headerDetails = {
        ...headerDetails,
        companyName: tableData[0].EntityName,
        address: tableData[0].CorpAddress,
        agencyName: tableData[0].AgencyName,
        agencyAddress: tableData[0].BillingAddress1,
        clientName: tableData[0].ClientName,
        spotType: tableData[0].SpotType,
      };
      const pdf = await generateTelecastCertificateForTCPage(
        tableData,
        headerDetails,
      );
      pdf.download(`Bookings-Telecast-Certificate.pdf`);
    } else if (groups.length === 1) {
      headerDetails = {
        ...headerDetails,
        companyName: tableData[0].EntityName,
        address: tableData[0].CorpAddress,
        agencyName: tableData[0].AgencyName,
        agencyAddress: tableData[0].BillingAddress1,
        clientName: tableData[0].ClientName,
        spotType: tableData[0].SpotType,
      };
      const pdf = await generateTelecastCertificateForTCPage(
        tableData,
        headerDetails,
      );
      pdf.download(`${groups[0]}-Telecast-Certificate.pdf`);
    } else if (groups.length > 1) {
      const zip = new JSZip();
      for (let key of groups) {
        headerDetails = {
          ...headerDetails,
          companyName: groupedData[key][0].EntityName,
          address: groupedData[key][0].CorpAddress,
          agencyName: groupedData[key][0].AgencyName,
          agencyAddress: groupedData[key][0].BillingAddress1,
          clientName: groupedData[key][0].ClientName,
          contentName: groupedData[key][0].ContentName,
          spotType: groupedData[key][0].SpotType,
        };
        const pdf = await generateTelecastCertificateForTCPage(
          groupedData[key],
          headerDetails,
        );
        const pdfBlob = await new Promise((resolve) => pdf.getBlob(resolve));
        zip.file(`${key}-Telecast-Certificate.pdf`, pdfBlob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'Telecast-Certificates.zip');
    }
  };

  const resetState = () => {
    try {
      setDatesRange([null, null]);
      setBaseFilterTables(null);
      setGlobalFilter('');
      setSelectedRows([]);
      setBills(null);
      setShowLoader(false);
      setCurTab('agency');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      className="h-full"
      bodyClass="h-full py-3 px-0 flex flex-col"
      bordered={false}
    >
      <div className="flex items-center justify-between gap-6 border-b border-gray-700 pb-3 px-4 mb-2">
        <h4>Telecast Certificate</h4>
        <div className="grow flex justify-end items-center gap-3">
          <SelectXs
            isMulti={true}
            size="sm"
            placeholder="Select Spot Type"
            className="min-w-[50%]"
            options={spotTypes}
            onChange={(e) => setSelectedSpotTypes(e)}
          />
          <DatePickerRange
            placement="bottom-end"
            className="w-max"
            size="sm"
            placeholder="Select dates range"
            onChange={(dateRange) => setDatesRange(dateRange)}
            value={datesRange}
            disabled={!isChannelSelected(channel)}
          />
        </div>
      </div>
      <div className="grow h-0 px-4">
        {isChannelSelected(channel) ? (
          <>
            {datesRange && datesRange[0] && datesRange[1] ? (
              <>
                {baseFilterTables && !bills && (
                  <div className="h-full">
                    <Tabs
                      variant="pill"
                      defaultValue="agency"
                      onChange={(event) => {
                        setCurTab(event);
                        setGlobalFilter('');
                        setSelectedRows([]);
                      }}
                      className="h-full flex flex-col"
                    >
                      <div className="flex justify-between items-center">
                        <TabList>
                          <TabNav value="agency">Agency</TabNav>
                          <TabNav value="client">Client</TabNav>
                          <TabNav value="booking">Booking</TabNav>
                        </TabList>
                        <DebouncedInput
                          value={globalFilter ?? ''}
                          className="w-60"
                          size="sm"
                          prefix={<HiOutlineSearch className="text-md" />}
                          placeholder="Search"
                          onChange={(value) => setGlobalFilter(String(value))}
                          showSearchLabel={false}
                          marginBottom="mb-0"
                        />
                      </div>
                      <hr className="mt-2" />
                      <div className="mt-3 grow">
                        {curTab === 'agency' && (
                          <TabContent value="agency" className="h-full">
                            {baseFilterTables.agencyTable.length > 0 ? (
                              <SelectableTable
                                tableColumns={[
                                  {
                                    header: 'Agency Name',
                                    accessorKey: 'AgencyName',
                                  },
                                ]}
                                data={baseFilterTables.agencyTable}
                                globalFilter={globalFilter}
                                setGlobalFilter={setGlobalFilter}
                                setSelectedRows={setSelectedRows}
                                footerAction={
                                  <Button
                                    variant="solid"
                                    icon={<IoMdArrowForward />}
                                    size="sm"
                                    disabled={selectedRows.length === 0}
                                    onClick={handleDownloadTCs}
                                  >
                                    Download Telecast Certificate
                                  </Button>
                                }
                                type="home"
                              />
                            ) : (
                              <div className="h-full flex justify-center items-center">
                                No agencies found
                              </div>
                            )}
                          </TabContent>
                        )}
                        {curTab === 'client' && (
                          <TabContent value="client" className="h-full">
                            {baseFilterTables.clientTable.length > 0 ? (
                              <SelectableTable
                                tableColumns={[
                                  {
                                    header: 'Client Name',
                                    accessorKey: 'ClientName',
                                  },
                                ]}
                                data={baseFilterTables.clientTable}
                                globalFilter={globalFilter}
                                setGlobalFilter={setGlobalFilter}
                                selectedRows={selectedRows}
                                setSelectedRows={setSelectedRows}
                                footerAction={
                                  <Button
                                    variant="solid"
                                    icon={<IoMdArrowForward />}
                                    size="sm"
                                    disabled={selectedRows.length === 0}
                                    onClick={handleDownloadTCs}
                                  >
                                    Download Telecast Certificate
                                  </Button>
                                }
                                type="home"
                              />
                            ) : (
                              <div className="h-full flex justify-center items-center">
                                No clients found
                              </div>
                            )}
                          </TabContent>
                        )}
                        {curTab === 'booking' && (
                          <TabContent value="booking" className="h-full">
                            {baseFilterTables.bookingTable.length > 0 ? (
                              <SelectableTable
                                tableColumns={[
                                  {
                                    header: 'Booking Number',
                                    accessorKey: 'BookingCode',
                                  },
                                ]}
                                data={baseFilterTables.bookingTable}
                                globalFilter={globalFilter}
                                setGlobalFilter={setGlobalFilter}
                                selectedRows={selectedRows}
                                setSelectedRows={setSelectedRows}
                                footerAction={
                                  <Button
                                    variant="solid"
                                    icon={<IoMdArrowForward />}
                                    size="sm"
                                    disabled={selectedRows.length === 0}
                                    onClick={handleDownloadTCs}
                                  >
                                    Download Telecast Certificate
                                  </Button>
                                }
                                type="home"
                              />
                            ) : (
                              <div className="h-full flex justify-center items-center">
                                No bookings found
                              </div>
                            )}
                          </TabContent>
                        )}
                      </div>
                    </Tabs>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex justify-center items-center">
                Please select date range to view telecast certificates
              </div>
            )}
          </>
        ) : (
          <div className="h-full flex justify-center items-center">
            Please select a channel to view telecast certificates
          </div>
        )}
      </div>
      <SelectChannelDialog />
      <Loader showLoader={showLoader} />
    </Card>
  );
}

export default TelecastCertificate;
