import { Card } from 'components/ui';
import React from 'react';
import AreaChart from '../../Charts/AreaChart';
import { CHART_OPTIONS, CHART_SERIES } from './constants';
import { IoMdTrendingUp } from 'react-icons/io';

function AudiencePeakDetails() {
  return (
    <Card bordered={false} bodyClass="px-2 py-3 h-full" className="h-full">
      <div className="h-full flex flex-col mx-1.5">
        <p className="text-white text-lg">Audience Peak Details</p>
        <div className="grow flex flex-col justify-between gap-4">
          <div className="flex justify-between mt-6">
            <div>
              <h3>1526.18</h3>
              <p>Peak AMA (000's)</p>
            </div>
            <div className="mr-1.5">
              <p className="text-center flex justify-between items-center gap-2 text-teal-300 font-semibold bg-teal-900 py-1 px-2 rounded-2xl">
                <IoMdTrendingUp className="text-xl" />
                <span>10%</span>
              </p>
            </div>
          </div>
          <AreaChart
            width="300%"
            chartOptions={CHART_OPTIONS}
            chartSeries={CHART_SERIES}
            additionalChartContainerClasses="no-scrollbar"
          />
          <div className="flex justify-between mb-6">
            <div>
              <h3>20:00</h3>
              <p>Peak AMA Start Time</p>
            </div>
            <div>
              <h3>22:00</h3>
              <p>Peak AMA End Time</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AudiencePeakDetails;
