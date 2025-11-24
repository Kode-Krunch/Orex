import React, { useContext } from 'react';
import { Badge, Timeline, Avatar, Tooltip, Button } from 'components/ui';
import { MdListAlt } from 'react-icons/md';
import { format } from 'date-fns';
import ActivityLogContext from '../../context/ActivityLogContext';
import { BsInfoLg } from 'react-icons/bs';

function FinalLogCreated({ activity }) {
  /* CONTEXT */
  const { activityInfoData, setActivityInfoData } =
    useContext(ActivityLogContext);

  return (
    <Timeline.Item
      media={
        <Avatar size={33} shape="circle" className="!bg-emerald-600">
          <MdListAlt className="text-white" size="md" />
        </Avatar>
      }
      className={`px-2 transition-all ${
        activity.id === activityInfoData?.id
          ? 'bg-gray-700 rounded-md py-2 mb-1'
          : ''
      }`}
    >
      <p className="my-1 flex items-center flex-wrap">
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {activity.executerName}{' '}
        </span>
        <span className="mx-2">has created </span>
        <div
          className={`flex gap-2 items-center py-1 px-2 border ${
            activity.id !== activityInfoData?.id
              ? 'border-gray-700'
              : 'border-gray-600'
          } rounded-full`}
        >
          <Badge className="bg-emerald-500" />
          <span className="font-semibold text-gray-100">Final Log</span>
        </div>
        <span className="ml-3 mr-3">
          {format(new Date(activity.dateTime), 'hh:mm a')}
        </span>
        {activity.id !== activityInfoData?.id && (
          <Tooltip title="Show Info">
            <Button
              shape="circle"
              icon={<BsInfoLg className="text-xs" />}
              size="xs"
              className="!h-5 !w-5"
              onClick={() => setActivityInfoData(activity)}
            />
          </Tooltip>
        )}
      </p>
    </Timeline.Item>
  );
}

export default FinalLogCreated;
