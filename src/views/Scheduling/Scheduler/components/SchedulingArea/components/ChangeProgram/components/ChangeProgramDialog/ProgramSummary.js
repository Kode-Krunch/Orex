import React, { useEffect, useState } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { rowDataTypesEnum } from 'views/Scheduling/Scheduler/enum';

function ProgramSummary({ programData, type }) {
  /* STATES */
  const [segments, setSegments] = useState([]);
  const [promos, setPromos] = useState([]);
  const [commercials, setCommercials] = useState([]);
  const [songs, setSongs] = useState([]);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (programData.length > 0) {
        let promos = [];
        let commercials = [];
        let songs = [];
        let segments = [];
        for (let index = 0; index < programData.length; index++) {
          if (programData[index].F_C_S_P === rowDataTypesEnum.PROMO) {
            promos.push(programData[index]);
          } else if (
            programData[index].F_C_S_P === rowDataTypesEnum.COMMERCIAL
          ) {
            commercials.push(programData[index]);
          } else if (programData[index].F_C_S_P === rowDataTypesEnum.SONG) {
            songs.push(programData[index]);
          } else if (programData[index].F_C_S_P === rowDataTypesEnum.SEGMENT) {
            segments.push(programData[index]);
          }
        }
        setPromos(promos);
        setCommercials(commercials);
        setSongs(songs);
        setSegments(segments);
      }
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetching program info',
      );
      console.error(error);
    }
  }, [programData]);

  return (
    <>
      {programData.length > 0 && (
        <div className="w-full h-full">
          <div className="text-base font-semibold text-white mb-3">
            {type === 'existingProgram' ? 'Existing Program' : 'New Program'}
          </div>
          <div className="rounded-md border border-gray-700">
            <div
              className="p-2 text-[0.95rem] font-semibold text-gray-200 rounded-t-md text-ellipsis overflow-hidden whitespace-nowrap"
              style={{ background: 'rgb(41, 52, 69)' }}
            >
              {programData[0].Event_Name}
            </div>
            <div className="flex flex-col gap-2 p-2 h-[45vh] overflow-y-auto">
              {segments.map((segment, index) => (
                <div
                  key={index}
                  className={`flex gap-2 items-center p-2 ${
                    index !== segment.length - 1 && 'border-b border-b-gray-700'
                  }`}
                >
                  <div className="h-2 w-2 bg-gray-600  rounded-full"></div>
                  <span className="text-gray-200 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                    {segment.Event_Name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="flex mt-4 p-2 rounded-md"
            style={{ background: 'rgb(41, 52, 69)' }}
          >
            <div className="flex flex-col justify-center items-center border-r border-gray-600 pr-3 pl-1">
              <p className="font-semibold text-lg text-gray-200">
                {promos.length}
              </p>
              <p className="text-gray-300">Promos</p>
            </div>
            <div className="flex flex-col justify-center items-center border-r border-gray-600 px-3">
              <p className="font-semibold text-lg text-gray-200">
                {commercials.length}
              </p>
              <p className="text-gray-300">Commercials</p>
            </div>
            <div className="flex flex-col justify-center items-center border-r border-gray-600 px-3">
              <p className="font-semibold text-lg text-gray-200">
                {songs.length}
              </p>
              <p className="text-gray-300">Songs</p>
            </div>
            <div className="flex flex-col justify-center items-center px-3">
              <p className="font-semibold text-lg text-gray-200">
                {segments.length}
              </p>
              <p className="text-gray-300">Segments</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProgramSummary;
