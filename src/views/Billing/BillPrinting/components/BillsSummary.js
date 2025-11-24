import React from 'react';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { SlBadge } from 'react-icons/sl';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { TbBrandJuejin, TbDeviceTvOld } from 'react-icons/tb';
import { VscRecord } from 'react-icons/vsc';
import { GiPayMoney } from 'react-icons/gi';
import {
  getFieldTotal,
  getUniqueObjects,
  numberToINRFormat,
} from 'views/Controls/GLOBALFUNACTION';
import { Card } from 'components/ui';

/* COMPONENTS */
function BillSummaryCard({
  label,
  value,
  icon,
  className,
  isMoney,
  currencySymbol,
}) {
  return (
    <Card
      className={`border-none ${className}`}
      bodyClass="p-3 flex justify-between items-start gap-2"
    >
      <div className="flex flex-col items-start justify-between gap-1 w-full">
        {label}
        <h4>
          {isMoney ? (
            <>
              {currencySymbol ? `${currencySymbol} ` : ''}
              {numberToINRFormat(value)}
            </>
          ) : (
            <>{value}</>
          )}
        </h4>
      </div>
      {icon}
    </Card>
  );
}

function BillsSummary({ bills, currencySymbol }) {
  return (
    <>
      <BillSummaryCard
        label="Bills"
        value={bills.tmpbilldata.length}
        icon={<LiaFileInvoiceSolid size={30} className="text-indigo-700" />}
      />
      <BillSummaryCard
        label="Agency"
        value={getUniqueObjects(bills.tmpbilldata, 'AgencyName').length}
        icon={<SlBadge size={28} className="text-amber-700" />}
      />
      <BillSummaryCard
        label="Clients"
        value={getUniqueObjects(bills.tmpbilldata, 'ClientName').length}
        icon={
          <MdOutlinePersonOutline
            size={40}
            className="text-emerald-700 -mt-2"
          />
        }
      />
      <BillSummaryCard
        label="Brands"
        value={getUniqueObjects(bills.tmpbilldata, 'BrandName').length}
        icon={<TbBrandJuejin size={30} className="text-violet-700" />}
      />
      <BillSummaryCard
        label="Spots"
        value={bills.tmpbilldatasubreport.length}
        icon={<TbDeviceTvOld size={30} className="text-rose-700" />}
      />
      <BillSummaryCard
        label="Net Billed Amount"
        value={getFieldTotal(bills.tmpbilldata, 'PayableAmount')}
        isMoney={true}
        className="col-span-2"
        icon={
          <span size={26} className="text-sky-500 text-2xl font-normal">
            {currencySymbol}
          </span>
        }
        currencySymbol={currencySymbol}
      />
      <BillSummaryCard
        label="Tax"
        value={getFieldTotal(bills.tmpbilldata, 'TotalTaxAmount')}
        isMoney={true}
        className="col-span-2"
        icon={<GiPayMoney size={28} className="text-red-700" />}
        currencySymbol={currencySymbol}
      />
    </>
  );
}

export default BillsSummary;
