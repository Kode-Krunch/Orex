import { Button, Card, Input } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { apiGetYearMaster } from 'services/SalesAdminService';
import {
  isChannelSelected,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import AddInvoiceSeriesDialog from './components/AddInvoiceSeriesDialog';
import {
  apiGetInvoiceSeries,
  apiGetInvoiceSeriesNTC,
} from 'services/BillingService';
import InvoiceSeriesTable from './components/InvoiceSeriesTable';
import { FilterMatchMode } from 'primereact/api';
import './index.css';
import {
  billingSeriesRouteTitle,
  ntcBillingSeriesRouteTitle,
} from 'configs/routes.config';
import SelectChannelDialog from 'views/Controls/SelectChannelDialog';
import Loader from 'views/Controls/Loader';

/* COMPONENTS */
export const headerExtra = (
  setShowDialog,
  filters,
  setFilters,
  globalFilterValue,
  setGlobalFilterValue,
  isEditModeOn,
  channel,
) => {
  const onGlobalFilterChange = (e) => {
    try {
      if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <Input
        type="text"
        size="sm"
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        className="p-inputtext-sm"
        placeholder={`Search`}
        disabled={isEditModeOn}
      />
      <Button
        block
        variant="solid"
        size="sm"
        icon={<HiPlusCircle />}
        onClick={() => setShowDialog(true)}
        disabled={isEditModeOn || !isChannelSelected(channel)}
      >
        New Billing Series
      </Button>
    </div>
  );
};

function InvoiceSeries() {
  /* REDUX STATES */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);
  const currentRouteTitle = useSelector(
    (state) => state.base.common.currentRouteTitle,
  );

  /* STATES */
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [financialYears, setFinancialYears] = useState(null);
  const [financialYearOptions, setFinancialYearOptions] = useState(null);
  const [invoiceSeries, setInvoiceSeries] = useState(null);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (
        isChannelSelected(channel) &&
        (currentRouteTitle === billingSeriesRouteTitle ||
          currentRouteTitle === ntcBillingSeriesRouteTitle)
      ) {
        setShowLoader(true);
        getFinancialYears();
        getInvoiceSeries();
        setShowDialog(false);
        setGlobalFilterValue('');
        setShowLoader(false);
      }
    } catch (error) {
      console.error(error);
      setShowDialog(false);
      setGlobalFilterValue('');
      setShowLoader(false);
    }
  }, [channel, currentRouteTitle]);

  /* HELPER FUNCTIONS */
  const getFinancialYears = async () => {
    try {
      const response = await apiGetYearMaster();
      if (response.status === 200) {
        if (response.data.length > 0) {
          const financialYears = response.data;
          const financialYearOptions = financialYears.map((year) => {
            return {
              value: year.Yearcode,
              label: year.Description,
            };
          });
          setFinancialYears(financialYears);
          setFinancialYearOptions(financialYearOptions);
        }
      } else {
        openNotification(
          'danger',
          `Unable to get financial years. Server returned with status code: ${response.status}`,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getInvoiceSeries = async () => {
    try {
      let response = null;
      if (currentRouteTitle === billingSeriesRouteTitle) {
        response = await apiGetInvoiceSeries(channel, token);
      } else if (currentRouteTitle === ntcBillingSeriesRouteTitle) {
        response = await apiGetInvoiceSeriesNTC(channel, token);
      }
      if (response) {
        if (response.status === 200) {
          setInvoiceSeries(response.data);
        } else if (response.status === 204) {
          setInvoiceSeries([]);
        } else {
          openNotification(
            'danger',
            `Unable to get billing series. Server returned with status code: ${response.status}`,
          );
        }
      } else {
        openNotification('danger', `Something went wrong`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validateMaxNoLength = (value, maxLength) => {
    try {
      if (value !== '0' || value === '') {
        const pattern = `^\\d{0,${maxLength}}$`;
        const regex = new RegExp(pattern);
        if (regex.test(value)) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card
        header={
          <div className="flex justify-between">
            <div>
              <span className="flex items-center">
                <HeaderExtra />
              </span>
            </div>
          </div>
        }
        headerExtra={headerExtra(
          setShowDialog,
          filters,
          setFilters,
          globalFilterValue,
          setGlobalFilterValue,
          isEditModeOn,
          channel,
        )}
        className="h-full flex flex-col"
        bodyClass="text-center grow"
      >
        {isChannelSelected(channel) ? (
          <>
            {Array.isArray(invoiceSeries) && invoiceSeries.length > 0 ? (
              <InvoiceSeriesTable
                filters={filters}
                globalFilterFields={[
                  'Channel.ChannelName',
                  'YearMaster.Description',
                  'LastNo',
                ]}
                invoiceSeries={invoiceSeries}
                setInvoiceSeries={setInvoiceSeries}
                financialYearOptions={financialYearOptions}
                channel={channel}
                token={token}
                validateMaxNoLength={validateMaxNoLength}
                isEditModeOn={isEditModeOn}
                setIsEditModeOn={setIsEditModeOn}
                currentRouteTitle={currentRouteTitle}
                setShowLoader={setShowLoader}
              />
            ) : (
              <div className="h-full flex justify-center items-center">
                No invoice series to show
              </div>
            )}
          </>
        ) : (
          <div className="h-full flex justify-center items-center">
            Please select a channel to view invoice series
          </div>
        )}
      </Card>
      <AddInvoiceSeriesDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        invoiceSeries={invoiceSeries}
        setInvoiceSeries={setInvoiceSeries}
        financialYears={financialYears}
        financialYearOptions={financialYearOptions}
        channel={channel}
        token={token}
        validateMaxNoLength={validateMaxNoLength}
        currentRouteTitle={currentRouteTitle}
        setShowLoader={setShowLoader}
      />
      <Loader showLoader={showLoader} />
      <SelectChannelDialog />
    </>
  );
}

export default InvoiceSeries;
