import React from 'react';
import { Button, Card, Tooltip } from 'components/ui';
import { GoPencil } from 'react-icons/go';
import { IoAddOutline } from 'react-icons/io5';
import { openNotification, sortArray } from 'views/Controls/GLOBALFUNACTION';

/* CONSTANTS */
const TAX_BADGE_COLOR = 'bg-teal-700';

/* COMPONENTS */
const Tax = ({ label, value, badgeColor }) => {
  return (
    <li className={'flex items-center justify-between'}>
      <span className="flex items-center">
        <span className={`mr-2 rounded-full ${badgeColor} w-2 h-2`} />
        {label}
      </span>
      <span className="font-semibold">{value}%</span>
    </li>
  );
};

function YearTaxDetailsCard({
  yearTaxDetail,
  setIsAddTaxesDialogOpen,
  setClickedYearTaxDetail,
  setAddTaxesDialogType,
}) {
  /* EVENT HANDLERS */
  const handleCardClick = () => {
    try {
      setIsAddTaxesDialogOpen(true);
      setClickedYearTaxDetail(yearTaxDetail);
      if (yearTaxDetail.Yeartaxdetails.length > 0) {
        setAddTaxesDialogType('edit');
      } else {
        setAddTaxesDialogType('add');
      }
    } catch (error) {
      openNotification('danger', 'Something went wrong');
      console.error(error);
    }
  };

  return (
    <>
      {yearTaxDetail && (
        <Card
          className="dark:hover:bg-gray-700 hover:bg-gray-300 hover:cursor-pointer"
          style={{ minHeight: '10rem' }}
          bodyClass="p-3 h-full flex flex-col"
          bordered={false}
          onClick={handleCardClick}
        >
          {yearTaxDetail.Yeartaxdetails.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-3 pb-1 border-b border-dashed border-dash-2 border-b-gray-600">
                <h6>{yearTaxDetail.Description}</h6>
                <Tooltip title="Edit">
                  <Button
                    shape="circle"
                    variant="plain"
                    className="-mt-1 -mr-2 opacity-80"
                    icon={<GoPencil size={19} className="opacity-80" />}
                  />
                </Tooltip>
              </div>
              <ul className="flex flex-col gap-3">
                {sortArray(yearTaxDetail.Yeartaxdetails, 'TaxName').map(
                  (tax) => {
                    return (
                      <Tax
                        key={tax.Taxcode}
                        label={tax.TaxName}
                        value={tax.TaxPercentage}
                        badgeColor={TAX_BADGE_COLOR}
                      />
                    );
                  },
                )}
              </ul>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-3 pb-1 border-b border-dashed border-dash-2 border-b-gray-600">
                <h6>{yearTaxDetail.Description}</h6>
                <Tooltip title="Add">
                  <Button
                    shape="circle"
                    variant="plain"
                    className="-mt-1 -mr-2"
                    icon={<IoAddOutline size={25} className="opacity-80" />}
                  />
                </Tooltip>
              </div>
              <div className="flex justify-center items-center grow">
                Add Taxes
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
}

export default YearTaxDetailsCard;
