import React from 'react';
import {
  apiGetGroupmaster,
  Postgroupname,
  Putgroupname,
} from 'services/EventPlannerService';
import SmallMaster from 'views/Controls/SmallMaster';

const GroupMaster = () => {
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'GroupName', header: 'Group Name', width: '20%', IsPrimary: true },
  ];

  const defaultValues = {
    GroupName: '',
  };

  return (
    <SmallMaster
      title="Group"
      moduleText="Programming"
      apiGet={apiGetGroupmaster}
      apiPost={Postgroupname}
      apiPut={Putgroupname}
      columns={columns}
      defaultValues={defaultValues}
      MainFieldName="GroupName"
      dataKey="GroupCode"
    />
  );
};

export default GroupMaster;
