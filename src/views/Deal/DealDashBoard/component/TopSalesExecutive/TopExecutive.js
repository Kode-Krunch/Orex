import React from 'react'
import { Tabs } from 'components/ui'
import TabTable from 'views/Controls/Dashboard/TabTable'
import { BsBuildingsFill, BsPersonSquare } from 'react-icons/bs'
import Table from './Table';

const { TabNav, TabList, TabContent } = Tabs;

const TopExecutiveTabs = ({ topExec, topClients }) => {
    return (
        <div
            style={{
                borderRadius: '.5rem',
                padding: '10px',
            }}
            className="col-span-3 web-card dark:!bg-[#1f2639] !bg-[#fff] px-5 py-3"
        >
            <Tabs defaultValue="tab1">
                <TabList>
                    <TabNav value="tab1" icon={<BsBuildingsFill />}>
                        Top Sales Executive
                    </TabNav>
                    {/* <TabNav value="tab2" icon={<BsPersonSquare />}>
                        Top Client
                    </TabNav> */}
                </TabList>
                <div className="px-4">
                    <TabContent value="tab1">
                        <Table
                            data={topExec}
                            keyS="ExecutiveName"
                            name="Executive Name"
                        />
                    </TabContent>
                    {/* <TabContent value="tab2">
                        <TabTable
                            data={topClients}
                            keyS="ClientName"
                            name="Client Name"
                        />
                    </TabContent> */}
                </div>
            </Tabs>
        </div>
    )
}

export default TopExecutiveTabs