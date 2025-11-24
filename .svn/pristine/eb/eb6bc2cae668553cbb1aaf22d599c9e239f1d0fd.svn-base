import { Button, Progress } from 'components/ui';
import React from 'react';
import { HiDotsHorizontal, HiOutlineIdentification } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const HeaderCardDealMaster = ({
  item,
  setIsCustomCardVisible,
  setCustomCardName,
  getDealMasterData,
  statusCount,
  percent,
  handleClickFn,
}) => {
  const mode = useSelector((state) => state.theme.mode);
  const handleClick = () => {
    if (item.value.length == 0) return;
    getDealMasterData(
      item.value[0],
      item.value[1],
      item.value[2],
      item.value[3],
    );
    setCustomCardName(item.title);
    setIsCustomCardVisible(false);
  };

  return (
    <div
      className="web-card animate__animated onlythis cursor-pointer dark:!bg-[#1f2639] !bg-white dark:!border-[#374558] dark:!border"
      onClick={typeof handleClickFn ? handleClickFn : handleClick}
    >
      <div className="card-bodyR">
        <div className="flex justify-between">
          <div>
            {mode === 'dark' ? (
              <div
                className={`animate__animated onlythis2  order order${item.id}`}
              >
                <span>
                  <HiOutlineIdentification
                    className="text-3xl"
                    style={{ color: item.color }}
                  />
                </span>
              </div>
            ) : (
              <Button
                size="lg"
                icon={
                  <HiOutlineIdentification
                    className="text-3xl"
                    style={{ color: item.color }}
                  />
                }
                className="!bg-[#307ef3] !bg-opacity-25 !border-transparent"
              />
            )}
          </div>
          <HiDotsHorizontal />
        </div>
        <div className="mt-3">
          <span className="text-lg font-extrabold dark:!text-gray-400 text-black">
            {item.title}
          </span>
          <h4 className="text-2xl dark:!text-white text-black">
            {statusCount}
          </h4>
          {percent && (
            <div className="dark:!text-gray-400 text-black ml-1 mt-2">
              <Progress percent={percent} size="xl" />
            </div>
          )}
        </div>
        <p className="mt-2 text-xs dark:!text-gray-400 text-black">
          {item.describe}
        </p>
      </div>
    </div>
  );
};
export default HeaderCardDealMaster;
