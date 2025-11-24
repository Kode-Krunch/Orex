import React from 'react';
import './index.css';
import { Card, Progress } from 'components/ui';
import NumberFormat from 'react-number-format';

function BulletGraph({ className, title, header, data }) {
  return (
    <Card className={className}>
      <h5 className="dark:!text-gray-200 text-gray-500">{title}</h5>
      <div className="flex items-end mt-4">
        <h4 className="font-medium text-2xl dark:!text-gray-200 text-gray-500">
          {header.value}
        </h4>
        <p
          className="ml-2 font-regular dark:!text-gray-200 text-gray-500"
          style={{ fontSize: '15px' }}
        >
          {header.label}
        </p>
      </div>
      {data.map((curData, index) => (
        <div className={index > 0 ? 'mt-3' : 'mt-4'}>
          <div className="flex items-center mb-2">
            <h6>
              {typeof curData.value === 'number' ? (
                <NumberFormat
                  displayType="text"
                  value={curData.value}
                  thousandSeparator
                />
              ) : (
                curData.value
              )}
            </h6>
            <p
              className="ml-2 font-regular"
              style={{ fontSize: 13, color: '#9B9B9B' }}
            >
              ({curData.label})
            </p>
          </div>
          <Progress
            percent={Math.round((curData.value / header.value) * 100)}
            color={curData.color}
            customInfo={<></>}
          />
        </div>
      ))}
    </Card>
  );
}

export default BulletGraph;
