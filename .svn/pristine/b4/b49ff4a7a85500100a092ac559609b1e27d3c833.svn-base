import { mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { StickyFooter } from 'components/shared';
import { Button, Card, Input, Progress, Tag, Tooltip } from 'components/ui';
import React, { useState, useMemo } from 'react';
import { BsInfoLg, BsCurrencyRupee } from 'react-icons/bs';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { HiOutlineIdentification, HiPlusCircle } from 'react-icons/hi';
import { CgTimer } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setContent } from 'store/base/commonSlice';
import DealDetailsDialog from 'views/Controls/DealDetailsDialog/DealDetailsDialog';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { format } from 'date-fns';

const CardData = ({ data, setIsCustomCardVisible, Name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCheck, setDisplayCheck] = useState(null);
  const [isDealDetailsDialogOpen, setIsDealDetailsDialogOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState({});

  const filteredData = useMemo(() => {
    return data.filter(({ IsApproved, DealCode, TotalAmount }) =>
      (IsApproved === 3 || IsApproved === 1 || IsApproved === 0) &&
      (DealCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        TotalAmount?.toString().includes(searchTerm))
    );
  }, [data, searchTerm]);

  const closeDialog = () => {
    setIsDealDetailsDialogOpen(false);
    setSelectedDeal({});
  };

  return (
    <Card
      header={<HeaderExtra />}
      headerExtra={
        <div className="flex gap-4 mr-3">
          <Input
            type="text"
            block
            placeholder="Search..."
            value={searchTerm}
            size="sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="solid"
            size="sm"
            icon={<HiPlusCircle />}
            onClick={() => {
              dispatch(setContent(''));
              navigate('/DealMasterAdd');
            }}
          >
            Add Deal
          </Button>
        </div>
      }
    >
      <h3 className="mb-2">{Name}</h3>
      <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 sm:grid-cols-1 gap-4" style={{ height: 560, overflow: 'scroll' }}>
        {filteredData.map((deal, index) => (
          <div
            key={index}
            className="web-card dark:!bg-[#1f2639] !bg-[#fff] dark:!border-[#374558] dark:!border h-64"

          >
            <div className="card-bodyR">
              <div className="flex justify-between items-center">
                <div className="flex">
                  <HiOutlineIdentification className="text-3xl" />
                  <div className="cursor-pointer flex-grow">
                    <div className="flex">
                      <h5 onClick={() => {
                        dispatch(setContent(deal));
                        navigate('/DealMasterAdd');
                      }}>
                        {deal.DealCode}
                      </h5>
                      <Tooltip title="Show Details">
                        <Button
                          shape="circle"
                          icon={<BsInfoLg className="text-xs" />}
                          size="xs"
                          className="h-5 w-5 mt-1 ml-2"
                          onClick={() => {
                            setSelectedDeal(deal);
                            setIsDealDetailsDialogOpen(true);
                          }}
                        />
                      </Tooltip>
                    </div>
                    <span>{deal.ClientName}</span>
                  </div>
                </div>
                <Tag className={`border-0 dark:text-white ${deal.IsApproved === 1 ? 'dark:bg-green-500/75' : 'dark:bg-amber-500'}`} showCloseButton={false}>
                  {deal.IsApproved === 1 ? 'Approved' : 'Pending'}
                </Tag>
              </div>

              <div className="flex items-center mt-3 mb-1 w-fit alex dark:bg-[#191f31] bg-[#a1a5a966]">
                <FaRegCalendarAlt className="text-xs" />
                &nbsp;
                <span className="text-xs">{format(deal.DealPeriodFromDate, 'MMM dd, yyyy')}</span>
                &nbsp;-&nbsp;
                <span className="text-xs">{format(deal.DealPeriodToDate, 'MMM dd, yyyy')}</span>
              </div>

              <div className="flex justify-between items-center">
                <div
                  className="cursor-pointer alex  dark:!bg-[#191f31] !bg-[#a1a5a966]"
                  onClick={() =>
                    setDisplayCheck(displayCheck === index ? null : index)
                  }
                >
                  {displayCheck === index ? (
                    <div className="flex items-center text-amber-500 font-semibold text-lg">
                      <Icon path={mdiEyeOutline} size={0.8} className="mr-1" />
                      <BsCurrencyRupee className="text-amber-500 text-lg" />
                      {deal.TotalAmount}
                    </div>
                  ) : (
                    <div className="flex text-lg font-semibold">
                      <Icon path={mdiEyeOffOutline} size={0.8} className="mr-1" />
                      *********
                    </div>
                  )}
                </div>
                <div className="alex  dark:!bg-[#191f31] !bg-[#a1a5a966]">
                  <CgTimer className="text-xs" />
                  &nbsp;
                  <span className="text-xs">{deal.TotalSeconds}</span>
                </div>
                <div
                  className="p-1 text-center min-w-[60px] dark:!bg-[#191f31] !bg-[#a1a5a966]"
                >
                  <p
                    className={` font-semibold ${deal.ExpiredinDays < 0 ? 'text-red-500 text-md ' : 'text-blue-500 text-lg'}`}
                  >
                    {deal.ExpiredinDays < 0 ? 'Expired' : deal.ExpiredinDays}
                  </p>
                  {deal.ExpiredinDays > 0 && <p className="text-xs text-gray-400">Days Remaining</p>}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-gray-400 text-xs mb-2">
                  <span>Utilized</span>
                  <span>{deal.BalancedPercent}%</span>
                </div>
                <Progress percent={deal.BalancedPercent} customInfo />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isDealDetailsDialogOpen && (
        <DealDetailsDialog
          isDialogOpen={isDealDetailsDialogOpen}
          setIsDialogOpen={closeDialog}
          dealNumber={selectedDeal.DealNumber}
          dealCode={selectedDeal.DealCode}
        />
      )}

      <StickyFooter className="border-t-4 border-transparent bg-white dark:bg-gray-800">
        <Button variant="solid" onClick={() => setIsCustomCardVisible(true)}>
          Back
        </Button>
      </StickyFooter>
    </Card>
  );
};

export default CardData;
