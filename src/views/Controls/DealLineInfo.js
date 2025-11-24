import { Button, Card } from 'components/ui';
import React, { useState } from 'react';
import { numberToINRFormat } from 'views/Controls/GLOBALFUNACTION';
import SpotsDialog from './SpotsDialog/SpotsDialog';

function DealLineInfo({
  bookingNumber,
  dealLineInfo,
  setDealLineInfo,
  currencySymbol,
}) {
  /* STATES */
  const [isSpotsDialogOpen, setIsSpotsDialogOpen] = useState(false);
  const [selDealLineItemNo, setSelDealLineItemNo] = useState(null);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h6 className="mb-2">Deal Line Info</h6>
        <Button
          size="sm"
          className="py-0 !px-2 mb-2 !h-8"
          onClick={() => setDealLineInfo(null)}
        >
          <span>Close</span>
        </Button>
      </div>
      <>
        {dealLineInfo.length > 0 ? (
          <div className="max-h-[31.5rem] overflow-y-auto no-scrollbar flex flex-col gap-4">
            {dealLineInfo.map((dealLine, index) => (
              <>
                <Card
                  bordered={false}
                  style={{ backgroundColor: 'rgb(41 52 69)' }}
                  bodyClass="p-3 flex flex-col gap-2"
                  key={index}
                >
                  <div className="flex justify-between items-center border-b border-b-gray-600 pb-2 mb-1">
                    <p className="text-[15px] font-semibold text-white">
                      {dealLine.DealLineItemTypeName === 'RODP Wise'
                        ? dealLine.TimeBandName
                        : dealLine.DealLineItemTypeName}
                    </p>
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsSpotsDialogOpen(true);
                        setSelDealLineItemNo(dealLine.DealLineItemNo);
                      }}
                    >
                      View Spots
                    </Button>
                  </div>
                  <div className="grid grid-cols-12 gap-x-2 gap-y-7">
                    <div className="col-span-3">
                      <p className="text-[12px]">Spot Type</p>
                      <p className="text-white text-[14px]">
                        {dealLine.SpotTypeName}
                      </p>
                    </div>
                    <div className="col-span-6 flex justify-center">
                      <div className="text-center mr-2">
                        <p className="text-[12px]">Week Days</p>
                        <p className="flex items-center gap-1">
                          {Array.from({ length: 7 }, (_, index) => index).map(
                            (day) => (
                              <span
                                className={`${
                                  dealLine.weekendsdetail.filter(
                                    (curDay) => curDay.Day === day,
                                  ).length > 0
                                    ? 'text-[14px] text-white'
                                    : 'text-[15px] text-gray-500 font-semibold'
                                }`}
                                key={day}
                              >
                                {day === 0
                                  ? 'S'
                                  : day === 1
                                  ? 'M'
                                  : day === 2
                                  ? 'T'
                                  : day === 3
                                  ? 'W'
                                  : day === 4
                                  ? 'T'
                                  : day === 5
                                  ? 'F'
                                  : 'S'}
                              </span>
                            ),
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <p className="text-[12px]">Rate</p>
                      <p className="text-white text-[14px]">
                        {/* TODO: ADD CURRENCY SYMBOL */}₹{' '}
                        {numberToINRFormat(dealLine.Rate)}
                      </p>
                    </div>
                    <div className="col-span-6 flex gap-3">
                      <div className="relative h-full w-1 rounded-full bg-gray-800">
                        <div
                          className={`absolute bottom-0 w-full rounded-full ${
                            (dealLine.BalancedAmount / dealLine.Amount) * 100 >=
                            60
                              ? 'bg-emerald-600'
                              : (dealLine.BalancedAmount / dealLine.Amount) *
                                  100 >
                                  20 &&
                                (dealLine.BalancedAmount / dealLine.Amount) *
                                  100 <
                                  60
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                          }`}
                          style={{
                            height: `${
                              (dealLine.BalancedAmount / dealLine.Amount) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div>
                          <p className="text-[12px]">Total Amount</p>
                          <p className="text-white text-[15px]">
                            {/* TODO: ADD CURRENCY SYMBOL */}₹{' '}
                            {numberToINRFormat(dealLine.Amount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px]">Used Amount</p>
                          <p className="text-white text-[15px]">
                            {/* TODO: ADD CURRENCY SYMBOL */}₹{' '}
                            {numberToINRFormat(dealLine.ConsumedAmount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px]">Balanced Amount</p>
                          <p className="text-white text-[15px]">
                            {/* TODO: ADD CURRENCY SYMBOL */}₹{' '}
                            {numberToINRFormat(dealLine.BalancedAmount)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 flex gap-3">
                      <div className="relative h-full w-1 rounded-full bg-gray-800">
                        <div
                          className={`absolute bottom-0 w-full rounded-full ${
                            (dealLine.BalancedSeconds / dealLine.Seconds) *
                              100 >=
                            60
                              ? 'bg-emerald-600'
                              : (dealLine.BalancedSeconds / dealLine.Seconds) *
                                  100 >
                                  20 &&
                                (dealLine.BalancedSeconds / dealLine.Seconds) *
                                  100 <
                                  60
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                          }`}
                          style={{
                            height: `${
                              (dealLine.BalancedSeconds / dealLine.Seconds) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div>
                          <p className="text-[12px]">Total Seconds</p>
                          <p className="text-white text-[15px]">
                            {dealLine.Seconds.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px]">Used Seconds</p>
                          <p className="text-white text-[15px]">
                            {dealLine.ConsumedSeconds.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div>
                          <p className="text-[12px]">Balanced Seconds</p>
                          <p className="text-white text-[15px]">
                            {dealLine.BalancedSeconds.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            ))}
          </div>
        ) : (
          <Card
            className="grow"
            bodyClass="h-full flex justify-center items-center"
          >
            No deal line info to show
          </Card>
        )}
      </>
      {isSpotsDialogOpen && selDealLineItemNo && (
        <SpotsDialog
          isOpen={isSpotsDialogOpen}
          setIsOpen={setIsSpotsDialogOpen}
          bookingNumber={bookingNumber}
          dealLineItemNo={selDealLineItemNo}
          setSelDealLineItemNo={setSelDealLineItemNo}
          currencySymbol={currencySymbol}
        />
      )}
    </div>
  );
}

export default DealLineInfo;
