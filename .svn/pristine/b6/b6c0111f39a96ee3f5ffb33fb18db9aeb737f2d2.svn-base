import React from 'react';
import {
  apiGeTeammaster,
  PostTeam,
  Putteam,
} from 'services/EventPlannerService';
import ImageSmallMaster from 'views/Controls/ImageSmallMaster';

const TeamMaster = () => {
  const columns = [
    { field: 'serialNumber', header: 'Sr.', width: '0.5%' },
    { field: 'TeamName', header: 'Team Name', width: '20%', IsPrimary: true },
  ];

  const defaultValues = {
    TeamName: '',
  };

  return (
    <ImageSmallMaster
      title="Team"
      moduleText="Programming"
      apiGet={apiGeTeammaster}
      apiPost={PostTeam}
      apiPut={Putteam}
      columns={columns}
      defaultValues={defaultValues}
      MainFieldName="TeamName"
      dataKey="TeamCoode"
    />
  );
};

export default TeamMaster;
