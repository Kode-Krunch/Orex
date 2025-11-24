import React, { useContext } from 'react';
import { activityTypesEnum } from '../../enum';
import ScheduledInfo from './components/ScheduledInfo';
import ReplacedInfo from './components/ReplacedInfo';
import RescheduledInfo from './components/RescheduledInfo';
import BulkDroppedInfo from './components/BulkDroppedInfo';
import DropRescheduledInfo from './components/DropRescheduledInfo';
import CancelledInfo from './components/CancelledInfo';
import FinalLogCreatedInfo from './components/FinalLogCreatedInfo';
import DroppedInfo from './components/DroppedInfo';
import BilledInfo from './components/BilledInfo';
import ActivityLogContext from '../../context/ActivityLogContext';
import MakeGoodInfo from './components/MakeGoodInfo';
import MakeGoodRescheduledInfo from './components/MakeGoodRescheduleInfo';

function ActivityInfo() {
  /* CONTEXT */
  const { activityInfoData } = useContext(ActivityLogContext);

  return (
    <div className="min-h-full flex flex-col">
      {activityInfoData.type === activityTypesEnum.scheduled ? (
        <ScheduledInfo />
      ) : activityInfoData.type === activityTypesEnum.replaced ? (
        <ReplacedInfo />
      ) : activityInfoData.type === activityTypesEnum.rescheduled ? (
        <RescheduledInfo />
      ) : activityInfoData.type === activityTypesEnum.bulkDropped ? (
        <BulkDroppedInfo />
      ) : activityInfoData.type === activityTypesEnum.dropRescheduled ? (
        <DropRescheduledInfo />
      ) : activityInfoData.type === activityTypesEnum.makeGood ? (
        <MakeGoodInfo />
      ) : activityInfoData.type === activityTypesEnum.makeGoodReschedule ? (
        <MakeGoodRescheduledInfo />
      ) : activityInfoData.type === activityTypesEnum.cancelled ? (
        <CancelledInfo />
      ) : activityInfoData.type === activityTypesEnum.finalLogCreated ? (
        <FinalLogCreatedInfo />
      ) : activityInfoData.type === activityTypesEnum.dropped ? (
        <DroppedInfo />
      ) : activityInfoData.type === activityTypesEnum.billed ? (
        <BilledInfo />
      ) : (
        <div className="h-full flex justify-between items-center">
          No additional infomation to show
        </div>
      )}
    </div>
  );
}

export default ActivityInfo;
