import React from 'react';
import {
  apiGetCountryMaster,
  Postcountryname,
  Putcountryame,
} from 'services/MasterService';
import SmallMaster from 'views/Controls/SmallMaster';

const CountryMaster = () => {
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'CountryName', header: 'Country Name', width: '30%', IsPrimary: true },
  ];

  const defaultValues = {
    CountryName: '',
  };

  return (
    <SmallMaster
      title="Country"
      moduleText="Programming"
      apiGet={apiGetCountryMaster}
      apiPost={Postcountryname}
      apiPut={Putcountryame}
      columns={columns}
      defaultValues={defaultValues}
      MainFieldName="CountryName"
      dataKey="CountryCode"
    />
  );
};

export default CountryMaster;
