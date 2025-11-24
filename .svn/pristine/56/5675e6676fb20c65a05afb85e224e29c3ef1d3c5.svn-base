import { Button, Card, Tooltip } from 'components/ui';
import React from 'react';
import { JSONData } from './JSONData';
import './Graph.css';

const transformData = (data) => {
  return data.reduce((acc, curr) => {
    const {
      Event_Name,
      Duration,
      F_C_S_P,
      EventDefaultFrontColor,
      EventDefaultBackColor,
      NTCTypeName,
      BreakNumber,
      OffsetStartTime,
    } = curr;

    // if (F_C_S_P !== 'NTC') return acc;

    let breakGroup = acc.find((item) => item.BreakNumber === BreakNumber);
    if (!breakGroup) {
      breakGroup = {
        Event_Name,
        Duration,
        F_C_S_P,
        EventDefaultFrontColor,
        EventDefaultBackColor,
        NTCTypeName: {},
        BreakNumber,
      };
      acc.push(breakGroup);
    }

    if (!breakGroup.NTCTypeName[NTCTypeName]) {
      breakGroup.NTCTypeName[NTCTypeName] = [];
    }

    breakGroup.NTCTypeName[NTCTypeName].push({
      OffsetStartTime,
      Event_Name,
      Duration,
      F_C_S_P,
      EventDefaultFrontColor,
      EventDefaultBackColor,
    });

    return acc;
  }, []);
};

const timeToSeconds = (time) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const NTCData = ({ data, mainDurationInSeconds }) => {
  console.log(data.NTCTypeName?.AST?.length);

  return (
    <>
      {data.NTCTypeName?.AST?.length != undefined && (
        <div
          className="mb-1 mt-1 "
          style={{
            position: 'relative',
            width: '100%',
            height: '25px',
          }}
        >
          {data.NTCTypeName?.AST?.map((item, index) => {
            const astonStartInSeconds = timeToSeconds(item.OffsetStartTime);
            const astonDurationInSeconds = timeToSeconds(
              item.Duration || '00:00:00',
            );

            const startPercent =
              (astonStartInSeconds / mainDurationInSeconds) * 100;
            const widthPercent =
              (astonDurationInSeconds / mainDurationInSeconds) * 100;

            return (
              <Tooltip title={item.Event_Name}>
                <div
                  key={index} // Use index as a key (may need to be unique)
                  className="flex justify-center items-center rounded btn-gradAST"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `${startPercent}%`,
                    width: `${widthPercent}%`,
                    backgroundColor: '#ad4bab',
                    color: 'white',
                    border: '1px solid #00000094',
                    height: '25px',
                  }}
                >
                  AST
                </div>
              </Tooltip>
            );
          })}
        </div>
      )}
      {data.NTCTypeName?.BUG?.length != undefined && (
        <div
          className="mb-1 mt-1"
          style={{
            position: 'relative',
            width: '100%',
            height: '25px',
          }}
        >
          {data.NTCTypeName?.BUG?.map((item, index) => {
            const astonStartInSeconds = timeToSeconds(item.OffsetStartTime);
            const astonDurationInSeconds = timeToSeconds(
              item.Duration || '00:00:00',
            );

            const startPercent =
              (astonStartInSeconds / mainDurationInSeconds) * 100;
            const widthPercent =
              (astonDurationInSeconds / mainDurationInSeconds) * 100;

            return (
              <Tooltip title={item.Event_Name}>
                <div
                  key={index} // Use index as a key (may need to be unique)
                  className="flex justify-center items-center rounded btn-gradBUG"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `${startPercent}%`,
                    width: `${widthPercent}%`,
                    backgroundColor: '#f4b861',
                    color: 'white',
                    border: '1px solid #00000094',
                    height: '25px',
                  }}
                >
                  {' '}
                  BUG
                </div>
              </Tooltip>
            );
          })}
        </div>
      )}
    </>
  );
};

const EventDiv = ({ item }) => {
  return (
    item.F_C_S_P != 'CT' && (
      <div
        className="flex justify-center items-center mb-1 rounded"
        style={{
          width: '100%',
          backgroundColor: item.EventDefaultBackColor,
          color: item.EventDefaultFrontColor,

          height: '25px',
          zIndex: 0,
        }}
      >
        <p className="ml-10">{item.Event_Name}</p>
        <p className="ml-10">{item.Duration}</p>
      </div>
    )
  );
};

const AstonDivs = ({ JSONData }) => {
  const transformedData = transformData(JSONData);

  return (
    <>
      {transformedData.map((item, key) => {
        const mainDurationInSeconds = timeToSeconds(item.Duration);

        return (
          <div key={key} className="mb-5 bg-black bg-opacity-40 rounded">
            <EventDiv item={item} />
            <NTCData
              data={item}
              mainDurationInSeconds={mainDurationInSeconds}
            />
          </div>
        );
      })}
    </>
  );
};

const NTC_Graph = ({ JSONData, setSelectedFPC, FPCData }) => {
  const FPCLAstTime = FPCData.filter((item) => item.F_C_S_P == 'CT');

  return (
    <Card>
      <h2 className="text-center font-bold">{JSONData[0].Event_Name}</h2>
      <div className="flex justify-end mb-2">
        {FPCLAstTime.map((minute) => (
          <Button
            key={minute}
            size="xs"
            className="ml-1 fpctimebtn"
            style={{
              backgroundColor:
                JSONData[0].FPC_ID == minute.FPC_ID
                  ? ' rgb(42, 166, 135)'
                  : '#b3ffec',
              color: 'black',
            }}
            onClick={() => {
              const SelectedFPC = FPCData.filter(
                (row) => row.FPC_ID == minute.FPC_ID,
              );
              setSelectedFPC(SelectedFPC);
            }}
          >
            {minute.FPC_Time}
          </Button>
        ))}
      </div>
      <AstonDivs JSONData={JSONData} />
    </Card>
  );
};

export default NTC_Graph;
