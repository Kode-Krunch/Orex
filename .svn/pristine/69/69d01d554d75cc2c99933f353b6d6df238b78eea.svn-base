import { Card } from 'components/ui';
import React from 'react';
import { CHART_OPTIONS, CHART_SERIES } from './constants';
import ColumnChart from '../../Charts/ColumnChart';

function PeakVsNonPeakDetails() {
  return (
    <Card bordered={false} bodyClass="px-2 py-3 h-full" className="h-full">
      <div className="h-full flex flex-col">
        <p className="text-white text-lg mx-1.5">Peak Vs Non-Peak AMA</p>
        <div className="grow flex flex-col justify-between gap-2">
          <div className="h-[50%] mt-3">
            <ColumnChart
              width="100%"
              chartOptions={CHART_OPTIONS}
              chartSeries={CHART_SERIES}
              additionalChartContainerClasses="no-scrollbar"
            />
          </div>
          <div className="mx-1.5 flex flex-col gap-8 mb-4">
            <div className="flex justify-between">
              <div>
                <h5>20:00 - 22:00</h5>
                <p>Peak AMA Time</p>
              </div>
              <div className="text-right">
                <h5>1234.56</h5>
                <p>Peak AMA (000's)</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <h5>3:00 - 6:00</h5>
                <p>Non-Peak AMA Time</p>
              </div>
              <div className="text-right">
                <h5>123.45</h5>
                <p>Non-Peak AMA (000's)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PeakVsNonPeakDetails;
