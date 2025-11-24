import React from 'react';
import Scheduled from './Activities/Scheduled';
import Replaced from './Activities/Replaced';
import Rescheduled from './Activities/Rescheduled';
import BulkDropped from './Activities/BulkDropped';
import DropRescheduled from './Activities/DropRescheduled';
import Cancelled from './Activities/Cancelled';
import FinalLogCreated from './Activities/FinalLogCreated';
import Dropped from './Activities/Dropped';
import Billed from './Activities/Billed';
import { Timeline } from 'components/ui';
import { format } from 'date-fns';
import { activityTypesEnum } from '../enum';
import MakeGood from './Activities/MakeGood';
import MakeGoodReschedule from './Activities/MakeGoodReschedule';

function DatewiseActivities({ datewiseActivities }) {
  return (
    <>
      {datewiseActivities.length > 0 ? (
        <div className="h-[90vh] overflow-y-auto no-scrollbar flex flex-col mt-1">
          {datewiseActivities.map((curDateActivities, index) => (
            <div
              className="flex flex-col"
              key={`${curDateActivities.date}-${index}`}
            >
              <div className="px-2 font-semibold uppercase dark:text-white  text-black sticky -top-px dark:!bg-gray-800  !bg-transparent  z-10 pb-3">
                {format(new Date(curDateActivities.date), 'EEE, d MMM yyyy')}
              </div>
              <Timeline className="grow overflow-auto">
                {curDateActivities.activities.map((activity) => {
                  switch (activity.type) {
                    case activityTypesEnum.scheduled:
                      return <Scheduled activity={activity} />;
                    case activityTypesEnum.replaced:
                      return <Replaced activity={activity} />;
                    case activityTypesEnum.rescheduled:
                      return <Rescheduled activity={activity} />;
                    case activityTypesEnum.bulkDropped:
                      return <BulkDropped activity={activity} />;
                    case activityTypesEnum.dropRescheduled:
                      return <DropRescheduled activity={activity} />;
                    case activityTypesEnum.makeGood:
                      return <MakeGood activity={activity} />;
                    case activityTypesEnum.makeGoodReschedule:
                      return <MakeGoodReschedule activity={activity} />;
                    case activityTypesEnum.cancelled:
                      return <Cancelled activity={activity} />;
                    case activityTypesEnum.finalLogCreated:
                      return <FinalLogCreated activity={activity} />;
                    case activityTypesEnum.dropped:
                      return (
                        <Dropped
                          activity={activity}
                          droppedFrom={'Commercial Scheduling'}
                        />
                      );
                    case activityTypesEnum.billed:
                      return <Billed activity={activity} />;
                  }
                })}
              </Timeline>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full border rounded-lg border-gray-700">
          <div className="h-full flex justify-center items-center">
            No activities to show
          </div>
        </div>
      )}
    </>
  );
}

export default DatewiseActivities;
