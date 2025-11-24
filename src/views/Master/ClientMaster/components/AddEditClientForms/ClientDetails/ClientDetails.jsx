import React from 'react';
import BasicDetailsForm from './Forms/BasicDetailsForm';
import ContactDetailsForm from './Forms/ContactDetailsForm';

function ClientDetails({ creditRateLimitOptions }) {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className="border-r border-r-gray-700 pr-3">
        <BasicDetailsForm creditRateLimitOptions={creditRateLimitOptions} />
      </div>
      <div className="px-3">
        <ContactDetailsForm />
      </div>
    </div>
  );
}

export default ClientDetails;
