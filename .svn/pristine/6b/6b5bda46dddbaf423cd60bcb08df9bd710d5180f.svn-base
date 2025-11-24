import { Button } from 'components/ui';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import TypeCounts from './TypeCounts';

function Summary({ fileArray, arrayCounts, typewiseSummary, setShowTables }) {
  return (
    <>
      <div className="mb-6">
        <h5 className="mb-2">Summary</h5>
        <div
          className="flex justify-between p-3 rounded-lg"
          style={{ backgroundColor: 'rgb(41 52 69)' }}
        >
          {arrayCounts.map((item, index) => (
            <div
              key={item.key}
              className={`w-full text-center ${
                index === 0
                  ? 'pr-2'
                  : index === arrayCounts.length - 1
                  ? 'pl-2'
                  : 'px-2'
              }`}
              style={{
                borderRight:
                  index === arrayCounts.length - 1
                    ? ''
                    : '1px solid rgb(55 65 81)',
              }}
            >
              <p className="text-[14.5px] text-gray-300">{item.key}</p>
              <p className={`text-white text-[15px] font-semibold`}>
                {item.value.length}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h5>Date wise Summary</h5>
        <Button
          icon={<GiHamburgerMenu />}
          onClick={() => setShowTables(true)}
          size="sm"
          variant="solid"
        >
          {'View Contents'}
        </Button>
      </div>
      <div className="rounded-lg gap-3 grid grid-cols-4">
        {Object.entries(
          fileArray.reduce((acc, item) => {
            const date = item.TelecastDate;
            const isSuccess = item.statuscode === 1;

            if (!acc[date]) {
              acc[date] = { Success: 0, Failed: 0 };
            }

            if (isSuccess) {
              acc[date].Success += 1;
            } else {
              acc[date].Failed += 1;
            }

            return acc;
          }, {}),
        ).map(([date, counts]) => (
          <div
            key={date}
            className="rounded-lg p-3 "
            style={{
              backgroundColor: 'rgb(41 52 69)',
            }}
          >
            <h6 className="font-semibold">{date}</h6>
            <TypeCounts name="Success" value={counts.Success} />
            <TypeCounts name="Failed" value={counts.Failed} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Summary;
