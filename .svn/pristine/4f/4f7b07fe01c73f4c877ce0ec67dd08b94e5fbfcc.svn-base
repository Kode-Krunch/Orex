import { DatePicker, Input } from 'components/ui';
import React from 'react';
import SelectXs from 'views/Controls/SelectXs/SelectXs';

/* CONSTANTS */
const chequeTypeOptions = [
  {
    value: 0,
    label: 'Bearer',
  },
  {
    value: 1,
    label: 'Order',
  },
  {
    value: 2,
    label: 'Account',
  },
  {
    value: 3,
    label: 'Post Dated',
  },
];

function ChequeForm({
  selChequeType,
  setSelChequeType,
  amount,
  setAmount,
  accNo,
  setAccNo,
  beneficiaryName,
  setBeneficiaryName,
  chequeDate,
  setChequeDate,
  currencySymbol,
}) {
  return (
    <>
      <div>
        <p className="text-gray-200 mb-1">
          Cheque Type <span className="text-red-500">*</span>
        </p>
        <SelectXs
          placeholder="Select"
          options={chequeTypeOptions}
          value={selChequeType}
          onChange={setSelChequeType}
        />
      </div>
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
          Account Number <span className="text-red-500">*</span>
        </p>
        <Input
          size="sm"
          placeholder="Account No"
          value={accNo}
          onChange={(event) => setAccNo(event.target.value)}
        />
      </div>
      <div>
        <p className="text-gray-200 mb-1">
          Payee Name <span className="text-red-500">*</span>
        </p>
        <Input
          size="sm"
          placeholder="Name"
          value={beneficiaryName}
          onChange={(event) => setBeneficiaryName(event.target.value)}
        />
      </div>
      <div>
        <p className="text-gray-200 mb-1">
          Date <span className="text-red-500">*</span>
        </p>
        <DatePicker
          size="sm"
          placeholder="Pick a date"
          minDate={new Date()}
          value={chequeDate}
          onChange={setChequeDate}
        />
      </div>
    </>
  );
}

export default ChequeForm;
