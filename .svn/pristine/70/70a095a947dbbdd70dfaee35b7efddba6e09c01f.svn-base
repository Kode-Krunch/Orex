import React from 'react'
import { Tabs } from 'components/ui'
import TabTable from 'views/Controls/Dashboard/TabTable'
import { BsBuildingsFill, BsPersonSquare } from 'react-icons/bs'

const { TabNav, TabList, TabContent } = Tabs;

const TopAgencyClientTabs = ({ topAgencies, topClients }) => {
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
                        Top Agency
                    </TabNav>
                    <TabNav value="tab2" icon={<BsPersonSquare />}>
                        Top Client
                    </TabNav>
                </TabList>
                <div className="px-4">
                    <TabContent value="tab1">
                        <TabTable
                            data={topAgencies}
                            keyS="AgencyName"
                            name="Agency Name"
                        />
                    </TabContent>
                    <TabContent value="tab2">
                        <TabTable
                            data={topClients}
                            keyS="ClientName"
                            name="Client Name"
                        />
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default TopAgencyClientTabs