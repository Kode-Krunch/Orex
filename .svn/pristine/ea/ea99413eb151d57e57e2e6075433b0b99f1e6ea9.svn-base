import { Button } from 'components/ui';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import TypeCounts from './TypeCounts';

function Summary({ arrayCounts, typewiseSummary, setShowTables }) {
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
      <div className="flex justify-between items-center mb-3">
        <h5>Content Types Summary</h5>
        <Button
          icon={<GiHamburgerMenu />}
          onClick={() => setShowTables(true)}
          size="sm"
          variant="solid"
        >
          {'View Contents'}
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
        {Object.keys(typewiseSummary).map((type) => (
          <div
            className="rounded-lg p-3 flex flex-col gap-2"
            style={{ backgroundColor: 'rgb(41 52 69)' }}
            key={type}
          >
            <h6 className="font-semibold">{type}</h6>
            <TypeCounts
              name="Success"
              value={
                typewiseSummary[type].filter((item) => item.Statuscode === 1)
                  .length
              }
            />
            <TypeCounts
              name="Failed"
              value={
                typewiseSummary[type].filter((item) => item.Statuscode === 0)
                  .length
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Summary;
