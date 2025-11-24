import { Button, Dialog, Radio } from 'components/ui';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { apiCallstoreprocedure } from 'services/CommonService';
import {
  EMERALD_500_50,
  ROSE_700_40,
} from 'views/Controls/Dashboard/constants/tw_colors';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { telecastStatus } from '../ManualMatch/enums';

function MissedSpotsUpdationDialog({
  isMissedSpotsUpdationDialogOpen,
  setIsMissedSpotsUpdationDialogOpen,
  clickedRow,
  channel,
  telecastDate,
  setMissedSpots,
}) {
  /* STATES */
  const [availableSpots, setAvailableSpots] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedSpotStatus, setSelectedSpotStatus] = useState(
    telecastStatus.TELECASTED,
  );

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        if (isMissedSpotsUpdationDialogOpen && clickedRow && clickedRow.data) {
          const response = await apiCallstoreprocedure(
            'USP_Billing_Asrun_UnMatchVideoID',
            {
              LocationCode: channel.LocationCode,
              ChannelCode: channel.ChannelCode,
              TelecastDate: telecastDate,
              VideoID: clickedRow.data.VideoID,
            },
          );
          if (response) {
            if (response.status === 200) {
              setAvailableSpots(response.data);
            } else if (response.status === 204) {
              setAvailableSpots([]);
            } else {
              openNotification(
                'danger',
                `Something went wrong while fetching availabe spots. Server responded with status code ${response.status}`,
              );
            }
          } else {
            openNotification(
              'danger',
              'Something went wrong while fetching availabe spots',
            );
          }
        }
      } catch (error) {
        openNotification(
          'danger',
          'Something went wrong while fetching availabe spots',
        );
        console.log(error);
      }
    })();
  }, [isMissedSpotsUpdationDialogOpen, clickedRow]);

  useEffect(() => {
    try {
      if (selectedSpotStatus === telecastStatus.NOT_TELECASTED) {
        setSelectedSpot(null);
      }
    } catch (error) {
      console.error(error);
    }
  }, [selectedSpotStatus]);

  /* EVENT HANDLERS */
  const handleDialogClose = () => {
    try {
      setIsMissedSpotsUpdationDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    try {
      setMissedSpots((prevState) => {
        let updatedMissedSpots = [...prevState];
        updatedMissedSpots[clickedRow.index].Remark = selectedSpotStatus;
        if (selectedSpotStatus === telecastStatus.TELECASTED) {
          updatedMissedSpots[clickedRow.index].AsRunTime =
            selectedSpot.asruntime;
          updatedMissedSpots[clickedRow.index].AsRunDuration =
            selectedSpot.actualduration;
        } else {
          updatedMissedSpots[clickedRow.index].AsRunTime = null;
          updatedMissedSpots[clickedRow.index].AsRunDuration = '00:00:00:00';
        }
        updatedMissedSpots[clickedRow.index].fontColor = 'white';
        if (selectedSpotStatus === telecastStatus.TELECASTED) {
          updatedMissedSpots[clickedRow.index].bgColor = EMERALD_500_50;
        } else {
          updatedMissedSpots[clickedRow.index].bgColor = ROSE_700_40;
        }
        return updatedMissedSpots;
      });
      openNotification('success', 'Spot updated successfully');
      resetMissedSpotsUpdationDialog();
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while updating missed spot',
      );
      console.log(error);
    }
  };

  /* HELPER FUNCTION */
  const resetMissedSpotsUpdationDialog = () => {
    try {
      setAvailableSpots(null);
      setSelectedSpot(null);
      setSelectedSpotStatus(telecastStatus.TELECASTED);
      setIsMissedSpotsUpdationDialogOpen(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog
      isOpen={isMissedSpotsUpdationDialogOpen}
      height={'90vh'}
      width={'95vw'}
      contentClassName="h-full flex flex-col mb-8 mt-8"
      className="max-w-max"
      onClose={handleDialogClose}
      onRequestClose={handleDialogClose}
    >
      <h4 className="mb-4">Available Spots</h4>
      <div className="grow h-0">
        <DataTable
          value={availableSpots}
          selection={selectedSpot}
          onSelectionChange={(e) => setSelectedSpot(e.value)}
          dataKey="FileID"
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
          <Column
            field="contentname"
            header="Content"
            bodyClassName="!border !border-[0.5px] !border-gray-700 !w-max !max-w-max !px-2 !py-1 "
            headerStyle={{
              textWrap: 'nowrap',
              paddingBlock: '0.7rem',
            }}
          ></Column>
          <Column
            field="filename"
            header="FileName"
            bodyClassName="!border !border-[0.5px] !border-gray-700 !w-max !max-w-max !px-2 !py-1"
            headerStyle={{
              textWrap: 'nowrap',
              paddingBlock: '0.7rem',
            }}
          ></Column>
          <Column
            field="title"
            header="Title"
            bodyClassName="!border !border-[0.5px] !border-gray-700 !w-max !max-w-max !px-2 !py-1 "
            headerStyle={{
              textWrap: 'nowrap',
              paddingBlock: '0.7rem',
            }}
          ></Column>
          <Column
            field="actualduration"
            header="Telecast Duration"
            bodyClassName="!border !border-[0.5px] !border-gray-700 !w-max !max-w-max !px-2 !py-1 "
            headerStyle={{
              textWrap: 'nowrap',
              paddingBlock: '0.7rem',
            }}
          ></Column>
          <Column
            field="asruntime"
            header="Telecast Time"
            bodyClassName="!border !border-[0.5px] !border-gray-700 !w-max !max-w-max !px-2 !py-1"
            headerStyle={{
              textWrap: 'nowrap',
              paddingBlock: '0.7rem',
            }}
          ></Column>
        </DataTable>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <Radio.Group
          value={selectedSpotStatus}
          onChange={(value) => setSelectedSpotStatus(value)}
        >
          <Radio value={telecastStatus.TELECASTED}>Mark as Telecasted</Radio>
          <Radio value={telecastStatus.NOT_TELECASTED}>Missed</Radio>
        </Radio.Group>
        <div>
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            disabled={
              selectedSpotStatus === telecastStatus.TELECASTED && !selectedSpot
            }
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default MissedSpotsUpdationDialog;
