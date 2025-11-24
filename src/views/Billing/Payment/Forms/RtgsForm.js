import { Input } from 'components/ui';
import React from 'react';

function RtgsForm({
  amount,
  setAmount,
  beneficiaryName,
  setBeneficiaryName,
  accNo,
  setAccNo,
  bankName,
  setBankName,
  ifscCode,
  setIfscCode,
  remarks,
  setRemarks,
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
          Bank <span className="text-red-500">*</span>
        </p>
        <Input
          size="sm"
          placeholder="Bank"
          value={bankName}
          onChange={(event) => setBankName(event.target.value)}
        />
      </div>
      <div>
        <p className="text-gray-200 mb-1">
          IFSC Code <span className="text-red-500">*</span>
        </p>
        <Input
          size="sm"
          placeholder="IFSC Code"
          value={ifscCode}
          onChange={(event) => setIfscCode(event.target.value)}
        />
      </div>
      <div className="col-span-2">
        <p className="text-gray-200 mb-1">
          Remarks <span className="text-red-500">*</span>
        </p>
        <Input
          size="sm"
          placeholder="Remarks"
          value={remarks}
          onChange={(event) => setRemarks(event.target.value)}
        />
      </div>
    </>
  );
}

export default RtgsForm;
