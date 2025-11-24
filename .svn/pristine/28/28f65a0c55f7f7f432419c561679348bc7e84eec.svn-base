import { Card } from 'components/ui';
import { format } from 'date-fns';
import React from 'react';
import { numberToINRFormat } from 'views/Controls/GLOBALFUNACTION';

function DealInfo({ dealDetails }) {
  /* HELPER FUNCTIONS */
  const isDealActive = (fromDate, toDate, isActive) => {
    try {
      const currentDate = new Date();
      const dealStartDate = new Date(fromDate);
      const dealEndDate = new Date(toDate);
      if (
        isActive === 1 &&
        (currentDate <= dealStartDate ||
          (currentDate >= dealStartDate && currentDate <= dealEndDate))
      ) {
        return true;
      } else return false;
    } catch (error) {
      console.error(error);
    }
  };

  const getDaysRemaining = (fromDate, toDate) => {
    try {
      const currentDate = new Date();
      const dealStartDate = new Date(fromDate);
      const dealEndDate = new Date(toDate);
      if (currentDate <= dealStartDate) {
        return Math.ceil((dealEndDate - dealStartDate) / (1000 * 60 * 60 * 24));
      } else if (currentDate >= dealStartDate && currentDate <= dealEndDate) {
        return Math.ceil((dealEndDate - currentDate) / (1000 * 60 * 60 * 24));
      } else {
        return 0;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      style={{ backgroundColor: 'rgb(41 52 69)' }}
      bordered={false}
      bodyClass="grid grid-cols-5 gap-x-4 gap-y-6"
    >
      <div className="flex flex-col gap-6">
        <div>
          <p>Reference No</p>
          <p className="text-white">{dealDetails.DealReferenceNumber}</p>
        </div>
        <div>
          <p>Status</p>
          <p
            className={`${isDealActive(
              dealDetails.DealPeriodFromDate,
              dealDetails.DealPeriodToDate,
              dealDetails.IsActive,
            )
                ? 'text-emerald-400 font-semibold'
                : 'text-red-500 font-bold'
              } `}
          >
            {isDealActive(
              dealDetails.DealPeriodFromDate,
              dealDetails.DealPeriodToDate,
              dealDetails.IsActive,
            )
              ? 'Active'
              : 'Expired'}
          </p>
        </div>
        <div>
          <p>Added By</p>
          <p className="text-white">
            {dealDetails.Emp_FirstName} {dealDetails.Emp_LastName}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <p>Deal Date</p>
          <p className="text-white">
            {format(new Date(dealDetails.DealCreatedDate), 'dd-MMM-yyyy')}
          </p>
        </div>
        <div>
          <p>Deal Duration</p>
          <p className="text-white">
            {format(new Date(dealDetails.DealPeriodFromDate), 'dd-MMM-yyyy')} to{' '}
            {format(new Date(dealDetails.DealPeriodToDate), 'dd-MMM-yyyy')}
          </p>
        </div>
        <div>
          <p>Days Remaining</p>
          <p className="text-white">
            {getDaysRemaining(
              dealDetails.DealPeriodFromDate,
              dealDetails.DealPeriodToDate,
            )}{' '}
            Days
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 ml-9">
        <div>
          <p>Deal Type</p>
          <p className="text-white">{dealDetails.DealTypeName}</p>
        </div>
        <div>
          <p>Currency</p>
          <p className="text-white">
            {dealDetails.CurrencyName} ({dealDetails.CurrencySymbol})
          </p>
        </div>
        <div>
          <p>Pay route</p>
          <p className="text-white">{dealDetails.PayRouteName}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="relative h-full w-1 rounded-full bg-gray-800">
          <div
            className={`absolute bottom-0 w-full rounded-full ${(dealDetails.BalanceAmount / dealDetails.TotalAmount) * 100 >= 60
                ? 'bg-emerald-600'
                : (dealDetails.BalanceAmount / dealDetails.TotalAmount) * 100 >
                  20 &&
                  (dealDetails.BalanceAmount / dealDetails.TotalAmount) * 100 <
                  60
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
            style={{
              height: `${(dealDetails.BalanceAmount / dealDetails.TotalAmount) * 100
                }%`,
            }}
          ></div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p>Total Amount</p>
            <p className="text-white text-[15px] font-semibold">
              {dealDetails.CurrencySymbol}
              {numberToINRFormat(dealDetails.TotalAmount)}
            </p>
          </div>
          <div>
            <p>Used Amount</p>
            <p className="text-white text-[15px] font-semibold">
              {dealDetails.CurrencySymbol}{' '}
              {numberToINRFormat(
                dealDetails.TotalAmount - dealDetails.BalanceAmount,
              )}
            </p>
          </div>
          <div>
            <p>Balanced Amount</p>
            <p className="text-white text-[15px] font-semibold">
              {dealDetails.CurrencySymbol}{' '}
              {numberToINRFormat(dealDetails.BalanceAmount)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="relative h-full w-1 rounded-full bg-gray-800">
          <div
            className={`absolute bottom-0 w-full rounded-full ${(100 / dealDetails.TotalSeconds) * 100 >= 60
                ? 'bg-emerald-600'
                : (100 / dealDetails.TotalSeconds) * 100 > 20 &&
                  (100 / dealDetails.TotalSeconds) * 100 < 60
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
            style={{
              height: `${(100 / dealDetails.TotalSeconds) * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p>Total Seconds</p>
            <p className="text-white text-[15px] font-semibold">
              {dealDetails.TotalSeconds.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p>Used Seconds</p>
            <p className="text-white text-[15px] font-semibold">
              0{/* TODO: CALCULATED USED SECONDS */}
            </p>
          </div>
          <div>
            <p>Balanced Seconds</p>
            <p className="text-white text-[15px] font-semibold">
              0{/* TODO: FETCH USED SECONDS FROM API */}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default DealInfo;
