import { Button, Card } from 'components/ui';
import { useState } from 'react';
import { BsList } from 'react-icons/bs';
import { LuBarChart3 } from 'react-icons/lu';
import {
  CHART_OPTIONS,
  CHART_SERIES,
  COLUMNS,
  TABLE_DATA,
  TOOLBAR_OPTIONS,
} from './constants';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import AreaChart from '../../Charts/AreaChart';

function ChannelRatingsTrend() {
  /* STATES */
  const [curView, setCurView] = useState('graph');
  const [managedColumns, setManagedColumns] = useState([]);

  return (
    <Card bordered={false} bodyClass="px-2 py-3 h-full" className="h-full">
      <div className="h-full flex flex-col">
        <div className="flex justify-between">
          <p className="text-white text-lg ml-1.5">Channel Ratings Trend</p>
          <Button
            icon={
              curView === 'graph' ? (
                <BsList className="text-lg" />
              ) : (
                <LuBarChart3 className="text-sm" />
              )
            }
            size="sm"
            variant="twoTone"
            onClick={() => setCurView(curView === 'graph' ? 'table' : 'graph')}
          >
            {curView === 'graph' ? 'Table' : 'Graph'}
          </Button>
        </div>

        {curView === 'graph' ? (
          <div className="grow">
            <AreaChart
              width="300%"
              chartOptions={CHART_OPTIONS}
              chartSeries={CHART_SERIES}
            />
          </div>
        ) : (
          <div className="pb-1 grow overflow-auto">
            <ReportsTable
              tableData={TABLE_DATA}
              originalColumns={COLUMNS}
              managedColumns={managedColumns}
              setManagedColumns={setManagedColumns}
              exportFileName="ChannelRatingsTrend"
              columnsToFormatInINR={[]}
              toolbarOptions={TOOLBAR_OPTIONS}
              externalGlobalFilter=""
              tableName="ChannelRatingsTrend"
            />
          </div>
        )}
      </div>
    </Card>
  );
}

export default ChannelRatingsTrend;
