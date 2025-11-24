import { useState } from 'react';
import './index.css';
import { Button, Card, Avatar } from 'components/ui';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiHide } from 'react-icons/bi';
import { MdCompare, MdOutlineCurrencyRupee } from 'react-icons/md';
import NumberFormat from 'react-number-format';
import BulletGraph from './BulletGraph';
import ManualMatchDialog from './components/ManualMatch/ManualMatchDialog';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';

/* CONSTANTS */
const TABLE_COLUMNS = [
  {
    header: 'Content Name',
    accessorKey: 'ContentName',
  },
  {
    header: 'Agency Name',
    accessorKey: 'AgencyName',
  },
  {
    header: 'Client Name',
    accessorKey: 'ClientName',
  },
  {
    header: 'Brand No',
    accessorKey: 'BrandName',
  },
  {
    header: 'Video Id',
    accessorKey: 'VideoID',
  },
  {
    header: 'Commercial Caption',
    accessorKey: 'CommercialCaption',
  },
  {
    header: 'Commercial Duration',
    accessorKey: 'CommercialDuration',
  },
  {
    header: 'Scheduled Time',
    accessorKey: 'ScheduleTime',
  },
  {
    header: 'Spot Amount',
    accessorKey: 'SpotAmount',
  },
  {
    header: 'Timeband Name',
    accessorKey: 'TimeBandName',
  },
];

function RetrievedDataSummary({
  data,
  date,
  channel,
  currentRouteTitle,
  token,
}) {
  /* STATES */
  const [showTable, setShowTable] = useState(false);
  const [isManualMatchDialogOpen, setIsManualMatchDialogOpen] = useState(false);
  const [managedColumns, setManagedColumns] = useState(TABLE_COLUMNS);

  /* HELPER FUNCTIONS */
  const getAccountsTotal = () => {
    try {
      let total = 0;
      data.forEach((spot) => {
        total = total + spot.SpotAmount;
      });
      return total;
    } catch (error) {
      console.error(error);
    }
  };

  const getPaidSpots = () => {
    try {
      return data.filter((spot) => spot.SpotTypeName === 'PAID');
    } catch (error) {
      console.error(error);
    }
  };

  const getBonusSpots = () => {
    try {
      return data.filter((spot) => spot.SpotTypeName === 'BONUS');
    } catch (error) {
      console.error(error);
    }
  };

  const getBarterSpots = () => {
    try {
      return data.filter((spot) => spot.SpotTypeName === 'BARTER');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="lg:flex items-center justify-between mb-4">
        <h4 className="dark:!text-gray-200 text-gray-500">Retrieved Spots</h4>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="solid"
            icon={<MdCompare />}
            onClick={() => setIsManualMatchDialogOpen(true)}
          >
            Manual Match
          </Button>
          {!showTable ? (
            <Button
              size="sm"
              variant="solid"
              icon={<GiHamburgerMenu />}
              onClick={() => setShowTable(true)}
            >
              View Table
            </Button>
          ) : (
            <Button
              size="sm"
              variant="solid"
              icon={<BiHide />}
              onClick={() => setShowTable(false)}
            >
              Hide Table
            </Button>
          )}
        </div>
      </div>
      {!showTable ? (
        <div className="grid grid-cols-3 gap-4">
          {/* Insert cards in below divs to maintain masonry layout */}
          <div className="col-span-1 flex flex-col gap-4">
            <BulletGraph
              className="!bg-transparent h-max"
              title="Spots Summary"
              header={{ value: data.length, label: 'Total Spots Scheduled' }}
              data={[
                {
                  value: getPaidSpots().length,
                  label: 'Paid Spots',
                  color: 'red-500',
                },
                {
                  value: getBonusSpots().length,
                  label: 'Bonus Spots',
                  color: 'green-500',
                },
                {
                  value: getBarterSpots().length,
                  label: 'Barter Spots',
                  color: 'yellow-500',
                },
              ]}
            />
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <Card className="!bg-transparent h-max">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    icon={<MdOutlineCurrencyRupee />}
                    shape="circle"
                    size="md"
                    className="!bg-emerald-500"
                  />
                  <div>
                    <h6 className="font-bold">Accounts</h6>
                    <p>Total</p>
                  </div>
                </div>
                <div className="text-right rtl:text-left">
                  <h6 className="mb-2">
                    &#8377;&nbsp;
                    <NumberFormat
                      displayType="text"
                      value={getAccountsTotal()}
                      thousandSeparator
                      decimalScale={2}
                      fixedDecimalScale
                    />
                  </h6>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-span-1 flex flex-col gap-4"></div>
        </div>
      ) : data.length > 0 ? (
        <ReportsTable
          tableData={data}
          tableName={'retrievedSpots'}
          originalColumns={TABLE_COLUMNS}
          managedColumns={managedColumns}
          setManagedColumns={setManagedColumns}
          exportFileName="Retrieved Spots"
          columnsToFormatInINR={['BalancedAmount', 'TotalAmount']}
        />
      ) : (
        <div className="h-[40vh] flex justify-center items-center">
          No spots found
        </div>
      )}
      <ManualMatchDialog
        isManualMatchDialogOpen={isManualMatchDialogOpen}
        setIsManualMatchDialogOpen={setIsManualMatchDialogOpen}
        channel={channel}
        date={date}
        currentRouteTitle={currentRouteTitle}
        token={token}
      />
    </>
  );
}

export default RetrievedDataSummary;
