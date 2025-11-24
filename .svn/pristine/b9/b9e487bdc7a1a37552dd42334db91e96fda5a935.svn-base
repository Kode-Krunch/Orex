import React, { memo } from 'react';
import ContractDetails from '../ContractDetails';
import SongsBroadcastRunDetails from './SongsBroadcastRunDetails';

function SongsTab({
  countryOptions,
  amortisationTypeOptions,
  tableData,
  columns,
  formState,
  setFormState,
  eventType,
  selectedCurrency,
}) {
  return (
    <>
      <ContractDetails
        countryOptions={countryOptions}
        amortisationTypeOptions={amortisationTypeOptions}
        formState={formState}
        setFormState={setFormState}
        tableData={tableData}
        columns={columns}
        className="col-span-2"
        eventType={eventType}
        selectedCurrency={selectedCurrency}
      />
      <SongsBroadcastRunDetails
        formState={formState}
        setFormState={setFormState}
        className="col-span-1"
        eventType={eventType}
      />
    </>
  );
}

export default memo(SongsTab);
