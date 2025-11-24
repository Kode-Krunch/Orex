import { Card } from 'components/ui';
import React, { useContext, useEffect, useRef } from 'react';
import { IoIosMusicalNotes, IoMdClose } from 'react-icons/io';
import { IoPlay } from 'react-icons/io5';
import { LuFileClock } from 'react-icons/lu';
import { RiAdvertisementLine, RiLayoutBottom2Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { CLIENT } from 'views/Controls/clientListEnum';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import {
  featuresEnum,
  pagesEnum,
  rowDataTypesEnum,
  secondaryTableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';

function InsertEvents() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* CONDITION */
  const isChannelForbes = channel.label === CLIENT.USA_Forbes;

  /* CONTEXT */
  const {
    page,
    setActiveFeatures,
    dropBucket,
    lastMinuteSpots,
    droppedNtcs,
    schedulingTableData,
    resetSecondaryTableStates,
    setIsInsertLiveDialogOpen,
    leftClickedSchTableRow,
  } = useContext(SchedulerContext);

  /* HOOKS */
  const dropdownRef = useRef(null);

  /* USE EFFECTS */
  useEffect(() => {
    document.addEventListener('mousedown', closeDropDowns);
    return () => {
      document.removeEventListener('mousedown', closeDropDowns);
    };
  }, [dropdownRef]);

  /* EVENT HANDLERS */
  const handleInsert = (eventType) => {
    try {
      setActiveFeatures((prevState) => ({
        ...prevState,
        [featuresEnum.SUMMARY]: false,
        [featuresEnum.ROTATION_INFO]: false,
        [featuresEnum.ROTATION_INFO_WITH_MANAGE_COLUMNS]: false,
        [featuresEnum.RULE_CHECK]: false,
        [featuresEnum.CHANGE_PROGRAM]: false,
        [featuresEnum.MANAGE_SEGMENT]: false,
        [featuresEnum.HOURWISE_INVENTORY]: false,
        [featuresEnum.DURATION]: false,
        [featuresEnum.INSERT]: {
          ...prevState[featuresEnum.INSERT],
          isDropdownVisible: false,
          isActive: true,
          eventType,
        },
      }));
      resetSecondaryTableStates();
    } catch (error) {
      openNotification('danger', 'Something went wrong');
      console.error(error);
    }
  };

  const handleLiveClick = () => {
    setActiveFeatures((prevState) => ({
      ...prevState,
      [featuresEnum.INSERT]: {
        ...prevState[featuresEnum.INSERT],
        isDropdownVisible: false,
      },
    }));
    if (!leftClickedSchTableRow) {
      openNotification(
        'danger',
        'Please select any one event in log to insert Live Event',
      );
      return;
    }
    if (
      schedulingTableData[leftClickedSchTableRow.rowIndex + 1]?.F_C_S_P ===
      rowDataTypesEnum.NTC
    ) {
      openNotification('danger', 'Live Event cannot be inserted above NTC');
      return;
    }
    setIsInsertLiveDialogOpen(true);
  };

  const closeDropDowns = (event) => {
    try {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveFeatures((prevState) => ({
          ...prevState,
          [featuresEnum.INSERT]: {
            ...prevState[featuresEnum.INSERT],
            isDropdownVisible: false,
          },
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      className="!bg-gray-700 text-white mt-2 absolute right-1/2 top-full z-[100] w-56"
      bodyClass="px-0 pt-1.5"
      style={{ boxShadow: '#000000cc 0px 0px 10px' }}
      ref={dropdownRef}
    >
      <p className="text-base mb-1.5 px-3">Insert</p>
      <div className="h-[30vh] overflow-scroll no-scrollbar flex flex-col">
        {page === pagesEnum.COMMERCIAL && !isChannelForbes && (
          <>
            <div
              className="border-b border-b-gray-600 py-1.5 px-3 flex items-center justify-between gap-3 hover:bg-gray-600 hover:cursor-pointer transition-all"
              onClick={() =>
                handleInsert(secondaryTableTypesEnum.DROPPED_SPOTS)
              }
            >
              <div className="grow flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                  <IoMdClose className="text-base" />
                </span>
                <span>Dropped Spots</span>
              </div>
              {dropBucket.length - 1 > 0 && (
                <p className="text-white font-semibold py-1 px-2 bg-gray-600 border border-gray-700 rounded-md">
                  {dropBucket.length - 1}
                </p>
              )}
            </div>
            <div
              className="border-b border-b-gray-600 py-1.5 px-3 flex items-center justify-between gap-3 hover:bg-gray-600 hover:cursor-pointer transition-all"
              onClick={() =>
                handleInsert(secondaryTableTypesEnum.LAST_MINUTE_SPOTS)
              }
            >
              <div className="grow flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                  <LuFileClock className="text-base" />
                </span>
                <span>Last Minute Spots</span>
              </div>
              {lastMinuteSpots.length - 1 > 0 && (
                <p className="text-white font-semibold py-1 px-2 bg-gray-600 border border-gray-700 rounded-md">
                  {lastMinuteSpots.length - 1}
                </p>
              )}
            </div>
          </>
        )}
        {page === pagesEnum.NTC && (
          <>
            <div
              className="border-b border-b-gray-600 py-1.5 px-3 flex items-center gap-2 hover:bg-gray-600 hover:cursor-pointer transition-all"
              onClick={() => handleInsert(secondaryTableTypesEnum.NTC)}
            >
              <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                <RiLayoutBottom2Line className="text-base" />
              </span>
              <span>NTC</span>
            </div>
            {!isChannelForbes && (
              <>
                <div
                  className="border-b border-b-gray-600 py-1.5 px-3 flex items-center gap-2 hover:bg-gray-600 hover:cursor-pointer transition-all"
                  onClick={() =>
                    handleInsert(secondaryTableTypesEnum.DROPPED_NTC)
                  }
                >
                  <div className="grow flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                      <IoMdClose className="text-base" />
                    </span>
                    <span>Dropped NTC</span>
                  </div>
                  {droppedNtcs.length - 1 > 0 && (
                    <p className="text-white font-semibold py-1 px-2 bg-gray-600 border border-gray-700 rounded-md">
                      {droppedNtcs.length - 1}
                    </p>
                  )}
                </div>
                <div
                  className="border-b border-b-gray-600 py-1.5 px-3 flex items-center gap-2 hover:bg-gray-600 hover:cursor-pointer transition-all"
                  onClick={() =>
                    handleInsert(secondaryTableTypesEnum.LAST_MINUTE_NTC)
                  }
                >
                  <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                    <LuFileClock className="text-base" />
                  </span>
                  <span>Last Minute NTC</span>
                </div>
              </>
            )}
          </>
        )}
        {page === pagesEnum.FINAL_LOG && (
          <>
            <div
              className="border-b border-t border-gray-600 py-1.5 px-3 flex items-center gap-2 hover:bg-gray-600 hover:cursor-pointer transition-all"
              onClick={() => handleInsert(secondaryTableTypesEnum.PROMO)}
            >
              <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                <RiAdvertisementLine className="text-base" />
              </span>
              <span>{isChannelForbes ? 'Content' : 'Promo'}</span>
            </div>
            {!isChannelForbes && (
              <>
                <div
                  className="border-b border-b-gray-600 py-1.5 px-3 flex items-center gap-2 hover:bg-gray-600 hover:cursor-pointer transition-all"
                  onClick={() => handleInsert(secondaryTableTypesEnum.SONG)}
                >
                  <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                    <IoIosMusicalNotes className="text-base" />
                  </span>
                  <span>Song</span>
                </div>
                <div
                  className="border-b border-b-gray-600 py-1.5 px-3 flex items-center justify-between gap-3 hover:bg-gray-600 hover:cursor-pointer transition-all"
                  onClick={() =>
                    handleInsert(secondaryTableTypesEnum.DROPPED_SPOTS)
                  }
                >
                  <div className="grow flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                      <IoMdClose className="text-base" />
                    </span>
                    <span>Dropped Spots</span>
                  </div>
                  {dropBucket.length - 1 > 0 && (
                    <p className="text-white font-semibold py-1 px-2 bg-gray-600 border border-gray-700 rounded-md">
                      {dropBucket.length - 1}
                    </p>
                  )}
                </div>
                <div
                  className="border-b border-b-gray-600 py-1.5 px-3 flex items-center justify-between gap-3 hover:bg-gray-600 hover:cursor-pointer transition-all"
                  onClick={() =>
                    handleInsert(secondaryTableTypesEnum.LAST_MINUTE_SPOTS)
                  }
                >
                  <div className="grow flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                      <LuFileClock className="text-base" />
                    </span>
                    <span>Last Minute Spots</span>
                  </div>
                  {lastMinuteSpots.length - 1 > 0 && (
                    <p className="text-white font-semibold py-1 px-2 bg-gray-600 border border-gray-700 rounded-md">
                      {lastMinuteSpots.length - 1}
                    </p>
                  )}
                </div>
              </>
            )}
            <div
              className="border-b border-b-gray-600 py-1.5 px-3 flex items-center gap-2 hover:bg-gray-600 hover:cursor-pointer transition-all"
              onClick={() => handleInsert(secondaryTableTypesEnum.NTC)}
            >
              <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                <RiLayoutBottom2Line className="text-base" />
              </span>
              <span>NTC</span>
            </div>
            {!isChannelForbes && (
              <>
                <div
                  className="border-b border-b-gray-600 py-1.5 px-3 flex items-center gap-2 hover:bg-gray-600 hover:cursor-pointer transition-all"
                  onClick={() =>
                    handleInsert(secondaryTableTypesEnum.DROPPED_NTC)
                  }
                >
                  <div className="grow flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                      <IoMdClose className="text-base" />
                    </span>
                    <span>Dropped NTC</span>
                  </div>
                  {droppedNtcs.length - 1 > 0 && (
                    <p className="text-white font-semibold py-1 px-2 bg-gray-600 border border-gray-700 rounded-md">
                      {droppedNtcs.length - 1}
                    </p>
                  )}
                </div>
                <div
                  className="border-b border-b-gray-600 py-1.5 px-3 flex items-center gap-2 hover:bg-gray-600 hover:cursor-pointer transition-all"
                  onClick={() =>
                    handleInsert(secondaryTableTypesEnum.LAST_MINUTE_NTC)
                  }
                >
                  <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                    <LuFileClock className="text-base" />
                  </span>
                  <span>Last Minute NTC</span>
                </div>
              </>
            )}
            {isChannelForbes && (
              <div
                className="border-b border-b-gray-600 py-1.5 px-3 flex items-center gap-2 hover:bg-gray-600 hover:cursor-pointer transition-all"
                onClick={handleLiveClick}
              >
                <span className="h-8 w-8 rounded-full bg-gray-600 border border-gray-700 flex items-center justify-center">
                  <IoPlay className="text-[0.925rem] ml-0.5" />
                </span>
                <span>Live</span>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}

export default InsertEvents;
