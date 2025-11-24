import { Button, Tooltip } from 'components/ui';
import React from 'react'
import { BsInfoLg } from 'react-icons/bs';
import { MdAccessTime } from 'react-icons/md';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import { setContent } from 'store/base/commonSlice';
import CountdownTimer from 'views/Controls/Dashboard/CountdownTimer';
import ProgressionBar from 'views/Controls/ProgressionBar';

const ExpiringDeals = ({ deals, onShowDetails, }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="col-span-3 web-card px-5 py-3 slider-container h-[380px] dark:bg-[#1f2639] bg-[#fff]">
            <h6 className="pb-3 mt-3 flex items-center border-b border-gray-500">
                <MdAccessTime className="mr-2" size={23} />
                Expiring Deal
            </h6>
            <Slider
                dots
                infinite={deals.length > 1}
                speed={500}
                slidesToShow={deals.length > 1 ? 1 : deals.length}
                slidesToScroll={1}
            >
                {deals.map((item, index) => (
                    <div key={index}>
                        <div className="ml-3">
                            <div className='flex items-center mt-5 mb-2'>
                                <p className="text-base  font-semibold cursor-pointer dark:!text-white text-black"
                                    onClick={() => { dispatch(setContent(item)); navigate('/DealMasterAdd'); }}>
                                    {item.DealCode}
                                </p>
                                <div className="ml-5">
                                    <Tooltip title="Show Details">
                                        <Button shape="circle" icon={<BsInfoLg className="text-xs " />} size="xs"
                                            className="!h-5 !w-5" onClick={() => onShowDetails(item)} />
                                    </Tooltip>
                                </div>
                            </div>
                            <p className="text-2xl  font-semibold dark:!text-white text-black">
                                {item.CurrencySymbol}{item.TotalAmount?.toLocaleString('en-IN')}

                            </p>
                            <div className="flex mt-2 items-center text-sm font-medium px-2 py-3 dark:bg-[#21283b] bg-[#2e62f188] text-black dark:text-[#307EF3]">
                                {item.AgencyName}
                            </div>
                            <h1 className="text-xl mt-3 mb-4 font-semibold dark:!text-white text-black">
                                Deal Expires In
                            </h1>
                            <CountdownTimer date={item.DealPeriodToDate} />
                            <ProgressionBar progression={Math.round((item.BalanceAmount / item.TotalAmount) * 100)}></ProgressionBar>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
};

export default ExpiringDeals