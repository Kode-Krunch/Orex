import { Card } from 'components/ui';
import { convertDateToYMD } from 'components/validators';
import React, { useEffect, useState } from 'react';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { TbCalendarCheck, TbCalendarTime } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import {
  BLUE_500,
  EMERALD_300,
  RED_500,
} from 'views/Controls/Dashboard/constants/tw_colors';
import DashboardShortcutCards from 'views/Controls/Dashboard/DashboardShortcutCards';
import HeaderExtra from 'views/Controls/HeaderExtra';
import Loader from 'views/Controls/Loader';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';

const PaymentDue = () => {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const [PaymentDue_DASHBOARD_SHORTCUTS, setPaymentDue_DASHBOARD_SHORTCUTS] =
    useState([]);
  const [Name_Of_Card, setName_Of_Card] = useState('Current Mth Outstanding');
  const [data, setData] = useState([]);

  const [managedColumns, setManagedColumns] = useState([]);
  const [ShowLoader, setShowLoader] = useState(false);
  const [columns, setColumns] = useState('');
  useEffect(() => {
    setShowLoader(true);
    let data = {};
    data.par_LocationCode = Channel.LocationCode;
    data.par_ChannelCode = Channel.ChannelCode;

    const currentDate = new Date();
    let fromDate, toDate;
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    switch (Name_Of_Card) {
      case 'Previous Mth Outstanding':
        // Previous month

        fromDate = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1);
        toDate = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0); // Last day of previous month
        break;
      case 'Current Mth Outstanding':
        // Current month
        fromDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
        );
        toDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
        ); // Last day of current month
        break;
      case 'Total Outstanding':
        // Next month
        const nextMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          1,
        );

        fromDate = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1);
        toDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0); // Last day of next month
        break;
      default:
        // Default to current date if Name_Of_Card does not match any case
        fromDate = toDate = currentDate;
    }

    data.par_FromDate = convertDateToYMD(fromDate);
    data.par_ToDate = convertDateToYMD(toDate);

    apiCallstoreprocedure('InvoiceOutstandingReport', data)
      .then((response) => {
        if (response.status === 200) {
          setShowLoader(false);
          setData(
            response.data.map((item) => ({
              ...item, // Spread the existing properties of the item
              PayableAmount:
                item.CurrencySymbol +
                ' ' +
                Number(item.PayableAmount)?.toLocaleString('en-IN'),
              AdjustedAmount:
                item.CurrencySymbol +
                ' ' +
                Number(item.AdjustedAmount)?.toLocaleString('en-IN'),
              OutstandingAmount:
                item.CurrencySymbol +
                ' ' +
                Number(item.OutstandingAmount)?.toLocaleString('en-IN'),
            })),
          );

          if (response.data.length > 0) {
            setColumns(() => {
              let columns = [];
              Object.keys(response.data[0]).forEach((column) => {
                if (column !== 'CurrencySymbol') {
                  // Exclude "CurrencySymbol"
                  columns.push({
                    accessorKey: column,
                    header: column,
                  });
                }
              });
              return columns;
            });
          } else {
            setColumns([]);
          }
        } else if (response.status === 204) {
          setShowLoader(false);
          setColumns([]);
          setData([]);
        }
      })
      .catch((error) => {
        if (error.response?.status) {
          setColumns([]);
          setData([]);
          setShowLoader(false);
        }
      });
  }, [Name_Of_Card, Channel]);

  useEffect(() => {
    setShowLoader(true);
    let data = {
      par_LocationCode: Channel.LocationCode,
      par_ChannelCode: Channel.ChannelCode,
    };

    apiCallstoreprocedure('usp_Get_OutstandingData', data)
      .then((response) => {
        if (response.status === 200) {
          const outstandingData = response.data;

          const shortcuts = outstandingData.map((item) => {
            let icon, navColor, key;
            const currencySymbol = item.OutstandingAmount?.match(/^[^\d]+/)[0]; // Extracts the ₹ symbol
            const amount = item.OutstandingAmount?.replace(/^[^\d]+/, '');
            switch (item.MonthType) {
              case 'Previous Mth Outstanding':
                icon = (
                  <TbCalendarTime style={{ fontSize: 35, color: BLUE_500 }} />
                );
                key = 'order';
                navColor = BLUE_500;
                break;
              case 'Current Mth Outstanding':
                icon = (
                  <MdOutlineCalendarMonth
                    style={{ fontSize: 35, color: EMERALD_300 }}
                  />
                );
                key = 'order3';
                navColor = EMERALD_300;
                break;
              case 'Total Outstanding':
                icon = (
                  <TbCalendarCheck style={{ fontSize: 35, color: RED_500 }} />
                );
                key = 'order1';
                navColor = RED_500;

                break;
              default:
                icon = null;
                navColor = null;
            }

            return {
              key: key,
              name: item.MonthType,
              nav: navColor,
              icon: icon,
              OutstandingAmount:
                currencySymbol + ' ' + Number(amount)?.toLocaleString('en-IN'),
              details: `Click here to view the outstanding payments from the ${item.MonthType}.`,
            };
          });

          setPaymentDue_DASHBOARD_SHORTCUTS(shortcuts);
          setShowLoader(false);
        }

        if (response.status === 204) {
          setShowLoader(false);
        }
      })
      .catch((error) => {
        if (error.response?.status) {
          setPaymentDue_DASHBOARD_SHORTCUTS(null);
          setShowLoader(false);
        }
      });
  }, [Channel]);

  return (
    <Card header={<HeaderExtra />}>
      <Loader showLoader={ShowLoader} />
      <div
        className={`grid grid-cols-${PaymentDue_DASHBOARD_SHORTCUTS.length} gap-4`}
      >
        <DashboardShortcutCards
          shortcuts={PaymentDue_DASHBOARD_SHORTCUTS}
          StateCall={setName_Of_Card}
        />
        <div className="col-span-3">
          <ReportsTable
            tableData={data}
            tableName={`Agency OutStanding`}
            originalColumns={columns}
            managedColumns={managedColumns}
            setManagedColumns={setManagedColumns}
            exportFileName={`Agency OutStanding`}
            columnsToFormatInINR={[]}
          />
        </div>
      </div>
    </Card>
  );
};

export default PaymentDue;
