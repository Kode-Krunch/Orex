import React from 'react';
import ConsumptionCard from './ConsumptionCard';

function FpcConsumption({ priTableSelectedOrgRepRunStatus }) {
  return (
    <>
      {priTableSelectedOrgRepRunStatus && (
        <div className="flex h-full gap-4">
          <div className="h-full pr-4 border-r border-r-gray-700">
            <ConsumptionCard
              title="ORIGINAL RUN STATUS"
              total={priTableSelectedOrgRepRunStatus.orgRunStatus.total}
              consumed={priTableSelectedOrgRepRunStatus.orgRunStatus.consumed}
              balance={priTableSelectedOrgRepRunStatus.orgRunStatus.balance}
            />
          </div>
          <ConsumptionCard
            title="REPEAT RUN STATUS"
            total={priTableSelectedOrgRepRunStatus.repRunStatus.total}
            consumed={priTableSelectedOrgRepRunStatus.repRunStatus.consumed}
            balance={priTableSelectedOrgRepRunStatus.repRunStatus.balance}
          />
        </div>
      )}
    </>
  );
}

export default FpcConsumption;
