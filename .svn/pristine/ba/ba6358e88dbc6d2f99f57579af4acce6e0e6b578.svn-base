import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'components/ui';

function DashboardShortcutCards({ shortcuts, StateCall }) {
  /* HOOKS */
  const nav = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  return (
    <>
      {shortcuts.map((item, key) => (
        <div
          className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-[#374558]
           dark:!border`}
          style={{
            height: 200,
          }}
          onClick={() => {
            if (item.link) {
              nav(`/${item.link}`);
            } else if (StateCall) {
              StateCall(item.name);
            }
          }}
          key={key}
        >
          <div className="card-bodyR">
            <div className="flex justify-between">
              <div className="flex ">
                {mode === 'dark' ? (
                  <div
                    className={` animate__animated onlythis2 order ${item.key}`}
                  >
                    <span>{item.icon}</span>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    icon={item.icon}
                    className={`!bg-${item.nav} !bg-opacity-25 !border-transparent`}
                  />
                )}
              </div>
              <div>
                <h4 className={'dark:!text-gray-400 !text-black text-2xl'}>
                  {item?.OutstandingAmount}
                </h4>
              </div>
            </div>
            <div className="flex-grow-1 mt-2">
              <span
                className={
                  'dark:!text-gray-400 !text-gray-700 text-lg font-extrabold'
                }
              >
                {item.name}
              </span>
            </div>
            <div className="mt-1">
              <p className={'dark:!text-gray-400 !text-gray-700 text-xs'}>
                {item.details}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default DashboardShortcutCards;
