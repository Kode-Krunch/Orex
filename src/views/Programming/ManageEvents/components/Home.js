import { Button, Card, Tooltip } from 'components/ui';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import React, { useEffect, useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import HeaderExtra from 'views/Controls/HeaderExtra';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import {
  EVENT_MASTER_COLUMNS,
  EXPORT_FILE_NAME,
  TOOLBAR_OPTIONS,
} from '../constants';
import { TbArrowMerge } from 'react-icons/tb';
import { GRAY_300 } from 'views/Controls/Dashboard/constants/tw_colors';
import { MdOutlineEdit } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import { viewsEnum } from '../enum';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { hideStackedSideNav_secondaryShow } from 'views/Scheduling/general';
import { useSelector } from 'react-redux';
import { apiGetEventMaster } from 'services/ProgrammingService';

function Home({ setCurView, setShowLoader, setClickedActionRowData }) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  // STATES
  const [globalFilter, setGlobalFilter] = useState('');
  const [tableData, setTableData] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        if (!channel) return;
        setGlobalFilter('');
        await setEventMasterDataFromAPI();
        hideStackedSideNav_secondaryShow();
      } catch (error) {
        openNotification(
          'danger',
          'Something went wrong. Unable to fetch Events',
        );
        console.error(error);
      }
    })();
  }, [channel]);

  /* EVENT HANDLERS */
  const handleMapTeamsClick = (rowData) => {
    setCurView(viewsEnum.MAP_TEAMS);
    setClickedActionRowData(rowData);
  };

  const handleEdit = (rowData) => {
    setCurView(viewsEnum.EDIT);
    setClickedActionRowData(rowData);
  };

  /* HELPER FUNCTIONS */
  function getTableColumnsWithActions() {
    try {
      return [
        ...EVENT_MASTER_COLUMNS,
        {
          header: 'Action',
          accessorKey: 'action',
          actions: [
            {
              action: (rowIndex, rowData) => (
                <Tooltip
                  title="View / Generate Matches"
                  key={`${rowIndex}-map`}
                  wrapperClass="my-1"
                >
                  <Button
                    size="xs"
                    icon={<TbArrowMerge color={GRAY_300} />}
                    onClick={() => handleMapTeamsClick(rowData)}
                  />
                </Tooltip>
              ),
            },
            {
              action: (rowIndex, rowData) => (
                <Tooltip
                  title="Edit Event"
                  key={`${rowIndex}-edit`}
                  wrapperClass="my-1"
                >
                  <Button
                    size="xs"
                    icon={<MdOutlineEdit color={GRAY_300} />}
                    onClick={() => handleEdit(rowData)}
                  />
                </Tooltip>
              ),
            },
            {
              action: (rowIndex, rowData) => (
                <Tooltip
                  title="View Contents"
                  key={`${rowIndex}-view`}
                  wrapperClass="my-1"
                >
                  <Button
                    size="xs"
                    icon={<FaRegEye color={GRAY_300} />}
                  // onClick={() => handleRowClick(rowIndex, rowData)}
                  />
                </Tooltip>
              ),
            },
          ],
        },
      ];
    } catch (error) {
      console.error(error);
    }
  }

  const setEventMasterDataFromAPI = async () => {
    try {
      setShowLoader(true);
      const response = await apiGetEventMaster(
        channel.LocationCode,
        channel.ChannelCode,
      );
      if (response.status === 200) {
        setTableData(response.data);
      } else if (response.status === 204) {
        setTableData([]);
      } else {
        openNotification(
          'danger',
          `Unable to fetch Events. Server responsed with status code ${response.status}`,
        );
      }
      setShowLoader(false);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong. Unable to fetch Events',
      );
      setShowLoader(false);
      throw error;
    }
  };

  return (
    <Card
      header={<HeaderExtra Component={'Event Management'} />}
      headerExtra={
        <span className="flex items-center gap-2">
          <InputwithVoice
            value={globalFilter ?? ''}
            className="solid"
            placeholder="Search all columns..."
            size="sm"
            onChange={(e) => {
              if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
                setGlobalFilter(e.target.value);
              }
            }}
          />
          <Button
            block
            variant="solid"
            size="sm"
            icon={<HiPlusCircle />}
            onClick={() => setCurView(viewsEnum.ADD)}
            className="w-max"
          >
            Add Event
          </Button>
        </span>
      }
      className="flex flex-col min-h-[87vh]"
      bodyClass="grow p-5 pt-4 flex flex-col"
    >
      <ReportsTable
        tableData={tableData}
        tableName={'manageEventsHome'}
        originalColumns={getTableColumnsWithActions()}
        managedColumns={managedColumns}
        setManagedColumns={setManagedColumns}
        exportFileName={EXPORT_FILE_NAME}
        toolbarOptions={TOOLBAR_OPTIONS}
        externalGlobalFilter={globalFilter}
      />
    </Card>
  );
}

export default Home;
