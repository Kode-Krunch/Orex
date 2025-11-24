import { Card } from 'components/ui';
import React from 'react';

function AgencyInfo({ dealDetails }) {
  return (
    <div>
      <h6 className="mb-2">Agency</h6>
      <Card
        bordered={false}
        style={{ backgroundColor: 'rgb(41 52 69)' }}
        bodyClass="p-3 flex flex-col gap-6"
      >
        <div>
          <p>Agency</p>
          <p className="text-white">{dealDetails.AgencyName}</p>
        </div>
        <div>
          <p>City</p>
          <p className="text-white">{dealDetails.AgencyPlaceName}</p>
        </div>
      </Card>
    </div>
  );
}

export default AgencyInfo;
