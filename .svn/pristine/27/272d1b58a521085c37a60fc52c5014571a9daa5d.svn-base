import React from 'react';
import { Avatar, Progress } from 'components/ui';
import { BsDatabaseFill } from 'react-icons/bs';
import { TW_COLORS } from './constants/tw_colors';
import CountdownTimer from './CountdownTimer';
import { useSelector } from 'react-redux';

function StorageStatusCard({
  lastBackupTimestamp,
  storageDetails = {},
  tabContentMaxHeight,
  isDisplayBackup,
}) {
  const { totalStorage, storageUnit, usedStorage, usedPercent } =
    storageDetails;
  return (
    <div
      className="web-card mb-0 p-3 px-5 dark:!bg-[#1f2639] !bg-[#fff] "
      style={{
        height: 200,
        maxHeight: tabContentMaxHeight,
        minHeight: '100%',
      }}
    >
      <h5 className="pb-2 mb-2 border-b border-gray-700  flex items-center">
        <BsDatabaseFill className="mr-2" size={23} /> Storage
      </h5>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 justify-between items-center">
          <div className="grow">
            <div className="flex items-center justify-between mb-2 dark:text-gray-200 text-gray-800">
              <p className="dark:text-gray-200 text-gray-800">DB Usage</p>
              <p>
                {totalStorage} {storageUnit}
              </p>
            </div>
            <Progress
              percent={usedPercent}
              size="md"
              color="red-500"
              customInfo={<></>}
            />
            <p className="mt-2 text-sm text-gray-400">
              {usedStorage} MB of {totalStorage} {storageUnit} used
            </p>
          </div>
          <div className="flex">
            <div className="animate__animated onlythis2 order order1">
              <span>
                <BsDatabaseFill
                  style={{ fontSize: 30, color: TW_COLORS.red['500'] }}
                />
              </span>
            </div>
          </div>
        </div>
        {isDisplayBackup && (
          <div className="mb-4 pt-2" style={{ borderTop: '1px solid #606468' }}>
            <h5 className="text-gray-800 dark:text-gray-200 mb-0.5">
              Last Backup
            </h5>
            <div className="pt-1 flex items-center justify-between">
              <div className="pt-1 flex items-center ">
                <Avatar className="mr-2 dark:bg-emerald-500 bg-emerald-500 text-[1rem] font-semibold">
                  {lastBackupTimestamp?.split(' ')[1].replace(',', '')}
                </Avatar>{' '}
                <div>
                  <div>
                    <p className="font-semibold  text-gray-800 dark:text-gray-200">
                      {lastBackupTimestamp}
                    </p>
                    <p className="text-[0.8rem] text-gray-800 dark:text-gray-200">
                      Backup
                    </p>
                  </div>
                </div>
              </div>{' '}
            </div>
            <div className="mt-2">
              <h5 className=" mb-2 text-gray-800 dark:text-gray-200">
                Next Backup
              </h5>
              <CountdownTimer date={''} Name="Admin" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StorageStatusCard;
