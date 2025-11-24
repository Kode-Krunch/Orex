import { Card } from 'components/ui';
import React from 'react';

function ExecutiveInfo({ dealDetails }) {
  return (
    <div>
      <h6 className="mb-2">Executive</h6>
      <Card
        bordered={false}
        style={{ backgroundColor: 'rgb(41 52 69)' }}
        bodyClass="p-3 flex flex-col gap-6"
      >
        <div>
          <p>Executive</p>
          <p className="text-white">
            {/* TODO: FETCH EXECUTIVE NAME FROM API */}
            {dealDetails.Emp_FirstName} {dealDetails.Emp_LastName}
          </p>
        </div>
        <div>
          <p>Zone</p>
          <p className="text-white">{dealDetails.ZoneName}</p>
        </div>
      </Card>
    </div>
  );
}

export default ExecutiveInfo;
