import React, { useContext, useEffect, useState } from 'react';
import {
  featuresEnum,
  rowDataTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import { handleFeatureClose } from '../../utils/utils';
import {
  openNotification,
  timeToSeconds,
} from 'views/Controls/GLOBALFUNACTION';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { Button, Card, Tooltip } from 'components/ui';
import { IoMdClose } from 'react-icons/io';
import DurationTable from './DurationTable';

function Duration() {
  /* CONTEXTS */
  const { schedulingTableData, setActiveFeatures, secondaryAreaZindexRef } =
    useContext(SchedulerContext);

  /* STATES */
  const [durationTableData, setDurationTableData] = useState([]);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      setDurationTableData(getDurationTableData());
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetching duration information',
      );
      console.error(error);
    }
  }, [schedulingTableData]);

  /* HELPER FUNCTIONS */
  const getDurationTableData = () => {
    try {
      let durationTableData = [];
      for (let index = 1; index < schedulingTableData.length; index++) {
        let row = schedulingTableData[index];
        if (row.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION) {
          let allSegmentData = getAllSegmentData(index, schedulingTableData);
          durationTableData.push({
            eventName: row.Event_Name,
            break: allSegmentData.length,
            promoDuration: allSegmentData.reduce(
              (acc, cur) => acc + cur.promoDuration,
              0,
            ),
            songDuration: allSegmentData.reduce(
              (acc, cur) => acc + cur.songDuration,
              0,
            ),
            commercialDuration: allSegmentData.reduce(
              (acc, cur) => acc + cur.commercialDuration,
              0,
            ),
            eventIndex: index,
            subRows: allSegmentData,
          });
        }
      }
      return durationTableData;
    } catch (error) {
      throw error;
    }
  };

  const getAllSegmentData = (ctIndex, tableData) => {
    try {
      let index = ctIndex + 1;
      let allSegmentData = [];
      while (
        tableData[index] &&
        tableData[index].F_C_S_P !== rowDataTypesEnum.CONTENT_TERMINATION
      ) {
        if (
          index === ctIndex + 1 &&
          tableData[index].F_C_S_P !== rowDataTypesEnum.SEGMENT
        ) {
          let segmentData = getDurationsForSegment(ctIndex, tableData);
          allSegmentData.push(segmentData);
        }
        if (tableData[index].F_C_S_P === rowDataTypesEnum.SEGMENT) {
          let segmentData = getDurationsForSegment(index, tableData);
          allSegmentData.push(segmentData);
        }
        index++;
      }
      return allSegmentData;
    } catch (error) {
      throw error;
    }
  };

  const getDurationsForSegment = (segmentIndex, tableData) => {
    try {
      let index = segmentIndex + 1;
      let totalPromoDuration = 0;
      let totalSongDuration = 0;
      let totalCommercialDuration = 0;
      while (
        tableData[index] &&
        tableData[index].F_C_S_P !== rowDataTypesEnum.SEGMENT
      ) {
        if (tableData[index].F_C_S_P === rowDataTypesEnum.PROMO) {
          totalPromoDuration += timeToSeconds(tableData[index].Duration);
        } else if (tableData[index].F_C_S_P === rowDataTypesEnum.SONG) {
          totalSongDuration += timeToSeconds(tableData[index].Duration);
        } else if (tableData[index].F_C_S_P === rowDataTypesEnum.COMMERCIAL) {
          totalCommercialDuration += timeToSeconds(tableData[index].Duration);
        }
        index++;
      }
      return {
        eventName: '',
        break: tableData[segmentIndex].BreakNumber,
        promoDuration: totalPromoDuration,
        songDuration: totalSongDuration,
        commercialDuration: totalCommercialDuration,
        eventIndex: segmentIndex,
      };
    } catch (error) {
      throw error;
    }
  };

  return (
    <div
      className="h-full w-full flex flex-col bg-gray-800 p-3 pt-2 rounded-lg absolute top-0 left-0"
      style={{ zIndex: secondaryAreaZindexRef.current[featuresEnum.DURATION] }}
    >
      <div className="flex justify-between items-center mb-2">
        <h5>Duration</h5>
        <div className="flex gap-1.5">
          <Tooltip title="Close">
            <Button
              size="xs"
              icon={<IoMdClose />}
              onClick={() =>
                handleFeatureClose(setActiveFeatures, featuresEnum.DURATION)
              }
            />
          </Tooltip>
        </div>
      </div>
      <div className="h-[92%] flex flex-col gap-3">
        {durationTableData.length > 0 ? (
          <div className="grow overflow-auto no-scrollbar">
            <DurationTable tableData={durationTableData} />
          </div>
        ) : (
          <Card
            className="h-full"
            bodyClass="h-full flex justify-center items-center"
          >
            No duration info to show
          </Card>
        )}
      </div>
    </div>
  );
}

export default Duration;
