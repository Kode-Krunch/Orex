import { Card, Checkbox } from 'components/ui';
import { format } from 'date-fns';
import React from 'react';
import { numberToINRFormat } from 'views/Controls/GLOBALFUNACTION';
import LabelValuePair from './LabelValuePair';

function BookingInfo({ bookingDetails }) {
  /* HELPER FUNCTIONS */
  const isDealActive = (fromDate, toDate, isActive) => {
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
        <LabelValuePair label="Agency" value={bookingDetails.AgencyName} />
        <LabelValuePair
          label="Booking Reference No"
          value={bookingDetails.BookingRefNumber}
        />
        <LabelValuePair label="Deal Number" value={bookingDetails.DealCode} />
        <div>
          <p>Status</p>
          <p
            className={`${
              isDealActive(
                bookingDetails.DealPeriodFromDate,
                bookingDetails.DealPeriodToDate,
                bookingDetails.IsActive,
              )
                ? 'text-emerald-400 font-semibold'
                : 'text-red-500 font-bold'
            } `}
          >
            {isDealActive(
              bookingDetails.DealPeriodFromDate,
              bookingDetails.DealPeriodToDate,
              bookingDetails.IsActive,
            )
              ? 'Active'
              : 'Expired'}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <LabelValuePair label="Client" value={bookingDetails.ClientName} />
        <LabelValuePair
          label="Created Date"
          value={bookingDetails.DealCreatedDate}
        />
        <LabelValuePair
          label="Currency"
          value={`${bookingDetails.CurrencyName} (${bookingDetails.CurrencySymbol})`}
        />
        <LabelValuePair
          label="Make Good"
          value={
            <Checkbox
              checked={bookingDetails.IsMakeGoodRO === 1 ? true : false}
            ></Checkbox>
          }
        />
      </div>
      <div className="flex flex-col gap-6 ml-3">
        <LabelValuePair
          label="Sales Person / Zone"
          value={`${bookingDetails.Emp_FirstName} ${bookingDetails.Emp_LastName} / ${bookingDetails.ZoneName}`}
        />
        <LabelValuePair
          label="Booking Duration"
          value={`${format(
            new Date(bookingDetails.BookingStartDate),
            'dd-MMM-yyyy',
          )} to ${format(
            new Date(bookingDetails.BookingEndDate),
            'dd-MMM-yyyy',
          )}`}
        />
        <LabelValuePair label="Pay route" value={bookingDetails.PayRouteName} />
      </div>
      <div className="flex gap-2">
        <div className="relative h-full w-1 rounded-full bg-gray-800">
          <div
            className={`absolute bottom-0 w-full rounded-full ${
              (bookingDetails.BalanceAmount / bookingDetails.TotalAmount) *
                100 >=
              60
                ? 'bg-emerald-600'
                : (bookingDetails.BalanceAmount / bookingDetails.TotalAmount) *
                    100 >
                    20 &&
                  (bookingDetails.BalanceAmount / bookingDetails.TotalAmount) *
                    100 <
                    60
                ? 'bg-yellow-600'
                : 'bg-red-600'
            }`}
            style={{
              height: `${
                (bookingDetails.BalanceAmount / bookingDetails.TotalAmount) *
                100
              }%`,
            }}
          ></div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p>Total Amount</p>
            <p className="text-white text-[15px] font-semibold">
              {bookingDetails.CurrencySymbol}
              {numberToINRFormat(bookingDetails.TotalAmount)}
            </p>
          </div>
          <div>
            <p>Used Amount</p>
            <p className="text-white text-[15px] font-semibold">
              {bookingDetails.CurrencySymbol}{' '}
              {numberToINRFormat(
                bookingDetails.TotalAmount - bookingDetails.BalanceAmount,
              )}
            </p>
          </div>
          <div>
            <p>Balanced Amount</p>
            <p className="text-white text-[15px] font-semibold">
              {bookingDetails.CurrencySymbol}{' '}
              {numberToINRFormat(bookingDetails.BalanceAmount)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="relative h-full w-1 rounded-full bg-gray-800">
          <div
            className={`absolute bottom-0 w-full rounded-full ${
              (100 / bookingDetails.TotalSeconds) * 100 >= 60
                ? 'bg-emerald-600'
                : (100 / bookingDetails.TotalSeconds) * 100 > 20 &&
                  (100 / bookingDetails.TotalSeconds) * 100 < 60
                ? 'bg-yellow-600'
                : 'bg-red-600'
            }`}
            style={{
              height: `${(100 / bookingDetails.TotalSeconds) * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p>Total Seconds</p>
            <p className="text-white text-[15px] font-semibold">
              {bookingDetails.TotalSeconds.toLocaleString('en-IN')}
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

export default BookingInfo;
