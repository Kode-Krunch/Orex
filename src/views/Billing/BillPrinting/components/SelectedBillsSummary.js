import React from 'react';
import { Card } from 'components/ui';
import {
  getFieldTotal,
  numberToINRFormat,
} from 'views/Controls/GLOBALFUNACTION';

const Info = ({ label, value, isLast, currencySymbol }) => {
  return (
    <li
      className={`flex items-center justify-between${!isLast ? ' mb-3' : ''}`}
    >
      <span>{label}</span>
      <span className="font-semibold">
        {currencySymbol}&nbsp;
        {numberToINRFormat(value)}
      </span>
    </li>
  );
};

function SelectedBillsSummary({ selectedBills, currencySymbol }) {
  const Grosstotal = getFieldTotal(selectedBills, 'GrossAmount');
  const AgencyShare = getFieldTotal(selectedBills, 'AgencyShare');
  const taxTotal = getFieldTotal(selectedBills, 'TotalTaxAmount');
  const netTotal = getFieldTotal(selectedBills, 'PayableAmount');
  // const netTotal = total + taxTotal;

  return (
    <div>
      <Card className="border-none" bodyClass="p-3">
        <h6 className="mb-4">Selected Bills Summary</h6>
        <ul>
          <Info
            label="Bill Total"
            value={Grosstotal}
            currencySymbol={currencySymbol}
          />
          <Info
            label="Discount"
            value={AgencyShare}
            currencySymbol={currencySymbol}
          />
          <Info
            label="Tax"
            value={taxTotal}
            currencySymbol={currencySymbol}
          />

          <hr className="mb-3" />
          <Info
            label="Payable"
            value={netTotal}
            isLast
            currencySymbol={currencySymbol}
          />
        </ul>
      </Card>
    </div>
  );
}

export default SelectedBillsSummary;
