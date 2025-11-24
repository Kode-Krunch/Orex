import { useEffect, useState } from 'react'

import { apiGetChannelmasterdrop } from 'services/MasterService'
import { Badge, Dropdown, Tag } from 'components/ui'
import { useSelector } from 'react-redux'

function MapChannel({ ticketData, setTicketData }) {
    console.log('ticketData', ticketData)
    const colorClasses = [
        'bg-rose-500',
        'bg-indigo-500',
        'bg-blue-500',
        'bg-amber-400',
    ]



    useEffect(() => {
        const updatedData = ticketData.map(item => ({
            ...item,
            value: `${ticketData[0]?.LocationCode}-${ticketData[0]?.ChannelCode}`,
            label: `${ticketData[0]?.LocationName}-${ticketData[0]?.ChannelName}`
        }));
        console.log('updatedData', updatedData)
        setTicketData(updatedData);
    }, [])



    const [channelList, setChannelList] = useState([])
    const [ChannelListBk, setChannelListBk] = useState([])
    const LoginId = useSelector((state) => state.auth.session.LoginId)


    useEffect(() => {
        ; (async (values) => {
            const resp = await apiGetChannelmasterdrop(LoginId)

            console.log('LocationCode*', resp)
            console.log('ticketDataLocationCode', ticketData)

            const channelsBYID = resp.data.filter((item) =>
                !ticketData.some((ticket) =>
                    (item.LocationCode + '-' + item.ChannelCode) === (ticket.LocationCode + '-' + ticket.ChannelCode)
                )
            ).map((channel, index) => ({
                ChannelName: channel.ChannelName,
                ChannelCode: channel.ChannelCode,
                ColorClass: colorClasses[index % colorClasses.length],
                LocationCode: channel.LocationCode,
                value: channel.ChannelCode + '-' + channel.LocationCode,
                label: channel.LocationName + '-' + channel.ChannelName,
            }))


            console.log('updatedData', channelsBYID)
            // setTicketData(updatedData);

            setChannelList(channelsBYID)
            setChannelListBk(channelsBYID)
        })()
    }, [ticketData])

    const onRemoveChannel = (labelToRemove) => {
        // Use filter to create a new array that excludes the label to be removed
        const updatedLabels = ticketData.filter(
            (label) => label.value !== labelToRemove
        )


        // Find the removed label from the original channelList
        const removedLabel = ChannelListBk.find(
            (label) => label.value === labelToRemove
        );


        // Update the state with the new labels array
        setTicketData(updatedLabels)
        setChannelList([...channelList, removedLabel]);
    }


    const onAddLabelClick = (label) => {
        const updatedChannelList = channelList.filter(
            (item) => item.value !== label.value
        );

        // Update the state with the new channelList and add the label to ticketData
        setChannelList(updatedChannelList);

        setTicketData([...ticketData, label])
    }

    return (
        <div className="py-4 ">
            <div>
                {/* <div className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    Channels:
                </div> */}
                <div>
                    {ticketData.length > 0
                        ? ticketData.map((label, index) => {
                            return (
                                <Tag
                                    key={index}
                                    className="mr-2 rtl:ml-2 mb-2"
                                    prefix
                                    prefixClass={label.ColorClass}
                                    onClose={() =>
                                        onRemoveChannel(label.value)
                                    }
                                >
                                    {label.label}
                                </Tag>
                            )
                        })
                        : null}
                    <Dropdown
                        renderTitle={
                            <Tag
                                showCloseButton={false}
                                className="border-dashed cursor-pointer mr-2 rtl:ml-2"
                            >
                                Map Channel
                            </Tag>
                        }
                        placement="bottom-end"
                    >
                        {channelList.map((label, index) => (
                            <Dropdown.Item
                                onSelect={() => onAddLabelClick(label)}
                                eventKey={index}
                                key={index}
                            >
                                <div className="flex items-center">
                                    <Badge innerClass={label?.ColorClass} />
                                    <span className="ml-2 rtl:mr-2">
                                        {label?.label}
                                    </span>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}
export default MapChannel
