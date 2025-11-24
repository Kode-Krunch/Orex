import { Button, Card } from 'components/ui';
import React, { memo, useState } from 'react';
import SelectXs from '../../Controls/SelectXs/SelectXs';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import DealDetailsDialog from 'views/Controls/DealDetailsDialog/DealDetailsDialog';

function DealDetails({
  dealDetails,
  dealSelectorOptions,
  selectedDeal,
  setSelectedDeal,
}) {
  /* STATES */
  const [isDealDetailsDialogOpen, setIsDealDetailsDialogOpen] = useState(false);

  return (
    <>
      <Card
        className="h-full col-span-1"
        bordered={false}
        bodyClass="pt-2 pb-3 px-0 h-full flex flex-col"
      >
        <h5 className="mb-3 py-2 px-3 border-b border-dashed border-b-gray-600">
          Deal Master
        </h5>
        <div className="px-3 mb-5">
          <p
            className={`text-gray-200 flex items-center gap-1 ${
              !dealDetails && 'mb-1'
            }`}
          >
            Deal Number
            {dealDetails && (
              <Button
                shape="circle"
                variant="plain"
                size="xs"
                className="mb-0.5"
                onClick={() => setIsDealDetailsDialogOpen(true)}
                icon={
                  <IoMdInformationCircleOutline className="text-gray-300" />
                }
              />
            )}
          </p>
          <SelectXs
            placeholder="Search Deal"
            options={dealSelectorOptions}
            onChange={setSelectedDeal}
            value={selectedDeal}
            blurInputOnSelect={true}
          ></SelectXs>
        </div>
        {dealDetails && (
          <>
            <div className="px-3 flex flex-col gap-5 grow h-0 overflow-hidden hover:overflow-auto transition-all">
              <div>
                <p className="mb-1">Executive Name</p>
                <p className="text-gray-200 font-semibold">
                  {dealDetails.Emp_FirstName} {dealDetails.Emp_LastName}
                </p>
              </div>
              <div>
                <p className="mb-1">Agency Name</p>
                <p className="text-gray-200 font-semibold">
                  {dealDetails.AgencyName}
                </p>
              </div>
              <div>
                <p className="mb-1">Agency City</p>
                <p className="text-gray-200 font-semibold">
                  {dealDetails.AgencyPlaceName}
                </p>
              </div>
              <div>
                <p className="mb-1">Client Name</p>
                <p className="text-gray-200 font-semibold">
                  {dealDetails.ClientName}
                </p>
              </div>
              <div>
                <p className="mb-1">Client City</p>
                <p className="text-gray-200 font-semibold">
                  {dealDetails.ClientPlaceName}
                </p>
              </div>
              <div>
                <p className="mb-1">Payroute</p>
                <p className="text-white">{dealDetails.PayRouteName}</p>
              </div>
            </div>
            {isDealDetailsDialogOpen && (
              <DealDetailsDialog
                isDialogOpen={isDealDetailsDialogOpen}
                setIsDialogOpen={setIsDealDetailsDialogOpen}
                dealNumber={dealDetails.DealNumber}
                dealCode={dealDetails.DealCode}
              />
            )}
          </>
        )}
      </Card>
    </>
  );
}

export default memo(DealDetails);
