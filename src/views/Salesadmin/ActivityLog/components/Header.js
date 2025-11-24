import { Button, Tooltip } from 'components/ui';
import React, { useContext, useState } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import ActivityLogContext from '../context/ActivityLogContext';
import { format } from 'date-fns';
import { searchTypeEnum } from '../enum';
import { BsInfoLg } from 'react-icons/bs';
import DealDetailsDialog from 'views/Controls/DealDetailsDialog/DealDetailsDialog';

function Header() {
  /* CONTEXT */
  const { setIsSearchDialogOpen, setSearchType, formState, staticInfo } =
    useContext(ActivityLogContext);

  /* STATES */
  const [isDealDetailsDialogOpen, setIsDealDetailsDialogOpen] = useState(false);

  /* EVENT HANDLERS */
  const handleSearch = (searchType) => {
    try {
      setIsSearchDialogOpen(true);
      setSearchType(searchType);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <p>Client</p>
          <Tooltip
            title={formState.client ? 'Edit Client' : 'Select Client'}
            wrapperClass="w-full"
          >
            <div
              className="w-full text-gray-200 flex justify-between items-center gap-2 bg-gray-700 p-2 rounded-md hover:bg-gray-600 hover:cursor-pointer transition-all"
              onClick={() => handleSearch(searchTypeEnum.client)}
            >
              {formState.client ? (
                <p className="font-semibold w-[90%]">
                  {formState.client.label}
                </p>
              ) : (
                <p className="w-[90%] text-gray-300">Select</p>
              )}
              <BiSolidEdit className="text-lg grow" />
            </div>
          </Tooltip>
        </div>
        <div>
          <p>Booking</p>
          <Tooltip
            title={formState.booking ? 'Edit Booking' : 'Select Booking'}
            wrapperClass="w-full"
          >
            {formState.client ? (
              <div
                className="w-full flex justify-between items-center gap-2 bg-gray-700 p-2 rounded-md hover:bg-gray-600 hover:cursor-pointer transition-all text-gray-200"
                onClick={() => handleSearch(searchTypeEnum.booking)}
              >
                {formState.booking ? (
                  <p className="font-semibold w-[90%]">
                    {formState.booking.label}
                  </p>
                ) : (
                  <p className="w-[90%] text-gray-300">Select</p>
                )}
                <BiSolidEdit className="text-lg grow" />
              </div>
            ) : (
              <div className="w-full flex justify-between items-center gap-2 bg-gray-700 p-2 rounded-md hover:bg-gray-600 transition-all hover:cursor-not-allowed text-gray-500">
                Select
              </div>
            )}
          </Tooltip>
        </div>
        {staticInfo && (
          <>
            {staticInfo.agency && (
              <div>
                <p>Agency</p>
                <p className="font-semibold  dark:text-gray-100  text-black">
                  {staticInfo.agency.agencyName}
                </p>
              </div>
            )}
            {staticInfo.deal && (
              <div>
                <p>Deal</p>
                <div className="flex gap-3">
                  <p className="font-semibold  dark:text-gray-100  text-black text-[16px]">
                    {staticInfo.deal.dealCode}
                  </p>
                  <Tooltip title="Show Details">
                    <Button
                      shape="circle"
                      icon={<BsInfoLg className="text-xs" />}
                      size="xs"
                      className="!h-5 !w-5"
                      onClick={() => setIsDealDetailsDialogOpen(true)}
                    />
                  </Tooltip>
                </div>
              </div>
            )}
            {staticInfo.bookingDuration && (
              <div>
                <p>Booking Duration</p>
                <p className="font-semibold  dark:text-gray-100  text-black">
                  {format(
                    new Date(staticInfo.bookingDuration.startDate),
                    'dd-MMM-yyyy',
                  )}{' '}
                  to{' '}
                  {format(
                    new Date(staticInfo.bookingDuration.endDate),
                    'dd-MMM-yyyy',
                  )}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      {staticInfo.deal && (
        <DealDetailsDialog
          isDialogOpen={isDealDetailsDialogOpen}
          setIsDialogOpen={setIsDealDetailsDialogOpen}
          dealNumber={staticInfo.deal.dealNumber}
          dealCode={staticInfo.deal.dealCode}
        />
      )}
    </>
  );
}

export default Header;
