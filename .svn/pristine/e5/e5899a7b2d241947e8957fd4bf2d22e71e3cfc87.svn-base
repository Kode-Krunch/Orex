import { Input, Tabs } from 'components/ui';
import TabContent from 'components/ui/Tabs/TabContent';
import TabList from 'components/ui/Tabs/TabList';
import TabNav from 'components/ui/Tabs/TabNav';
import React, { useState } from 'react';
import UsersList from './UsersList';
import { HiStatusOffline, HiStatusOnline } from 'react-icons/hi';
import { BsDatabaseFill } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';

function UsersStatusCard({ activeUsers, inactiveUsers, tabContentMaxHeight }) {
  /* STATES */
  const [activeTab, setActiveTab] = useState('Online');
  const [Search, setSearch] = useState('');
  return (
    <div className="web-card mb-0 p-3 flex flex-col min-h-[350px] max-h-[350px] h-[350px] px-5 dark:!bg-[#1f2639] !bg-[#fff]">
      <div className="flex justify-between items-center border-b pb-2 mb-1 border-gray-700">
        <h5 className=" flex items-center ">
          <FaRegUserCircle className="mr-2" size={23} />
          Users
        </h5>
        <div>
          <Input
            size="sm"
            placeholder="Search"
            style={{ width: '180px' }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Tabs
        defaultValue="Online"
        className="grow flex flex-col"
        onChange={(tab) => setActiveTab(tab)}
      >
        <TabList>
          <TabNav value="Online" icon={<HiStatusOnline />}>
            Online
          </TabNav>
          <TabNav
            value="Offline"
            icon={<HiStatusOffline />}
            // className="dark:!text-white !text-black"
          >
            Offline
          </TabNav>
        </TabList>
        <div className="mt-2 grow">
          {activeTab === 'Online' && (
            <TabContent
              value="Online"
              className="overflow-hidden hover:overflow-y-scroll hover:pr-2"
              style={{ maxHeight: tabContentMaxHeight, minHeight: '100%' }}
            >
              <UsersList users={activeUsers} Search={Search} />
            </TabContent>
          )}
          {activeTab === 'Offline' && (
            <TabContent
              value="Offline"
              className="overflow-hidden hover:overflow-y-scroll hover:pr-2"
              style={{ maxHeight: tabContentMaxHeight, minHeight: '100%' }}
            >
              <UsersList users={inactiveUsers} Search={Search} />
            </TabContent>
          )}
        </div>
      </Tabs>
    </div>
  );
}

export default UsersStatusCard;
