import { Avatar, Button, Progress, Tag, Tooltip } from 'components/ui';
import React, { useMemo, useCallback } from 'react';
import { BsInfoLg } from 'react-icons/bs';
import { HiDotsHorizontal } from 'react-icons/hi';
import { CurrencyFormatter, numberToINRFormat } from 'views/Controls/GLOBALFUNACTION';
import BarF from '../BarF';

const ThisMonthDealCard = ({
    thisMonthDealList = [],
    handleShowDetailsClick,
    monthlySalesGrowthData = 0,
    dueAmountandOverDueAmount = {},
    salesExecutiveData = [],
    openDialog
}) => {

    const renderDeals = useMemo(() =>
        thisMonthDealList.map((user, key) => (
            <div className="flex flex-col gap-1 py-2 border-b border-b-gray-700" key={key}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Avatar size="sm" className={`mr-2 dark:${user.color} ${user.color}`}>
                            <p className="text-base"> D</p>
                        </Avatar>
                        <div>
                            <p className="text-base font-semibold dark:text-gray-200 text-gray-800 capitalize">
                                {user.DealCode}
                                <Tooltip title="Show Details">
                                    <Button
                                        shape="circle"
                                        icon={<BsInfoLg className="text-xs" />}
                                        size="xs"
                                        className="!h-5 !w-5 ml-2"
                                        onClick={() => handleShowDetailsClick(user)}
                                    />
                                </Tooltip>
                            </p>
                        </div>
                    </div>
                    <Tag prefix prefixClass="bg-emerald-500" showCloseButton={false}>
                        <span className="text-[1rem] text-gray-400">
                            {user.CurrencySymbol} {numberToINRFormat(user.TotalAmount)}
                        </span>
                    </Tag>
                </div>
            </div>
        )), [thisMonthDealList, handleShowDetailsClick]);

    return (
        <div className="grid grid-cols-8 gap-2">
            <div className="col-span-3 web-card dark:!bg-[#1f2639] !bg-[#fff] dark:!border-[#374558] dark:!border px-5">
                <h4 className="mt-2 pb-2 border-b border-gray-700 dark:text-slate-200 text-gray-800 text-lg font-bold">
                    This Month Deal
                </h4>
                <div className="h-[200px] overflow-hidden hover:overflow-y-scroll hover:pr-2">
                    {renderDeals}
                </div>
            </div>
            <div className="col-span-2">
                <div className="p-2 web-card dark:!bg-[#1f2639] !bg-[#fff] dark:!border-[#374558] dark:!border">
                    <div className="flex items-center justify-between pr-2">
                        <h4 className="p-3 dark:text-gray-200 text-gray-800 text-lg font-bold">
                            Monthly Sale
                        </h4>
                        <HiDotsHorizontal />
                    </div>
                    <div className="flex items-center mt-[-15px]">
                        <div className="p-3">
                            <h6>Growth</h6>
                            <h3>{monthlySalesGrowthData}</h3>
                        </div>
                        <BarF type="area" COLORS={['red-500']} />
                    </div>
                </div>
                <div className="p-4 web-card dark:!bg-[#1f2639] !bg-[#fff] dark:!border-[#374558] dark:!border">
                    <div className="flex items-center justify-between pr-2">
                        <h4 className="dark:text-gray-200 text-gray-800 text-lg font-bold">
                            Invoices
                        </h4>
                        <HiDotsHorizontal />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {['Due', 'Overdue'].map((label, index) => (
                            <div key={index} className={index === 0 ? "border-r border-dashed" : ""}>
                                <h4 className="text-center dark:text-gray-200 text-gray-800 text-md font-semibold">
                                    {label}
                                </h4>
                                <h4 className="text-center dark:text-gray-200 text-gray-800 text-lg font-semibold">
                                    <CurrencyFormatter
                                        amountString={index === 0 ? dueAmountandOverDueAmount.DueAmount : dueAmountandOverDueAmount.OverDueAmount}
                                    />
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-span-3">
                <div className="px-5 py-3 web-card dark:!bg-[#1f2639] !bg-[#fff] dark:!border-[#374558] dark:!border ">
                    <h4 className="mt-5 dark:text-gray-200 text-gray-800 text-lg font-bold">
                        Sales Executive
                    </h4>
                    <div className="flex justify-between items-center px-4 py-4 border-b border-dashed border-gray-400">
                        <h5 className="dark:text-gray-200 text-gray-800">User Name</h5>
                        <h5 className="dark:text-gray-200 text-gray-800">Yearly Achievement (%)</h5>
                    </div>
                    {salesExecutiveData?.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-2 gap-4 px-1 py-1 cursor-pointer border-b border-dashed border-gray-400"
                            onClick={() => openDialog(index)}
                        >
                            <div className="mx-4">
                                <p className="uppercase dark:text-gray-200 text-gray-800">
                                    {item.Emp_FirstName}
                                </p>
                            </div>
                            <div className="flex">
                                <Progress
                                    size="sm"
                                    percent={item.TargetAcievedPercent}
                                    color={
                                        item.TargetAcievedPercent > 100 ? 'green-500'
                                            : item.TargetAcievedPercent > 50 ? 'blue-500'
                                                : 'red-500'
                                    }
                                    customInfo
                                />
                                <p className="dark:text-gray-200 text-gray-800">
                                    {item.TargetAcievedPercent}%
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThisMonthDealCard;
