import { Dropdown } from 'components/ui';
import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';

function Legend({
  legends, // { [legendName: string]: string(any valid color) }
  renderTitle = (
    <div
      className={'flex flex-col items-center gap-1 text-gray-300 opacity-90'}
    >
      <FiHelpCircle className="text-lg" />
      <div>Legends</div>
    </div>
  ),
}) {
  return (
    <Dropdown
      placement="top-end"
      trigger="hover"
      renderTitle={renderTitle}
      menuClass="w-max p-3"
      toggleClassName="hover:cursor-pointer"
    >
      <div className="pb-2 mb-1 border-b border-b-gray-500 text-white text-base font-semibold">
        Legends
      </div>
      <div className="grid grid-cols-2 w-max">
        {Object.keys(legends).map((legend, index) =>
          legends[legend] ? (
            <Dropdown.Item className="flex gap-1.5" key={index}>
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: legends[legend],
                }}
              ></div>
              <div>{legend}</div>
            </Dropdown.Item>
          ) : (
            <></>
          ),
        )}
      </div>
    </Dropdown>
  );
}

export default Legend;
