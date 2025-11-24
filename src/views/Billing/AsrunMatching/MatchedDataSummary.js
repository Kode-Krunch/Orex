import { useState } from 'react';
import './index.css';
import { Button, Card, Tabs, Tooltip } from 'components/ui';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiHide } from 'react-icons/bi';
import NumberFormat from 'react-number-format';
import BulletGraph from './BulletGraph';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { MdOutlineEdit } from 'react-icons/md';
import { StickyFooter } from 'components/shared';
import MissedSpotsUpdationDialog from './components/MissedSpotsUpdation/MissedSpotsUpdationDialog';
import WarningDialog from 'views/Controls/WarningDialog';
import {
  isJSONArrayEqual,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { apiPOSTAsrunMatch } from 'services/BillingService';
import Loader from 'views/Controls/Loader';
import { asunMatchingRouteTitle } from 'configs/routes.config';

/* CONSTANTS */
const { TabNav, TabList, TabContent } = Tabs;
const TABLE_COLUMNS = [
  {
    header: 'Content',
    accessorKey: 'ContentName',
  },
  {
    header: 'Agency',
    accessorKey: 'AgencyName',
  },
  {
    header: 'Client',
    accessorKey: 'ClientName',
  },
  {
    header: 'Brand',
    accessorKey: 'BrandName',
  },
  {
    header: 'Video Id',
    accessorKey: 'VideoID',
  },
  {
    header: 'Commercial',
    accessorKey: 'CommercialCaption',
  },
  {
    header: 'Duration',
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
    header: 'Timeband',
    accessorKey: 'TimeBandName',
  },
  {
    header: 'Telecast Time',
    accessorKey: 'AsRunTime',
  },
  {
    header: 'Telecast Duration',
    accessorKey: 'AsRunDuration',
  },
  {
    header: 'Status',
    accessorKey: 'Remark',
  },
];

const AccountsInfo = ({ label, value, isLast }) => {
  return (
    <li
      className={`flex items-center justify-between${!isLast ? ' mb-3' : ''}`}
    >
      <span style={{ fontSize: '15px' }}>{label}</span>
      <span className="font-semibold" style={{ fontSize: '15px' }}>
        <NumberFormat
          displayType="text"
          value={(value * 100) / 100}
          prefix={'₹ '}
          thousandSeparator
          decimalScale={2}
          fixedDecimalScale
        />
      </span>
    </li>
  );
};

function MatchedDataSummary({
  data,
  channel,
  telecastDate,
  currentRouteTitle,
  token,
}) {
  /* STATES */
  const [missedSpots, setMissedSpots] = useState(
    JSON.parse(JSON.stringify(data.missedSpots)),
  );
  const [originalMissedDataColumns] = useState([
    ...getTableColumnsWithActions(),
    { accessorKey: 'Reason', header: 'Reason' },
  ]);
  const [managedColumns, setManagedColumns] = useState([]);
  const [clickedRow, setClickedRow] = useState({ data: null, index: null });
  /* UI States */
  const [showTable, setShowTable] = useState(false);
  const [isMissedSpotsUpdationDialogOpen, setIsMissedSpotsUpdationDialogOpen] =
    useState(false);
  const [isResetMissedSpotsDialogOpen, setIsResetMissedSpotsDialogOpen] =
    useState(false);
  const [showLoader, setShowLoader] = useState(false);

  /* EVENT HANDLERS */
  const handleRowClick = (index, rowData) => {
    try {
      setClickedRow({ data: rowData, index });
      setIsMissedSpotsUpdationDialogOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetMissedSpots = () => {
    try {
      setMissedSpots(JSON.parse(JSON.stringify(data.missedSpots)));
      setIsResetMissedSpotsDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      let IsNTC = 0;
      if (currentRouteTitle !== asunMatchingRouteTitle) {
        IsNTC = 1;
      }
      setShowLoader(true);
      let finalData = [...missedSpots, ...data.matchedSpots];
      let response = await apiPOSTAsrunMatch(finalData, channel, token, IsNTC);
      if (response) {
        if (response.status === 200) {
          openNotification('success', 'Missed spots saved successfully');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          openNotification(
            'danger',
            `Something went wrong while saving manual match data. Server responded with status code ${response.status}`,
          );
        }
      } else {
        openNotification(
          'danger',
          'Something went wrong. Unable to save manual match data',
        );
      }
      setShowLoader(false);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong. Unable to save missed spots',
      );
      setShowLoader(false);
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  function getTableColumnsWithActions() {
    try {
      return [
        {
          header: 'Action',
          accessorKey: 'action',
          actions: [
            {
              action: (rowIndex, rowData) => (
                <Tooltip title="Match Spot" key={rowIndex}>
                  <Button
                    size="xs"
                    variant="plain"
                    shape="circle"
                    icon={<MdOutlineEdit />}
                    onClick={() => handleRowClick(rowIndex, rowData)}
                  />
                </Tooltip>
              ),
            },
          ],
        },
        ...TABLE_COLUMNS,
      ];
    } catch (error) {
      console.error(error);
    }
  }

  const getPaidSpots = () => {
    try {
      let paidSpots = [];
      data.matchedSpots.forEach((spot) => {
        if (spot.SpotTypeName === 'PAID') {
          paidSpots.push(spot);
        }
      });
      data.missedSpots.forEach((spot) => {
        if (spot.SpotTypeName === 'PAID') {
          paidSpots.push(spot);
        }
      });
      return paidSpots;
    } catch (error) {
      console.error(error);
    }
  };

  const getBonusSpots = () => {
    try {
      let paidSpots = [];
      data.matchedSpots.forEach((spot) => {
        if (spot.SpotTypeName === 'BONUS') {
          paidSpots.push(spot);
        }
      });
      data.missedSpots.forEach((spot) => {
        if (spot.SpotTypeName === 'BONUS') {
          paidSpots.push(spot);
        }
      });
      return paidSpots;
    } catch (error) {
      console.error(error);
    }
  };

  const getBarterSpots = () => {
    try {
      let paidSpots = [];
      data.matchedSpots.forEach((spot) => {
        if (spot.SpotTypeName === 'BARTER') {
          paidSpots.push(spot);
        }
      });
      data.missedSpots.forEach((spot) => {
        if (spot.SpotTypeName === 'BARTER') {
          paidSpots.push(spot);
        }
      });
      return paidSpots;
    } catch (error) {
      console.error(error);
    }
  };

  const getAccountsTotal = (type) => {
    try {
      let total = 0;
      if (type === 'matched') {
        data.matchedSpots.forEach((spot) => {
          total = total + spot.SpotAmount;
        });
      } else if (type === 'missed') {
        data.missedSpots.forEach((spot) => {
          total = total + spot.SpotAmount;
        });
      } else if (type === 'total') {
        data.matchedSpots.forEach((spot) => {
          total = total + spot.SpotAmount;
        });
        data.missedSpots.forEach((spot) => {
          total = total + spot.SpotAmount;
        });
      }
      return total;
    } catch (error) {
      console.error(error);
    }
  };

  const isMissedSpotsEdited = () => {
    try {
      if (isJSONArrayEqual(data.missedSpots, missedSpots)) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="lg:flex items-center justify-between mb-4">
        <h4 className="dark:!text-gray-200 text-gray-500">Matched Spots</h4>
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
      {!showTable ? (
        <div className="grid grid-cols-3 gap-4">
          {/* Insert cards in below divs to maintain masonry layout */}
          <div className="col-span-1 flex flex-col gap-4">
            <BulletGraph
              className="!bg-transparent"
              title="Spots Summary"
              header={{
                value: data.matchedSpots.length + data.missedSpots.length,
                label: 'Total Spots Scheduled',
              }}
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
            <BulletGraph
              className="!bg-transparent"
              title="Matched Spots Summary"
              header={{
                value: data.matchedSpots.length + data.missedSpots.length,
                label: 'Total Spots Scheduled',
              }}
              data={[
                {
                  value: data.matchedSpots.length,
                  label: 'Matched Spots',
                  color: 'green-500',
                },
                {
                  value: data.missedSpots.length,
                  label: 'Missed Spots',
                  color: 'red-500',
                },
              ]}
            />
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <Card className="mb-4">
              <h5 className="mb-4">Accounts</h5>
              <ul>
                <AccountsInfo
                  label="Matched Spot Amount"
                  value={getAccountsTotal('matched')}
                />
                <AccountsInfo
                  label="Missed Spot Amount"
                  value={getAccountsTotal('missed')}
                />
                <hr className="mb-3" />
                <AccountsInfo
                  label="Total Amount"
                  value={getAccountsTotal('total')}
                  isLast
                />
              </ul>
            </Card>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="tab1">
          <TabList>
            <TabNav value="tab1">Matched</TabNav>
            <TabNav value="tab2">Missed</TabNav>
            <TabNav value="tab3">All</TabNav>
          </TabList>
          <div className="pt-4">
            <TabContent value="tab1">
              {data.matchedSpots.length > 0 ? (
                <ReportsTable
                  tableData={data.matchedSpots}
                  tableName={'matchedSpotsSummaryMatchedSpots'}
                  originalColumns={TABLE_COLUMNS}
                  managedColumns={managedColumns}
                  setManagedColumns={setManagedColumns}
                  exportFileName="Matched Spots"
                  columnsToFormatInINR={[]}
                />
              ) : (
                <div className="h-[40vh] flex justify-center items-center">
                  No matched spots found
                </div>
              )}
            </TabContent>
            <TabContent value="tab2">
              {missedSpots.length > 0 ? (
                <>
                  <ReportsTable
                    tableData={missedSpots}
                    tableName={'matchedSpotsSummaryMissedSpots'}
                    originalColumns={originalMissedDataColumns}
                    managedColumns={managedColumns}
                    setManagedColumns={setManagedColumns}
                    exportFileName="Missed Spots"
                    columnsToFormatInINR={[]}
                  />
                  {isMissedSpotsEdited() && (
                    <StickyFooter
                      className="-mx-8 px-8 flex items-center justify-end py-4"
                      stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-end">
                        <div className="flex gap-3">
                          <Button
                            variant="plain"
                            onClick={() =>
                              setIsResetMissedSpotsDialogOpen(true)
                            }
                          >
                            Reset
                          </Button>
                          <Button variant="solid" onClick={handleSave}>
                            Save
                          </Button>
                        </div>
                      </div>
                    </StickyFooter>
                  )}
                </>
              ) : (
                <div className="h-[40vh] flex justify-center items-center">
                  No missed spots found
                </div>
              )}
            </TabContent>
            <TabContent value="tab3">
              {data.allSpots.length > 0 ? (
                <ReportsTable
                  tableData={data.allSpots}
                  tableName={'matchedSpotsSummaryAllSpots'}
                  originalColumns={TABLE_COLUMNS}
                  managedColumns={managedColumns}
                  setManagedColumns={setManagedColumns}
                  exportFileName="All Spots"
                  columnsToFormatInINR={[]}
                />
              ) : (
                <div className="h-[40vh] flex justify-center items-center">
                  No spots found
                </div>
              )}
            </TabContent>
          </div>
        </Tabs>
      )}
      <MissedSpotsUpdationDialog
        isMissedSpotsUpdationDialogOpen={isMissedSpotsUpdationDialogOpen}
        setIsMissedSpotsUpdationDialogOpen={setIsMissedSpotsUpdationDialogOpen}
        clickedRow={clickedRow}
        channel={channel}
        telecastDate={telecastDate}
        setMissedSpots={setMissedSpots}
      />
      <WarningDialog
        isDialogOpen={isResetMissedSpotsDialogOpen}
        title="Reset Changes"
        description={`Are you sure you want to reset all changes?`}
        submitButtonTitle="Reset"
        handleDialogSubmit={handleResetMissedSpots}
        handleDialogClose={() => {
          setIsResetMissedSpotsDialogOpen(false);
        }}
      />
      <Loader showLoader={showLoader} />
    </>
  );
}

export default MatchedDataSummary;
