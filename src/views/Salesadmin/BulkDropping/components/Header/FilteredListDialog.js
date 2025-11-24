import { Button, Card, Dialog } from 'components/ui';
import { convertDateToYMD } from 'components/validators';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import '../../index.css';

function FilteredListDialog({
  isFilteredListDialogOpen,
  setIsFilteredListDialogOpen,
  date,
  bookingType,
  filterType,
  selectedFilteredRow,
  setSelectedFilteredRow,
  setShowLoader,
}) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        if (filterType) {
          setShowLoader(true);
          const param = {
            par_Location: channel.LocationCode,
            par_Channel: channel.ChannelCode,
            par_TelecastDate: convertDateToYMD(date),
            par_Flag: filterType.value,
            par_Mode: bookingType.value,
          };
          let response = await apiCallstoreprocedure(
            'USP_Sch_Bulk_Dropingsummary',
            param,
          );
          if (response.status === 200) {
            setTableData(response.data);
          } else if (response.status === 204) {
            openNotification('info', `No ${filterType.label}s found`);
            setTableData([]);
          } else {
            openNotification(
              'danger',
              `Something went wrong while fetching ${filterType.label}s. Server responded with status code ${response.status}`,
            );
            setTableData([]);
          }
          setShowLoader(false);
        }
      } catch (error) {
        openNotification(
          'danger',
          `Something went wrong while fetching ${filterType.label}s`,
        );
        setTableData([]);
        setShowLoader(false);
        console.error(error);
      }
    })();
  }, [filterType]);

  useEffect(() => {
    try {
      if (isFilteredListDialogOpen) setSelectedRow(selectedFilteredRow);
    } catch (error) {
      console.error(error);
    }
  }, [isFilteredListDialogOpen, selectedFilteredRow]);

  /* EVENT HANDLERS */
  const handleDialogClose = () => {
    try {
      setIsFilteredListDialogOpen(false);
      setSelectedRow(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = () => {
    try {
      setSelectedFilteredRow(selectedRow);
      handleDialogClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      isOpen={isFilteredListDialogOpen}
      onClose={handleDialogClose}
      onRequestClose={handleDialogClose}
      width={'85vw'}
      contentClassName="my-6"
    >
      <h5>{filterType.label}</h5>
      <div className="h-[70vh] mt-4">
        {tableData.length > 0 ? (
          <DataTable
            value={tableData}
            selection={selectedRow}
            onSelectionChange={(e) => setSelectedRow(e.value)}
            dataKey="FilterType"
            tableStyle={{ minWidth: '50rem' }}
            scrollable
            scrollHeight="flex"
            rowClassName="datatable-row"
          >
            <Column
              selectionMode="single"
              headerStyle={{
                width: '3rem',
                textWrap: 'nowrap',
                paddingBlock: '0.7rem',
              }}
              align="center"
              bodyClassName="!border !border-[0.5px] !border-gray-700 !w-max !max-w-max !px-2 !py-2"
            ></Column>
            {Object.keys(tableData[0]).map((key) => {
              return (
                <Column
                  field={key}
                  header={key === 'FilterType' ? filterType.label : key}
                  bodyClassName="!border !border-[0.5px] !border-gray-700 !w-max !max-w-max !px-2 !py-1 text-white"
                  headerStyle={{
                    textWrap: 'nowrap',
                    paddingBlock: '0.7rem',
                  }}
                ></Column>
              );
            })}
          </DataTable>
        ) : (
          <Card
            className="h-full"
            bodyClass="h-full flex justify-center items-center"
          >
            No {filterType.label} to show
          </Card>
        )}
      </div>
      <div className="text-right mt-4 flex items-center justify-end">
        <Button
          className="ltr:mr-2 rtl:ml-2"
          variant="plain"
          onClick={handleDialogClose}
        >
          Cancel
        </Button>
        <Button variant="solid" disabled={!selectedRow} onClick={handleSelect}>
          Select
        </Button>
      </div>
    </Dialog>
  );
}

export default FilteredListDialog;
