import { Progress } from 'components/ui';
import React from 'react';

const MonthlyDealProjectionCard = ({ montlyProjection = [] }) => {
    const renderProgressSection = (data, label, color) => (
        <div className="mt-4">
            <div className="flex items-center mb-2">
                <h6>₹ {data?.TargetAcieved?.toLocaleString('en-IN') || 0}</h6>
                <p className="ml-2 text-sm font-normal text-slate-400">({label})</p>
            </div>
            <Progress
                percent={data?.TargetAcievedPercent || 0}
                size="xl"
                color={color}
                customInfo={<></>}
            />
        </div>
    );

    return (
        <div className="web-card animate__animated col-span-2 dark:!bg-[#1f2639] !bg-white dark:!border-[#374558] dark:!border px-2 pb-2">
            <h4 className="mb-2 mt-2 text-lg font-bold dark:text-gray-400 text-gray-800">
                Monthly Deal Projection
            </h4>
            <div className="flex items-center">
                <h4 className="text-2xl font-medium dark:text-gray-400 text-gray-800">
                    ₹ {montlyProjection[1]?.TargetAcieved?.toLocaleString('en-IN') || 0}
                </h4>
                <p className="ml-2 text-sm font-normal dark:text-gray-400 text-gray-800">
                    Total Revenue
                </p>
            </div>
            {renderProgressSection(montlyProjection[0], 'Previous Month', 'red-500')}
            {renderProgressSection(montlyProjection[1], 'Current Month', 'amber-500')}
        </div>
    );
};

export default MonthlyDealProjectionCard;
