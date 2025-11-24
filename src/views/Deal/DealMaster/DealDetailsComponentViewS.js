import { Button, Card, Table } from 'components/ui';
import { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { PiExportDuotone } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { ExportxlswithColor } from 'views/Controls/ExportxlswithColor';
const { Tr, Th, Td, THead, TBody } = Table;
// res.Deal && parseInt(res.Deal.DealNumber) > 0;

const COLUMNS = [
  { header: 'Channel', accessorKey: 'Channel', align: 'right' },
  { header: 'Type', accessorKey: 'Type', align: 'right' },
  {
    header: 'Deal Description',
    accessorKey: 'DealDescription',
    align: 'right',
  },
  { header: 'Spot Type', accessorKey: 'SpotType', align: 'right' },
  { header: 'Week Days', accessorKey: 'WeekDays', align: 'right' },
  { header: 'Rate', accessorKey: 'Rate', align: 'right' },
  { header: 'Total Sec', accessorKey: 'TotalSec', align: 'right' },
  { header: 'Used Sec', accessorKey: 'UsedSec', align: 'right' },
  { header: 'Balance', accessorKey: 'Balance', align: 'right' },
  { header: 'Total Amount', accessorKey: 'TotalAmount', align: 'right' },
  { header: 'Used Amt', accessorKey: 'UsedAmt', align: 'right' },
  {
    header: 'Balance Amt',
    accessorKey: 'BalanceAmt',
    align: 'right',
  },
];

export const DealDetailsComponentAdd = (
  array1,
  array2,
  actualExchRatesForBaseCur,
) => {
  const calculateTimeDifference = (startTime, endTime) => {
    // Parse the start and end times
    const start = new Date(`1970-01-01T${startTime.slice(0, -3)}Z`);
    const end = new Date(`1970-01-01T${endTime.slice(0, -3)}Z`);

    // Calculate the difference in milliseconds
    const diffMs = end - start;

    // Convert milliseconds to seconds
    const diffSeconds = diffMs / 1000;

    // Return the difference in seconds
    return diffSeconds;
  };
  const string = 'string';
  let totalSeconds = 0;
  let totalAmount = 0;
  array2.forEach((item) => {
    totalSeconds += Number(item.Second) || 0;
    totalAmount += Number(item.Amount) || 0;
  });
  const totalER = Math.ceil((totalAmount * 10) / totalSeconds);
  const transformedData = {
    Deal: {
      LocationCode: array1.LocationCode,
      ChannelCode: array1.ChannelCode,
      DealNumber: '',
      ZoneCode: array1.ZoneCode.value,
      BusinessTypeCode: array1.AgencyCode.BusinessTypeCode,
      DealTypeCode: array1.DealTypeCode.value,
      DealCreatedDate: new Date().toISOString(),
      DealPeriodFromDate: array1.DealPeriodFromDate,
      DealPeriodToDate: array1.DealPeriodToDate,
      DealReferenceNumber: array1.DealReferenceNumber,
      DealReferenceDate: new Date().toISOString(),
      DealReferenceDocNo: '',
      ClientCode: array1.ClientCode.value,
      AgencyCode: array1.AgencyCode.value,
      ClientPlaceCode: array1.ClientPlaceCode.value,
      AgencyPlaceCode: array1.AgencyPlaceCode1,
      CurrencyCode: array1.CurrencyCode.value,
      SalesExcutiveCode: array1.SalesExcutiveCode.value,
      TotalSeconds: totalSeconds,
      TotalAmount: totalAmount,
      TotalER: totalER, // Calculate Amount*10/sec
      CancelStatus: array1.CancelStatus ? 1 : 0,
      IsWebDeal: array1.IsWebDeal,
      IPAddress: array1.IPAddress,
      IsApproved: 0, // Fetch from channel setting master
      RejectRemark: '',
      PayRouteCode: array1.PayRouteCode.value,
      DiscPer: 0,
      IsCredit: array1.AgencyCode.IsCredit,
      IsAdvPmt: array1.AgencyCode.IsAdvPmt,
      IsPDC: array1.AgencyCode.IsPDC,
      CreditDays: array1.AgencyCode.CreditDays,
      TeamCode: 0,
      GSTN_id: '',
      IsActive: 1,
    },
    details: array2.map((item, insex) => ({
      name: item.name,
      DealNumber: '',
      LocationCode: array1.LocationCode,
      ChannelCode: item.channel.ChannelCode,
      DealLineItemNo: insex + 1,
      DealLineItemTypeCode: item.name,
      TimeBandCode: item.TimeBandCode?.value || 0,
      ContentCode: item.ContentCode?.value || 0,
      OriginalRepeatCode: item.OriginalRepeatCode?.value || 0,
      SponsorTypeCode: item.SponsorTypeCode?.value || 0,
      StartTime: item.StartTime,
      EndTime: item.EndTime,
      TimeInMin: calculateTimeDifference(item.StartTime, item.EndTime),
      IsCommited: item.IsCommited || 0,
      CommitedStartTime: item.CommitedStartTime || '',
      CommitedEndTime: item.CommitedEndTime || '',
      SpotTypeCode: item.SpotTypeCode?.value || 0,
      Rate: Number(item.Rate) || 0,
      InternalRate: Number(item.InternalRate) || 0,
      Seconds: Number(item.Second) || 0,
      Amount: Number(item.Amount) || 0,
      IsDiscount: 0,
      DiscPerc: 0,
      DiscAmt: 0,
      NetAmount: Number(item.Amount) || 0,
      ConsumedSeconds: 0,
      ConsumedAmount: 0,
      BalancedSeconds: Number(item.Second) || 0,
      BalancedAmount: Number(item.Amount) || 0,
      TotalSpots: Number(item.TotalSpots) || 0,
      ConsumedSpots: 0,
      BalancedSpots: Number(item.TotalSpots) || 0,
      LineItemCancelStatus: item.LineItemCancelStatus || 0,
      LineItemFromDate: array1.DealPeriodFromDate,
      LineItemEndDate: array1.DealPeriodToDate,
      NoWeeks: item.NoWeeks || 0,
      IsNTC: item.IsNTC || 0,
      NTCTypeCode: item.NTCTypeCode?.value || 0,
      NTCTotalSpots: Number(item.NTCTotalSpots) || 0,
      NTCConsumedSpots: 0,
      NTCBalanceSpots: Number(item.NTCTotalSpots) || 0,
      WeekdaysCode: Number(item.WeekDayCode?.value) || 0,
      LineItemRemark: 'NA',
      IsEvent: 0,
      EventCommission: 0,
      IsEventBillDone: 0,
      SpotPreferenceCode: Number(item.SpotPreferenceCode?.value) || 0,
      IsActive: 1,
    })),
    currencies: actualExchRatesForBaseCur,
    // , files: [
    //   {
    //     files: 'd:/2.png'
    //   }
    // ]
  };
  return transformedData;
};

export const DealDetailsComponentEdit = (
  array1,
  array2,
  actualExchRatesForBaseCur,
) => {
  // Function to calculate the time difference between two time 'string's
  console.log(array2);
  const calculateTimeDifference = (startTime, endTime) => {
    // Parse the start and end times
    const start = new Date(`1970-01-01T${startTime.slice(0, -3)}Z`);
    const end = new Date(`1970-01-01T${endTime.slice(0, -3)}Z`);

    // Calculate the difference in milliseconds
    const diffMs = end - start;

    // Convert milliseconds to seconds
    const diffSeconds = diffMs / 1000;

    // Return the difference in seconds
    return diffSeconds;
  };
  const string = 'string';
  let totalSeconds = 0;
  let totalAmount = 0;
  array2.forEach((item) => {
    totalSeconds += item.Second || 0;
    totalAmount += item.Amount || 0;
  });
  const totalER = Math.ceil((totalAmount * 10) / totalSeconds);
  const transformedData = {
    Deal: {
      LocationCode: array1.LocationCode,
      ChannelCode: array1.ChannelCode,
      DealNumber: array1.DealNumber,
      ZoneCode: array1.ZoneCode.value,
      BusinessTypeCode: array1.AgencyCode.BusinessTypeCode,
      DealTypeCode: array1.DealTypeCode.value,
      DealCreatedDate: new Date().toISOString(),
      DealPeriodFromDate: array1.DealPeriodFromDate,
      DealPeriodToDate: array1.DealPeriodToDate,
      DealReferenceNumber: array1.DealReferenceNumber,
      DealReferenceDate: new Date().toISOString(),
      DealReferenceDocNo: '',
      ClientCode: array1.ClientCode.value,
      AgencyCode: array1.AgencyCode.value,
      ClientPlaceCode: array1.ClientPlaceCode.value,
      AgencyPlaceCode: array1.AgencyPlaceCode1,
      CurrencyCode: array1.CurrencyCode.value,
      SalesExcutiveCode: array1.SalesExcutiveCode.value,
      TotalSeconds: totalSeconds,
      TotalAmount: totalAmount,
      TotalER: totalER, // Calculate Amount*10/sec
      CancelStatus: array1.CancelStatus ? 1 : 0,
      IsWebDeal: array1.IsWebDeal,
      IPAddress: array1.IPAddress,
      IsApproved: 0, // Fetch from channel setting master
      RejectRemark: '',
      PayRouteCode: array1.PayRouteCode.value,
      DiscPer: 0,
      IsCredit: array1.AgencyCode.IsCredit,
      IsAdvPmt: array1.AgencyCode.IsAdvPmt,
      IsPDC: array1.AgencyCode.IsPDC,
      CreditDays: array1.AgencyCode.CreditDays,
      TeamCode: 0,
      GSTN_id: '',
      IsActive: 1,
    },
    details: array2.map((item, insex) => ({
      ConsumedAmount: item.ConsumedAmount,
      ConsumedSeconds: item.ConsumedSeconds,
      BalancedAmount: item.BalancedAmount,
      BalancedSeconds: item.BalancedSeconds,
      name: item.name,
      DealNumber: array1.DealNumber,
      LocationCode: array1.LocationCode,
      ChannelCode: item.channel.ChannelCode,
      DealLineItemNo: insex + 1,
      DealLineItemTypeCode: item.name,
      TimeBandCode: item.TimeBandCode?.value || 0,
      ContentCode: item.ContentCode?.value || 0,
      OriginalRepeatCode: item.OriginalRepeatCode?.value || 0,
      SponsorTypeCode: item.SponsorTypeCode?.value || 0,
      StartTime: item.StartTime,
      EndTime: item.EndTime,
      TimeInMin: calculateTimeDifference(item.StartTime, item.EndTime),
      IsCommited: item.IsCommited || 0,
      CommitedStartTime: item.CommitedStartTime || '',
      CommitedEndTime: item.CommitedEndTime || '',
      SpotTypeCode: item.SpotTypeCode?.value || 0,
      Rate: Number(item.Rate) || 0,
      InternalRate: Number(item.InternalRate) || 0,
      Seconds: Number(item.Second) || 0,
      Amount: Number(item.Amount) || 0,
      IsDiscount: 0,
      DiscPerc: 0,
      DiscAmt: 0,
      NetAmount: Number(item.Amount) || 0,
      TotalSpots: Number(item.TotalSpots) || 0,
      ConsumedSpots: 0,
      BalancedSpots: Number(item.TotalSpots) || 0,
      LineItemCancelStatus: item.LineItemCancelStatus || 0,
      LineItemFromDate: array1.DealPeriodFromDate,
      LineItemEndDate: array1.DealPeriodToDate,
      NoWeeks: item.NoWeeks || 0,
      IsNTC: item.IsNTC || 0,
      NTCTypeCode: item.NTCTypeCode?.value || 0,
      NTCTotalSpots: Number(item.NTCTotalSpots) || 0,
      NTCConsumedSpots: 0,
      NTCBalanceSpots: Number(item.NTCTotalSpots) || 0,
      WeekdaysCode: Number(item.WeekDayCode?.value) || 0,
      LineItemRemark: 'NA',
      IsEvent: 0,
      EventCommission: 0,
      IsEventBillDone: 0,
      SpotPreferenceCode: Number(item.SpotPreferenceCode?.value) || 0,
      IsActive: 1,
    })),
    currencies: actualExchRatesForBaseCur,
  };
  return transformedData;
};
export const DealCard = ({
  datg,
  DataDisplay,
  setFormState,
  setfindId,
  setCurrentTab,
  step,
  setFormStateCopy,
  isChannelSelEnabledForDealDetails,
}) => {
  const { Content } = useSelector((state) => state.base.common);
  const mode = useSelector((state) => state.theme.mode);
  const [customData, setCustomData] = useState([]);
  useEffect(() => {
    if (DataDisplay.length !== 0) {
      const transformedArray = DataDisplay.map((item) => ({
        Type: item.DealLineItemType?.label,
        DealDescription: [
          item.TimeBandCode?.label !== 'NA' && item.TimeBandCode?.label,
          item.ContentCode?.label !== 'NA' && item.ContentCode?.label !== 'NA'
            ? item.ContentCode?.label
            : '',
        ]
          .filter(Boolean)
          .join(' '),
        SpotType: item.SpotTypeCode?.label,
        WeekDays: item.WeekDayCode?.label,
        Rate: datg + +item?.Rate,
        TotalSec: [
          item?.TotalSpots !== 0 && item?.TotalSpots,
          item?.NTCTotalSpots !== 0 && item?.NTCTotalSpots,
          item?.Second !== 0 && item?.Second !== 0 ? item?.Second : '',
        ]
          .filter(Boolean)
          .join(' '),
        UsedSec: item?.ConsumedSeconds ? item?.ConsumedSeconds : '00',
        Balance: item?.BalancedSeconds
          ? item?.BalancedSeconds
          : [
              item.TotalSpots !== 0 && item.TotalSpots,
              item.NTCTotalSpots !== 0 && item.NTCTotalSpots,
              item.Second !== 0 && item.Second !== 0 ? item.Second : '',
            ]
              .filter(Boolean)
              .join(' '),
        TotalAmount: datg + +item.Amount,
        UsedAmt: `${datg} ${
          item?.ConsumedAmount == 0 || item?.ConsumedAmount == undefined
            ? '00'
            : item?.ConsumedAmount
        }`,
        BalanceAmt: `${datg} ${
          item?.BalancedAmount == 0 || item?.BalancedAmount == undefined
            ? item.Amount
            : item?.BalancedAmount
        }`,
        ...(isChannelSelEnabledForDealDetails && {
          Channel: item.channel.label,
        }),
      }));
      setCustomData(transformedArray);
    }
  }, [DataDisplay]);
  return (
    <Card>
      <Table compact>
        <THead>
          <Tr>
            {/* Render headers for visible columns */}

            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              {' '}
              {step == 1 && 'Action'}
            </Th>
            {isChannelSelEnabledForDealDetails && (
              <Th style={{ textTransform: 'capitalize' }}>Channel</Th>
            )}
            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              Type
            </Th>
            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              NTC Type
            </Th>
            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              Deal Description
            </Th>
            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              Spot Type
            </Th>
            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              Week Days{' '}
            </Th>
            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              {' '}
              Rate
            </Th>
            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              Total Sec
            </Th>

            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              Used Sec
            </Th>
            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              Balance
            </Th>
            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              Total Amount
            </Th>
            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              Used Amt
            </Th>

            <Th style={{ textTransform: 'capitalize', textAlign: 'right' }}>
              Balance Amt
            </Th>
          </Tr>
        </THead>
        <TBody>
          {DataDisplay.map((item, index) => (
            <Tr
              key={index}
              className={mode === 'dark' && `BorderIwant`}
              style={{
                textDecoration:
                  item.LineItemCancelStatus !== 1 ? 'none' : 'line-through',
              }}
            >
              {/* Render action button if step !== 2 */}
              <Td
                style={{ textTransform: 'capitalize', textAlign: 'right' }}
                className={mode !== 'dark' && `tdLight`}
              >
                <div className="flex items-center ">
                  <div
                    style={{
                      height: 30,
                      width: 5,
                    }}
                    className={` mr-3 ${
                      item.DealLineItemType?.value == 4 ? 'bg-lime-300' : null
                    } ${
                      item.DealLineItemType?.value == 3 ? 'bg-rose-600' : null
                    } ${
                      item.DealLineItemType?.value == 1 ? 'bg-teal-300' : null
                    } ${
                      item.DealLineItemType?.value == 5 ? 'bg-orange-200' : null
                    } ${
                      item.DealLineItemType?.value == 6 ? 'bg-orange-200' : null
                    } ${
                      item.DealLineItemType?.value == 2 ? 'bg-cyan-300' : null
                    }`}
                  ></div>

                  {step == 1 && (
                    <Button
                      size="xs"
                      icon={<HiPencil />}
                      onClick={() => {
                        const filteredData = DataDisplay.filter(
                          (obj) => obj.DealLineItemNo == item.DealLineItemNo,
                        );
                        console.log(...filteredData);
                        setFormState(...filteredData);
                        if (Content.DealCode) {
                          setFormStateCopy(...filteredData);
                        }
                        setCurrentTab(filteredData[0].name);
                        setfindId(index);
                      }}
                    />
                  )}
                </div>
              </Td>
              {/* Render table data for visible columns */}
              {isChannelSelEnabledForDealDetails && (
                <Td
                  style={{ textTransform: 'capitalize' }}
                  className={mode !== 'dark' && `tdLight`}
                >
                  {item.channel.label}
                </Td>
              )}
              <Td
                style={{ textTransform: 'capitalize', textAlign: 'right' }}
                className={mode !== 'dark' && `tdLight`}
              >
                {item.DealLineItemType?.label}
              </Td>
              <Td
                style={{ textTransform: 'capitalize', textAlign: 'right' }}
                className={mode !== 'dark' && `tdLight`}
              >
                {item.NTCTypeCode?.label != 'NA' ? item.NTCTypeCode?.label : ''}
              </Td>
              <Td
                style={{
                  width: 30,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textTransform: 'capitalize',
                  textAlign: 'right',
                }}
                className={mode !== 'dark' ? 'tdLight' : ''}
              >
                {item.TimeBandCode?.label !== 'NA' && item.TimeBandCode?.label}{' '}
                {item.ContentCode?.label !== 'NA' && item.ContentCode?.label}
              </Td>
              <Td
                style={{ textTransform: 'capitalize', textAlign: 'right' }}
                className={mode !== 'dark' && `tdLight`}
              >
                {item.SpotTypeCode?.label}
              </Td>
              <Td
                style={{ textTransform: 'capitalize', textAlign: 'right' }}
                className={mode !== 'dark' && `tdLight`}
              >
                {item.WeekDayCode?.label}
              </Td>
              <Td
                style={{
                  textTransform: 'capitalize',
                  textAlign: 'right',
                }}
                className={
                  mode !== 'dark' ? `tdLight text-black` : `text-white`
                }
              >
                {datg}
                {item.Rate.toLocaleString('en-IN')}
              </Td>
              <Td
                style={{ textTransform: 'capitalize', textAlign: 'right' }}
                className={mode !== 'dark' && `tdLight`}
              >
                {item.TotalSpots != 0 && item.TotalSpots}
                {item.Second != 0 && item.Second}
                {item.NTCTotalSpots != 0 && item.NTCTotalSpots}
              </Td>
              <Td
                className={mode !== 'dark' && `tdLight`}
                style={{
                  textTransform: 'capitalize',
                  textAlign: 'right',
                }}
              >
                {' '}
                {item?.ConsumedSeconds ? item?.ConsumedSeconds : '00'}
              </Td>{' '}
              <Td
                className={mode !== 'dark' && `tdLight`}
                style={{
                  textTransform: 'capitalize',
                  textAlign: 'right',
                }}
              >
                {item?.BalancedSeconds ? (
                  item?.BalancedSeconds
                ) : (
                  <>
                    {item.TotalSpots !== 0 && item.TotalSpots}
                    {item.Second !== 0 && item.Second}
                    {item.NTCTotalSpots !== 0 && item.NTCTotalSpots}
                  </>
                )}
              </Td>{' '}
              <Td
                style={{
                  textTransform: 'capitalize',
                  textAlign: 'right',
                }}
                className={
                  mode !== 'dark' ? `tdLight text-black` : `text-white`
                }
              >
                {datg}
                {item.Amount.toLocaleString('en-IN')}
              </Td>
              <Td
                className={
                  mode !== 'dark' ? `tdLight text-black` : `text-white`
                }
                style={{
                  textTransform: 'capitalize',
                  textAlign: 'right',
                }}
              >
                {datg}
                {item?.ConsumedSeconds
                  ? `${item?.ConsumedAmount.toLocaleString('en-IN')}`
                  : '00'}
              </Td>
              <Td
                className={
                  mode !== 'dark' ? `tdLight text-black` : `text-white`
                }
                style={{
                  textTransform: 'capitalize',
                  textAlign: 'right',
                }}
              >
                {datg}
                {item?.BalancedAmount
                  ? `${item?.BalancedAmount.toLocaleString('en-IN')}`
                  : item.Amount.toLocaleString('en-IN')}
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
      {DataDisplay.length !== 0 && (
        <div className="flex justify-end mt-2">
          <Button
            icon={<PiExportDuotone />}
            size="sm"
            variant="solid"
            onClick={() =>
              ExportxlswithColor(
                false,
                false,
                0,
                0,
                true,
                customData,
                'ExportName',
                isChannelSelEnabledForDealDetails
                  ? COLUMNS
                  : COLUMNS.filter(
                      (column) => column.accessorKey !== 'Channel',
                    ),
                false,
              )
            }
          >
            Export
          </Button>
        </div>
      )}
    </Card>
  );
};
