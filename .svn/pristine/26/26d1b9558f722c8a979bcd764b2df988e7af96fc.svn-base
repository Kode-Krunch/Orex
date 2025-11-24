import React from 'react';
import Segment from 'components/ui/Segment';
import { monthNames } from 'views/Controls/GLOBALFUNACTION';

function DateSelector({ datesRange, selectedDate, setSelectedDate }) {
  /* EVENT HANDLERS */
  const handleDateChange = (dateValue, onSegmentItemClick) => {
    try {
      onSegmentItemClick();
      setSelectedDate(
        datesRange.filter((date) => date.value === dateValue)[0].date,
      );
    } catch (error) {
      console.error(error);
    }
  };
  console.log(datesRange);

  return (
    <Segment
      defaultValue={[
        selectedDate.getDate() < 10
          ? `0${selectedDate.getDate()}`
          : `${selectedDate.getDate()}`,
      ]}
      className="flex justify-between"
    >
      {datesRange.map((curDate) => (
        <Segment.Item key={curDate.value} value={curDate.value}>
          {({ active, value, onSegmentItemClick }) => {
            return (
              <div
                className={`flex flex-col justify-center items-center cursor-pointer rounded-md w-14 h-14 transition hover:bg-teal-700 ${
                  active ? 'bg-teal-700' : 'bg-gray-700'
                }`}
                onClick={() => handleDateChange(value, onSegmentItemClick)}
              >
                <p
                  className="text-gray-300 text-[12px] font-medium "
                  translate="no"
                >
                  {curDate.day}
                </p>
                <p className="text-gray-300 text-[16px] font-semibold leading-none my-[0.5px]">
                  {value}
                </p>
                <p
                  className="text-gray-300 text-[10px] font-medium "
                  translate="no"
                >
                  {curDate?.date &&
                    monthNames[new Date(curDate?.date).getMonth()]}
                </p>
              </div>
            );
          }}
        </Segment.Item>
      ))}
    </Segment>
  );
}

export default DateSelector;
