import { Card, Tooltip } from 'components/ui';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import React, { useEffect, useState } from 'react';
import {
  numberToINRFormat,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import WarningDialog from '../../../Controls/WarningDialog';

/* CONSTANTS */
const columns = [
  { field: 'TelecastDate', header: 'Telecast Date' },
  { field: 'TelecastTime', header: 'Telecast Time' },
  { field: 'CommercialCaption', header: 'Caption' },
  { field: 'DurInSec', header: 'Duration' },
  { field: 'SpotRate', header: 'Rate' },
  { field: 'SpotAmount', header: 'Amount' },
  { field: 'ContentName', header: 'Program' },
  { field: 'NewRateAmount', header: 'New Rate Amount (₹)' },
];

function SpotsTable({
  spots,
  setSpots,
  generateCDNDate,
  newRateTotal,
  setNewRateTotal,
  firstNewRate,
  setFirstNewRate,
  isResetAllNewRateDialogOpen,
  setIsResetAllNewRateDialogOpen,
  setLoader,
  scrollHeight,
}) {
  /* STATES */
  const [firstNewRateEnteredRow, setFirstNewRateEnteredRow] = useState(null);
  const [newRate, setNewRate] = useState(null);
  const [isApplyToAllDialogOpen, setIsApplyToAllDialogOpen] = useState(false);

  // USE EFFECTS
  useEffect(() => {
    try {
      handleNewRateReset();
    } catch (error) {
      console.error(error);
    }
  }, [generateCDNDate]);

  /* HELPER COMPONENTS */
  const DefaultNewRateAmountCell = ({ generateCDNDate, options }) => {
    try {
      return (
        <Tooltip
          title={
            !generateCDNDate
              ? 'Select date to enter new amount'
              : 'Enter new amount'
          }
          wrapperClass="w-full border border-slate-500 rounded m-1 p-1 hover:cursor-pointer w-full"
        >
          <div
            onClick={() =>
              openNotification(
                'danger',
                'Please select a date to enter new rate',
              )
            }
            className="w-full text-center"
          >
            {options.value}
          </div>
        </Tooltip>
      );
    } catch (error) {
      throw error;
    }
  };

  const NewRateAmountCellEditor = (options) => {
    try {
      if (options) {
        if (generateCDNDate) {
          if (options.field === 'NewRateAmount' && options.rowData) {
            const value = !options.rowData.NewRateAmount
              ? options.rowData.NewRateAmount
              : options.rowData.NewRateAmount === '-'
              ? ''
              : options.rowData.NewRateAmount;
            return (
              <InputNumber
                value={value}
                onChange={(e) => {
                  onCellEditChange(e, options, value);
                }}
                onKeyDown={(e) => e.stopPropagation()}
                locale="en-IN"
                minFractionDigits={2}
                maxFractionDigits={2}
                inputClassName="text-white p-1"
                className="hover:cursor-pointer m-1 w-full"
                prefix="₹ "
              />
            );
          } else {
            return (
              <DefaultNewRateAmountCell
                generateCDNDate={generateCDNDate}
                options={options}
              />
            );
          }
        } else {
          return (
            <DefaultNewRateAmountCell
              generateCDNDate={generateCDNDate}
              options={options}
            />
          );
        }
      }
    } catch (error) {
      throw error;
    }
  };

  /* EVENT LISTENERS */
  const onCellEditChange = (event, options, value) => {
    try {
      if (event.value === null || event.value <= 0) {
        options.editorCallback(0);
        setNewRate(0);
        setNewRateTotal(parseFloat((newRateTotal - value).toFixed(2)));
      } else if (event.originalEvent.key === '-') {
        options.editorCallback('');
        setNewRate(null);
        setNewRateTotal(parseFloat((newRateTotal - value).toFixed(2)));
        openNotification('danger', 'Amount cannot be negative');
      } else if (event.value > 0) {
        options.editorCallback(event.value);
        setNewRate(event.value);
        setNewRateTotal(
          parseFloat((newRateTotal + event.value - value).toFixed(2)),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCellEditComplete = (e) => {
    try {
      let { rowData, newValue, field, originalEvent: event } = e;
      if (
        newValue === null ||
        newValue === '' ||
        newValue === 0 ||
        newValue === '-'
      ) {
        rowData[field] = '-';
        let spotsWithNewRate = JSON.parse(JSON.stringify(spots));
        spotsWithNewRate.forEach((spot) => {
          if (spot.Id === rowData.Id) {
            spot.NewRateAmount = '-';
          }
        });
        setSpots(spotsWithNewRate);
      } else {
        if (firstNewRate) {
          setIsApplyToAllDialogOpen(true);
          setFirstNewRateEnteredRow(rowData);
        } else {
          rowData[field] = newValue;
          let spotsWithNewRate = JSON.parse(JSON.stringify(spots));
          spotsWithNewRate.forEach((spot) => {
            if (spot.Id === rowData.Id) {
              spot.NewRateAmount = newValue;
            }
          });
          setSpots(spotsWithNewRate);
        }
      }
      event.preventDefault();
    } catch (error) {
      console.error(error);
    }
  };

  const handleApplyToAll = () => {
    try {
      setLoader(true);
      let spotsWithNewRate = JSON.parse(JSON.stringify(spots));
      let rateTotal = 0;
      spotsWithNewRate.forEach((spot) => {
        spot.NewRateAmount = newRate;
        rateTotal = rateTotal + newRate;
      });
      setSpots(spotsWithNewRate);
      setNewRateTotal(parseFloat(rateTotal.toFixed(2)));
      setFirstNewRate(false);
      setIsApplyToAllDialogOpen(false);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIsApplyToAllDialogClose = () => {
    try {
      let spotsWithNewRate = JSON.parse(JSON.stringify(spots));
      spotsWithNewRate.forEach((spot) => {
        if (spot.Id === firstNewRateEnteredRow.Id) {
          spot.NewRateAmount = newRate;
        }
      });
      setSpots(spotsWithNewRate);
      setNewRateTotal(parseFloat(newRateTotal.toFixed(2)));
      setFirstNewRate(false);
      setIsApplyToAllDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewRateReset = () => {
    try {
      let resettedSpots = JSON.parse(JSON.stringify(spots));
      resettedSpots.forEach((spot) => {
        spot.NewRateAmount = '-';
      });
      setSpots(resettedSpots);
      setFirstNewRate(true);
      setNewRateTotal(0);
      setIsResetAllNewRateDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {spots.length > 0 ? (
        <DataTable
          value={spots}
          editMode="cell"
          tableStyle={{ width: '100%' }}
          size="small"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          scrollable
          scrollHeight={scrollHeight}
        >
          {columns.map(({ field, header }) => {
            if (field === 'NewRateAmount') {
              return (
                <Column
                  key={field}
                  field={field}
                  header={header}
                  style={{ width: 'max-content' }}
                  editor={(options) => NewRateAmountCellEditor(options)}
                  onCellEditComplete={onCellEditComplete}
                  bodyClassName="hover:cursor-pointer"
                  headerClassName="px-1 py-3"
                  headerStyle={{
                    paddingInline: '0.25rem',
                    paddingBlock: '0.75rem',
                  }}
                  body={(rowData) => (
                    <Tooltip
                      title={
                        !generateCDNDate
                          ? 'Select date to enter new amount'
                          : 'Enter new amount'
                      }
                      wrapperClass="w-full border border-slate-500 rounded m-1 p-1"
                    >
                      <div className="w-full text-center">
                        {rowData[field] === '-'
                          ? rowData[field]
                          : numberToINRFormat(rowData[field])}
                      </div>
                    </Tooltip>
                  )}
                />
              );
            } else {
              return (
                <Column
                  key={field}
                  field={field}
                  header={header}
                  style={{ width: 'max-content' }}
                />
              );
            }
          })}
        </DataTable>
      ) : (
        <div className={`h-[${scrollHeight}] flex justify-center items-center`}>
          No Spots to show
        </div>
      )}
      <WarningDialog
        isDialogOpen={isApplyToAllDialogOpen}
        title="Apply to all"
        description={`Do you wish to apply INR ${numberToINRFormat(
          newRate,
        )} to all the spots?`}
        submitButtonTitle="Apply"
        handleDialogSubmit={handleApplyToAll}
        handleDialogClose={handleIsApplyToAllDialogClose}
      />
      <WarningDialog
        isDialogOpen={isResetAllNewRateDialogOpen}
        title="Reset New Rate Amounts"
        description={`All the New Rate Amounts will be reset. Are you sure to continue?`}
        submitButtonTitle="Reset"
        handleDialogSubmit={handleNewRateReset}
        handleDialogClose={() => setIsResetAllNewRateDialogOpen(false)}
      />
    </>
  );
}

export default SpotsTable;
