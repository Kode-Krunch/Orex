import { Progress } from 'components/ui';
import React, { useEffect, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CurrencyFormatter } from '../GLOBALFUNACTION';

function LineBifurcationCard({
  title,
  total,
  data,
  setCurrentDate,
  currentDate,
}) {
  //Constant

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setDate(previousMonth.getDate() - 1);
    previousMonth.setMonth(previousMonth.getMonth());
    setCurrentDate(previousMonth);
  };
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setDate(nextMonth.getDate() + 1);
    nextMonth.setMonth(nextMonth.getMonth());
    setCurrentDate(nextMonth);
  };

  const color = [
    { color: 'blue-500' },
    { color: 'yellow-500' },
    { color: 'green-500' },
    { color: 'red-500' },
  ];
  return (
    <div className="h-full flex flex-col">
      <h4 className="mb-4">{title}</h4>

      <div className="flex justify-between items-center col-span-3 mb-2">
        <div
          className="p-2 rounded hover:bg-sky-700  cursor-pointer"
          onClick={handlePreviousMonth}
        >
          <FaChevronLeft />
        </div>
        <div className="flex mb-0 mt-0">
          <p
            style={{
              fontSize: 16,
              // color: 'wheat',
              fontWeight: '600',
            }}
            className="dark:!text-amber-400 !text-amber-400 "
          >
            {currentDate.toLocaleDateString('en-US', {
              weekday: 'long',
            })}
          </p>

          <p
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginLeft: 5,
            }}
            className="dark:!text-gray-400 !text-gray-600"
          >
            ,{' '}
            {currentDate.toLocaleDateString('en-US', {
              day: 'numeric',
            })}{' '}
            {currentDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </p>
        </div>
        <div
          className="p-2 rounded hover:bg-sky-700  cursor-pointer"
          onClick={handleNextMonth}
        >
          <FaChevronRight />
        </div>
      </div>

      <div className="grow overflow-hidden hover:overflow-y-scroll mt-2">
        {data.map((curData, index) => (
          <div className={index !== 0 ? 'mt-5' : ''}>
            <div className="flex items-center mb-2">
              <h6 className="text-sm">
                {<CurrencyFormatter amountString={curData.RevenueAmount} />}
              </h6>
              <p
                className="ml-2 font-regular"
                style={{ fontSize: 13, color: '#9B9B9B' }}
              >
                ({curData.FieldType})
              </p>
            </div>
            <Progress
              percent={(curData.RevenueAmount * total.value) / 100}
              color={color[index]?.color}
              customInfo={<></>}
            />
          </div>
        ))}
      </div>
      <div className="flex items-baseline mb-1 mt-2">
        <h6
          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          className="font-semibold text-xl"
        >
          {<CurrencyFormatter amountString={total.value} />}
        </h6>
        <p
          className="ml-2 font-regular text-sm"
          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
        >
          ({total.label})
        </p>
      </div>
    </div>
  );
}

export default LineBifurcationCard;
