import React, { memo } from 'react';
import ContractDetails from '../ContractDetails';
import ShowsBroadcastRunDetails from './ShowsBroadcastRunDetails';

function ShowsTab({
  countryOptions,
  amortisationTypeOptions,
  tableData,
  columns,
  formState,
  setFormState,
  eventType,
  seasonOptions,
  episodeOptions,
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
        className="col-span-7"
        eventType={eventType}
        selectedCurrency={selectedCurrency}
      />
      <ShowsBroadcastRunDetails
        formState={formState}
        setFormState={setFormState}
        className="col-span-5"
        seasonOptions={seasonOptions}
        episodeOptions={episodeOptions}
        eventType={eventType}
      />
    </>
  );
}

export default memo(ShowsTab);
