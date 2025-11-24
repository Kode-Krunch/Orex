import React, { useContext } from 'react';
import { Badge, Timeline, Avatar, Card, Tooltip, Button } from 'components/ui';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { format } from 'date-fns';
import ActivityLogContext from '../../context/ActivityLogContext';
import { BsInfoLg } from 'react-icons/bs';

const additionalInfo = [
  {
    spots: 60,
    prevSpot: 'Colgate Max Fresh',
    newSpot: 'Colgate Strong Teeth',
  },
  {
    spots: 60,
    prevSpot: 'Dabur Lal Toothpaste',
    newSpot: 'Dabur Amla Hair Oil',
  },
];

function Replaced({ activity }) {
  /* CONTEXT */
  const { activityInfoData, setActivityInfoData } =
    useContext(ActivityLogContext);

  return (
    <Timeline.Item
      media={
        <Avatar size={33} shape="circle" className="!bg-amber-600">
          <HiOutlineSwitchHorizontal className="text-white" size="md" />
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
          {activity.executerName}
        </span>
        <span className="mx-2">has replaced </span>
        <div
          className={`flex gap-2 items-center py-1 px-2 border ${
            activity.id !== activityInfoData?.id
              ? 'border-gray-700'
              : 'border-gray-600'
          } rounded-full`}
        >
          <Badge className="bg-amber-500" />
          <span className="font-semibold text-gray-100">
            {activity.spots} Spots
          </span>
        </div>
        <span className="ml-3 rtl:mr-3">
          {format(new Date(activity.dateTime), 'hh:mm a')}
        </span>
      </p>
      <Card
        className="mt-4"
        bodyClass="flex flex-col gap-1 p-3 min-h-[4rem] justify-center"
      >
        {additionalInfo.map((info, index) => {
          return (
            <div className="flex gap-2 items-center">
              <Badge
                className="bg-gray-500"
                badgeStyle={{ height: '6px', width: '6px' }}
              />
              <p key={index}>
                <span className="font-semibold text-gray-300">
                  {info.spots}
                </span>{' '}
                spots of{' '}
                <span className="font-semibold text-gray-300">
                  {info.prevSpot}
                </span>{' '}
                has been replaced with{' '}
                <span className="font-semibold text-gray-300 mr-3">
                  {info.newSpot}
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
            </div>
          );
        })}
      </Card>
    </Timeline.Item>
  );
}

export default Replaced;
