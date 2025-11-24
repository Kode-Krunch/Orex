import React from 'react';
import {
  apiGetDepartmentmaster,
  Postdepartment,
  Putdepartment,
} from 'services/MasterService';
import SmallMaster from 'views/Controls/SmallMaster';

const DepartmentMaster = () => {
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'DepartmentName', header: 'Department Name', width: '20%' },
    { field: 'ShortName', header: 'Short Name', width: '20%' },
  ];

  const defaultValues = {
    DepartmentName: '',
    ShortName: '',
  };

  return (
    <SmallMaster
      title="Department"
      moduleText="Programming"
      apiGet={apiGetDepartmentmaster}
      apiPost={Postdepartment}
      apiPut={Putdepartment}
      columns={columns}
      defaultValues={defaultValues}
      MainFieldName="DepartmentName"
      dataKey="DepartmentCode"
    />
  );
};

export default DepartmentMaster;
