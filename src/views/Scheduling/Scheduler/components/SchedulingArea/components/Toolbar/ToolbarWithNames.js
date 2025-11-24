import { Tooltip } from 'components/ui';
import React, { useContext } from 'react';
import { BiRedo, BiUndo } from 'react-icons/bi';
import { CgInsertAfterR, CgLockUnlock, CgMaximizeAlt } from 'react-icons/cg';
import { IoFilterSharp, IoLogoTableau } from 'react-icons/io5';
import {
  MdContentCopy,
  MdOutlineDashboard,
  MdOutlineRestore,
  MdOutlineViewTimeline,
} from 'react-icons/md';
import { PiExportBold } from 'react-icons/pi';
import { RiDragMoveFill, RiLayoutBottom2Line } from 'react-icons/ri';
import {
  TbBoxMultiple2,
  TbClockHour4,
  TbGridDots,
  TbRefreshDot,
} from 'react-icons/tb';
import SchedulerContext from '../../../../context/SchedulerContext';
import { pagesEnum } from '../../../../enum';

function Toolbar() {
  /* CONTEXT */
  const { page, featuresList } = useContext(SchedulerContext);

  return (
    <>
      {featuresList && (
        <div className="bg-gray-800 flex py-2 px-2 rounded-lg border border-gray-600 mt-2">
          {featuresList.undo && (
            <Tooltip
              title="Undo"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <BiUndo className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Undo</p>
            </Tooltip>
          )}
          {featuresList.redo && (
            <Tooltip
              title="Redo"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <BiRedo className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Redo</p>
            </Tooltip>
          )}
          {featuresList.manageColumns && (
            <Tooltip
              title="Manage Columns"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <TbGridDots className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Manage Columns</p>
            </Tooltip>
          )}
          {featuresList.segmentMove && (
            <Tooltip
              title="Segment Move"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <RiDragMoveFill className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Segment Move</p>
            </Tooltip>
          )}
          {featuresList.copy && (
            <Tooltip
              title="Copy"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <MdContentCopy className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Copy</p>
            </Tooltip>
          )}
          {featuresList.generateLog && (
            <Tooltip
              title="Generate Log"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <IoLogoTableau className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Generate Log</p>
            </Tooltip>
          )}
          {featuresList.export && (
            <Tooltip
              title="Export"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <PiExportBold className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Export</p>
            </Tooltip>
          )}
          {featuresList.maximize && (
            <Tooltip
              title="Maximize"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <CgMaximizeAlt className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Maximize</p>
            </Tooltip>
          )}
          {featuresList.filter && (
            <Tooltip
              title="Filter"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <IoFilterSharp className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Filter</p>
            </Tooltip>
          )}
          {featuresList.showNtc && (
            <Tooltip
              title="Show NTC"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <RiLayoutBottom2Line className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Show NTC</p>
            </Tooltip>
          )}
          {featuresList.finalize && (
            <Tooltip
              title="Finalize"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <CgLockUnlock className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Finalize</p>
            </Tooltip>
          )}
          {featuresList.restoreSavedWork && (
            <Tooltip
              title="Restore"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <MdOutlineRestore className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Restore</p>
            </Tooltip>
          )}
          {featuresList.rotationInfo && (
            <Tooltip
              title="Rotation Info"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <TbBoxMultiple2 className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Rotation Info</p>
            </Tooltip>
          )}
          {featuresList.duration && (
            <Tooltip
              title="Duration"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <MdOutlineViewTimeline className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Duration</p>
            </Tooltip>
          )}
          {featuresList.summary && (
            <Tooltip
              title="Summary"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <MdOutlineDashboard className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Summary</p>
            </Tooltip>
          )}
          {featuresList.refreshDuration && (
            <Tooltip
              title="Refresh Duration"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <TbRefreshDot className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Refresh Duration</p>
            </Tooltip>
          )}
          {featuresList.showTime && (
            <Tooltip
              title="Show Time"
              wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
            >
              <TbClockHour4 className="text-xl text-gray-200" />
              <p className="text-gray-200 text-xs">Show Time</p>
            </Tooltip>
          )}
          {featuresList.insert && (
            <>
              {page === pagesEnum.PROMO && (
                <Tooltip
                  title="Insert Promo"
                  wrapperClass="flex flex-col justify-center items-center px-2 border-r border-r-gray-600"
                >
                  <CgInsertAfterR className="text-xl text-gray-200" />
                  <p className="text-gray-200 text-xs">Insert Promo</p>
                </Tooltip>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Toolbar;
