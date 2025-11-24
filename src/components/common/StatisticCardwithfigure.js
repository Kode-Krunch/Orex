import { Button } from 'components/ui';
import React from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const StatisticCardwithfigure = ({
  CardHeight,
  AnimateColorClass,
  Icon,
  CardName,
  CardNote,
  CardFigure,
  COLOR,
  Function,
  IsFunction,
  cursor,
  selected,
}) => {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <>
      <div
        className={
          `web-card animate__animated
         onlythis flex justify-center col-span-1 
          min-h-full !bg-${selected ? 'gray-700' : `[#1f2639]`}
          border-${selected ? 'gray-500' : `gray-600`}
          border` + ` ${cursor && 'cursor-pointer'}`
        }
        style={{ maxHeight: CardHeight }}
        onClick={() => {
          if (IsFunction) {
            Function(CardName);
          } else {
          }
        }}
      >
        <div className="card-bodyR">
          <div className="flex justify-between">
            <div className="flex ">
              {mode === 'dark' ? (
                <div
                  className={` animate__animated onlythis2 order ${AnimateColorClass}`}
                >
                  <span>{Icon}</span>
                </div>
              ) : (
                <Button
                  size="lg"
                  icon={Icon}
                  className={`!${COLOR} !bg-opacity-25 !border-transparent`}
                />
              )}
            </div>
            <div>
              <HiDotsHorizontal />
            </div>
          </div>
          <div className="flex-grow-1 mt-2">
            <span
              className={`text-lg font-extrabold dark:${
                selected ? '!text-white' : '!text-gray-400'
              } text-gray-500 `}
            >
              {CardName}
            </span>
            <h3
              className={`text-2xl dark:${
                selected ? '!text-white' : '!text-gray-400'
              } text-gray-500`}
            >
              {CardFigure}
            </h3>
          </div>
          <div className="mt-2">
            <p
              className={`text-xs dark:${
                selected ? '!text-white' : '!text-gray-400'
              } text-gray-500`}
            >
              {CardNote}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticCardwithfigure;
