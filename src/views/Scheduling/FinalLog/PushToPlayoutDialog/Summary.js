import { Card } from 'components/ui';
import React from 'react';
import { CgPlayListRemove } from 'react-icons/cg';
import { IoIosTimer, IoMdTime } from 'react-icons/io';
import { LuFlipHorizontal, LuListEnd } from 'react-icons/lu';
import { MdFormatListBulleted } from 'react-icons/md';
import { RiListOrdered2 } from 'react-icons/ri';

function Summary({
  CountData,
  Commercial_scheduling_Counts,
  TotalBreaks,
  totalDuration,
  blankTxLogCount,
}) {
  return (
    <Card
      bordered={false}
      className="h-full"
      bodyClass="h-full flex flex-col p-3 overflow-y-auto"
      style={{ backgroundColor: 'rgb(39 50 65)' }}
    >
      <div className="pb-3 border-b border-dashed border-b-gray-600 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 bg-opacity-80 flex justify-center items-center">
            <MdFormatListBulleted className="text-lg text-white ml-0.5" />
          </div>
          <p className="text-white text-[0.9rem]">Total Spots</p>
        </div>
        <div className="rounded-md bg-slate-600  font-semibold text-white text-base py-1 px-2">
          {CountData.Commercial2.length}
        </div>
      </div>
      <div className="py-3 border-b border-dashed border-b-gray-600 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 bg-opacity-80 flex justify-center items-center">
            <MdFormatListBulleted className="text-lg text-white ml-0.5" />
          </div>
          <p className="text-white text-[0.9rem]">Total Schedule</p>
        </div>
        <div className="rounded-md bg-slate-600 font-semibold text-white text-base py-1 px-2">
          {CountData.NTC.length}
        </div>
      </div>
      <div className="py-3 border-b border-dashed border-b-gray-600 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 bg-opacity-80 flex justify-center items-center">
            <CgPlayListRemove className="text-[1.45rem] text-white ml-1 mt-0.5" />
          </div>
          <p className="text-white text-[0.9rem]">Total Drop</p>
        </div>
        <div className="rounded-md bg-slate-600 font-semibold text-white text-base py-1 px-2">
          {Commercial_scheduling_Counts[3]?.FieldValue}
        </div>
      </div>
      <div className="py-3 border-b border-dashed border-b-gray-600 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 bg-opacity-80 flex justify-center items-center">
            <IoIosTimer className="text-xl text-white" />
          </div>
          <p className="text-white text-[0.9rem]">Total Last Minute Spots</p>
        </div>
        <div className="rounded-md bg-slate-600 font-semibold text-white text-base py-1 px-2">
          {Commercial_scheduling_Counts[4]?.FieldValue}
        </div>
      </div>
      <div className="py-3 border-b border-dashed border-b-gray-600 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 bg-opacity-80 flex justify-center items-center">
            <LuFlipHorizontal className="text-xl text-white rotate-90" />
          </div>
          <p className="text-white text-[0.9rem]">Total Breaks</p>
        </div>
        <div className="rounded-md bg-slate-600 font-semibold text-white text-base py-1 px-2">
          {TotalBreaks}
        </div>
      </div>
      <div className="py-3 border-b border-dashed border-b-gray-600 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-teal-600 flex justify-center items-center">
            <RiListOrdered2 className="text-lg text-white" />
          </div>
          <p className="text-white text-[0.9rem]">Back To Back</p>
        </div>
        <div className="rounded-md bg-slate-600 font-semibold text-white text-base py-1 px-2">
          {blankTxLogCount}
        </div>
      </div>
      {/* <div className="py-3 border-b border-dashed border-b-gray-600 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-red-600 bg-opacity-80 flex justify-center items-center">
            <LuListEnd className="text-lg text-white" />
          </div>
          <p className="text-white text-[0.9rem]">Out Of RODP</p>
        </div>
        <div className="rounded-md bg-slate-600 font-semibold text-white text-base py-1 px-2">
          50
        </div>
      </div> */}

      <div className="py-3 border-b border-dashed border-b-gray-600 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-yellow-600 flex justify-center items-center">
            <IoMdTime className="text-xl text-white" />
          </div>
          <p className="text-white text-[0.9rem] flex items-center">
            Commercial Duration{' '}
            <p className="text-[0.70rem] ml-1 text-yellow-500 mt-1">(Sec)</p>
          </p>
        </div>
        <div className="rounded-md bg-slate-600 font-semibold text-white text-base py-1 px-2">
          {totalDuration}
        </div>
      </div>
    </Card>
  );
}

export default Summary;
