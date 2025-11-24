import { Input } from 'components/ui';
import React from 'react';

function CashForm({
  amount,
  setAmount,
  beneficiaryName,
  setBeneficiaryName,
  currencySymbol,
}) {
  return (
    <>
      <div>
        <p className="text-gray-200 mb-1">
          Amount <span className="text-red-500">*</span>
        </p>
        <Input
          size="sm"
          prefix={currencySymbol}
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <div>
        <p className="text-gray-200 mb-1">
          Beneficiary Name <span className="text-red-500">*</span>
        </p>
        <Input
          size="sm"
          placeholder="Name"
          value={beneficiaryName}
          onChange={(event) => setBeneficiaryName(event.target.value)}
        />
      </div>
    </>
  );
}

export default CashForm;
