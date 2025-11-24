import { Card } from 'components/ui';
import React from 'react';

function ClientInfo({ dealDetails }) {
  return (
    <div>
      <h6 className="mb-2">Client</h6>
      <Card
        bordered={false}
        style={{ backgroundColor: 'rgb(41 52 69)' }}
        bodyClass="p-3 flex flex-col gap-6"
      >
        <div>
          <p>Client</p>
          <p className="text-white">{dealDetails.ClientName}</p>
        </div>
        <div>
          <p>City</p>
          <p className="text-white">{dealDetails.ClientPlaceName}</p>
        </div>
      </Card>
    </div>
  );
}

export default ClientInfo;
