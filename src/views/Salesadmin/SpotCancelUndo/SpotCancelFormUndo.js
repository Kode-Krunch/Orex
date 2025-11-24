import React, { useEffect, useState } from 'react'
import { Card, Checkbox, Table } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { apiGetspotcancellation } from 'services/CreditcontrolService'
import { sumCommercialDuration } from 'views/Scheduling/general'
import DisplayTablewithFilter from 'views/Controls/DisplayTablewithFilter'
import DisplayTablewithFilterCheckbox from 'views/Controls/DisplayTablewithFilterCheckbox'
const { Tr, Th, Td, THead, TBody } = Table

const SpotCancelForm = ({ setDeatils,
    Deatils,
    SpotCopy,
    setSpotCopy,
    setFormState, formState,
    setSelectedItems,
    selectedItems,
    setSelectedRowData,
    selectedRowData
}) => {
    const dispatch = useDispatch()





    useEffect(() => {

        console.log('Deatils', Deatils)
    }, [Deatils])


    const [sumofmilliseconds, setsumofmilliseconds] = useState(0);
    const handleCheckboxChange = (item) => {
        const selectedIndex = selectedItems.indexOf(item);
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            const newSelectedItems = [...selectedItems];
            newSelectedItems.splice(selectedIndex, 1);
            setSelectedItems(newSelectedItems);
        }
    };





    useEffect(() => {
        const totalCommercialDuration = sumCommercialDuration(selectedItems);
        console.log("Total Commercial Duration (milliseconds):", totalCommercialDuration);
        setsumofmilliseconds(totalCommercialDuration)
    }, [selectedItems])
    return (
        <>

            <Card>
                <DisplayTablewithFilterCheckbox
                    data={Deatils}
                    setData={setDeatils}
                    dataCopy={SpotCopy}
                    setDataCopy={setSpotCopy}
                    visiablecolumns={VisableColumns}
                    setSelectedRowData={setSelectedRowData}
                    selectedRowData={selectedRowData}
                ></DisplayTablewithFilterCheckbox>
            </Card>

        </>
    )
}

export default SpotCancelForm
export const VisableColumns = [
    {
        header: "Agency",
        name: "AgencyName",
        code: "AgencyName",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 2,
        isvisible: true
    },
    {
        header: "Brand",
        name: "BrandName",
        code: "BrandName",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 2,
        isvisible: true
    },
    {
        header: "Commercial",
        name: "CommercialCaption",
        code: "CommercialCaption",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 2,
        isvisible: true
    },
    {
        header: "Duration",
        name: "CommercialDuration",
        code: "CommercialDuration",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 2,
        isvisible: true
    },
    {
        header: "Content",
        name: "ContentName",
        code: "ContentName",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 2,
        isvisible: true
    },
    {
        header: "Schedule Date",
        name: "BookingScheduleDate",
        code: "BookingScheduleDate",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 2,
        isvisible: true
    },
    {
        header: "ScheduleTime",
        name: "ScheduleTime",
        code: "ScheduleTime",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 2,
        isvisible: true
    },
    {
        header: "SpotRate",
        name: "SpotRate",
        code: "SpotRate",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 2,
        isvisible: true
    },
    {
        header: "SpotAmount",
        name: "SpotAmount",
        code: "SpotAmount",
        width: "auto",
        ScreenType: "FinalLog",
        Sequence: 2,
        isvisible: true
    }
]; 