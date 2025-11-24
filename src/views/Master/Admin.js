import React, { useEffect, useState } from 'react';
import StorageStatusCard from 'views/Controls/Dashboard/StorageStatusCard';
import UsersStatusCard from 'views/Controls/Dashboard/UsersStatusCard/UsersStatusCard';
import { apiCallstoreprocedure } from 'services/CommonService';
import { format, parseISO } from 'date-fns';
import DashboardShortcutCards from 'views/Controls/Dashboard/DashboardShortcutCards';
import { ADMIN_DASHBOARD_SHORTCUTS } from 'views/Controls/Dashboard/constants/dashboardShortcuts';
import CalendarForProgram from 'components/ui/DatePicker/CalendarForProgram';
import { Button, Tabs } from 'components/ui';
import CalendarForSchedule from 'components/ui/DatePicker/CalendarForSchedule';
import { Container } from 'components/shared';
import DashboardHeader from 'views/Controls/Dashboard/DashboardHeader';
import { PiTelevisionLight } from 'react-icons/pi';
import { MdLiveTv, MdOutlineQueueMusic } from 'react-icons/md';
import appConfig from 'configs/app.config';
import { useSelector } from 'react-redux';
import { CLIENT } from 'views/Controls/clientListEnum';
// import { logdata } from 'views/fianlog';
// import { ExportToCSV } from 'views/Controls/ExportToCSV';
const { TabNav, TabList, TabContent } = Tabs;
/* CONSTANTS */

const Admin = () => {
  const [storageDetails, setStorageDetails] = useState({});
  const [ACTIVE_USERS, setACTIVE_USERS] = useState([]);
  const [INACTIVE_USERS, setINACTIVE_USERS] = useState([]);
  const [USERS_SUMMARY, setUSERS_SUMMARY] = useState([]);
  const channel = useSelector((state) => state.locale.selectedChannel);
  useEffect(() => {
    const fetchStorageDetails = async () => {
      try {

        const flagValue = channel.label === 'SINGAPORE ANI PLUS' ? 'pybats_2_dbo' : 'PYBATS_2';
        console.log('flagValue', flagValue);

        // const CurrentDBSize = await apiCallstoreprocedure('GetCurrentDBSize', {
        //   flag: 'PYBATS_2',
        // });

        // const DBBackup = await apiCallstoreprocedure('GetLastDBBackupDetail', {
        //   flag: 'PYBATS_2',
        // });

        const CurrentDBSize = await apiCallstoreprocedure('GetCurrentDBSize', {
          flag: flagValue,
        });

        const DBBackup = await apiCallstoreprocedure('GetLastDBBackupDetail', {
          flag: flagValue,
        });

        console.log('channel', channel.label);
        console.log('DBBackup', DBBackup);

        const Date = format(
          parseISO(DBBackup.data[0]['Last Full']),
          "MMMM dd, yyyy 'at' hh:mm a",
        );
        const data = {
          lastBackupTimestamp: Date,
          storageDetails: {
            totalStorage: 1,
            storageUnit: 'TB',
            usedStorage: CurrentDBSize.data[0].CurrentDBSize,
            //usedPercent: (CurrentDBSize.data[0].CurrentDBSize / 10000) * 100, // Assuming 2TB total storage
            usedPercent: (CurrentDBSize.data[0].CurrentDBSize / (1 * 1024 * 1024)) * 100
          },
        };
        setStorageDetails(data);
      } catch (error) {
        console.error('Error fetching storage details:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const User = await apiCallstoreprocedure(
          'GetActiveInActiveUsersInfo',
          {},
        );
        const Active = User.data.filter((item) => item.Status === 'Online');
        const InActive = User.data
          .filter((item) => item.Status !== 'Online')
          .map((item) => ({
            UserName: item.UserName,
            Email: item.Email,
            Status: 'Offline',
          }));
        console.log(InActive);
        setACTIVE_USERS(Active);
        setINACTIVE_USERS(InActive);
      } catch (error) {
        console.error('Error fetching User details:', error);
      }
    };

    const fetchSummary = async () => {
      try {
        const Summary = await apiCallstoreprocedure(
          'GetDepartmentwiseUsersInfo',
          {},
        );
        setUSERS_SUMMARY(Summary.data);
        // setUSERS_SUMMARY(Summary.data, columns);
      } catch (error) { }
    };
    fetchSummary();
    fetchUser();
    fetchStorageDetails();
  }, []);
  // const APO = logdata.map((item) => ({
  //   F_C_S_P: item.F_C_S_P == 'NTC' ? 'SEC' : 'PRI',
  //   Tel_Time: item.Tel_Time,
  //   Video_ID: item.Video_ID
  // }))
  return (
    <Container>
      {/* <Button onClick={() => ExportToCSV(APO)}>Export CSV</Button> */}
      <DashboardHeader
        Name={'Admin Dashboard'}
        Page={'Admin'}
        Links={'Admin'}
      />
      <div>
        <div
          className={`grid grid-cols-${ADMIN_DASHBOARD_SHORTCUTS.length} gap-4`}
        >
          <DashboardShortcutCards shortcuts={ADMIN_DASHBOARD_SHORTCUTS} />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <StorageStatusCard
              lastBackupTimestamp={storageDetails.lastBackupTimestamp}
              storageDetails={storageDetails.storageDetails}
              tabContentMaxHeight="35vh"
              isDisplayBackup={true}
            />
          </div>
          <div className="col-span-4">
            <UsersStatusCard
              activeUsers={ACTIVE_USERS}
              inactiveUsers={INACTIVE_USERS}
              tabContentMaxHeight="200px"
            />
          </div>
          <div className="col-span-4">
            <div
              className="web-card mb-0 p-3 flex flex-col overflow-hidden hover:overflow-y-scroll hover:pr-2 dark:!bg-[#1f2639] !bg-[#fff]"
              style={{ maxHeight: '35vh', minHeight: '100%' }}
            >
              <Tabs defaultValue="tab1">
                <TabList>
                  <TabNav value="tab1" icon={<PiTelevisionLight />}>
                    {channel.label == CLIENT.USA_Forbes
                      ? 'Playlist Template'
                      : 'FPC'}
                  </TabNav>

                  {channel.label != CLIENT.USA_Forbes && (
                    <TabNav value="tab2" icon={<MdLiveTv />}>
                      Daily FPC
                    </TabNav>
                  )}
                  <TabNav value="tab3" icon={<MdOutlineQueueMusic />}>
                    {channel.label == CLIENT.USA_Forbes
                      ? 'Playlist'
                      : 'Final_Log'}
                  </TabNav>
                  {/* <TabNav value="tab4">As Run</TabNav> */}
                </TabList>
                <div className="px-4">
                  <TabContent value="tab1">
                    <div className="">
                      {/* <label className="font-semibold mb-5">FPC Status</label> */}
                      <div className="mt-2">
                        <CalendarForProgram
                          multipleSelection
                          value={''}
                          name={
                            channel.label == CLIENT.USA_Forbes
                              ? 'FPC_NEW'
                              : 'FPC'
                          }
                        />
                      </div>
                    </div>
                  </TabContent>

                  <TabContent value="tab2">
                    <div className="">
                      {/* <label className="font-semibold">Daily FPC</label> */}
                      <div className="mt-2">
                        <CalendarForProgram
                          multipleSelection
                          value={''}
                          name="Daily"
                        />
                      </div>
                    </div>
                  </TabContent>
                  <TabContent value="tab3">
                    <div className="">
                      {/* <label className="font-semibold">Final Log</label> */}
                      <div className="mt-2">
                        <CalendarForSchedule
                          multipleSelection
                          value={''}
                          name="Final"
                        />
                      </div>
                    </div>
                  </TabContent>
                </div>
              </Tabs>
            </div>
            {/* <UsersSummary
          userSummary={USERS_SUMMARY}
          columns={columns}
          tableHeight="43vh"
        /> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Admin;
