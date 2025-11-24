import { useEffect, useState } from 'react'

import {
    apiGetChannelmasterdrop,
    apiGetcontentlocchnmap,
} from 'services/MasterService'
import { Badge, Dropdown, Tag } from 'components/ui'
import { useSelector } from 'react-redux'

function MapChannelpop({ ticketData, setTicketData }) {

    const [channelList, setChannelList] = useState([])
    const [AllchannelList, setAllChannelList] = useState([])
    const LoginId = useSelector((state) => state.auth.session.LoginId)
    const { Content } = useSelector((state) => state.base.common)
    const colorClasses = [
        'bg-rose-500',
        'bg-indigo-500',
        'bg-blue-500',
        'bg-amber-400',
    ]

    useEffect(() => {
        myAsyncFunction()

    }, [])

    useEffect(() => {


        if (AllchannelList.length > 0 && ticketData.length > 0) {
            const updatedChannels = AllchannelList.filter(item => {
                // Check if the ChannelCode of the item is not present in any ticketData
                return !ticketData.some(dataItem => dataItem.Channel.ChannelCode === item.Channel.ChannelCode);
            });


            setChannelList(updatedChannels);
        }
    }, [ticketData, AllchannelList]);



    async function myAsyncFunction() {
        try {
            const resp = await apiGetcontentlocchnmap(Content.ContentCode)

            setTicketData(resp.data)

            const resp2 = await apiGetChannelmasterdrop(LoginId)
            const channelsBYID = resp2.data.map((channel, index) => ({
                Channel: {
                    ChannelCode: channel.ChannelCode,
                    ChannelName: channel.ChannelName,
                },
                locations: {
                    LocationCode: channel.LocationCode,
                    LocationName: channel.LocationName,
                },
                ColorClass: colorClasses[index % colorClasses.length],
            }))


            // const updatedChannels = resp.data.map(dataItem => {
            //     const updatedChannelsByID = channelsBYID.filter(item => item.Channel.ChannelCode !== dataItem.Channel.ChannelCode);
            //     return updatedChannelsByID;
            // });

            // console.log('updatedChannels', ...updatedChannels);

            // if (updatedChannels === undefined) {
            //     setChannelList(channelsBYID)
            // } else {
            //     setChannelList(...updatedChannels)
            // }
            setChannelList(channelsBYID)
            setAllChannelList(channelsBYID)


            // Code to execute after the second asynchronous operation
            //   console.log(channelsBYID);
        } catch (error) {
            // Handle errors that might occur during asynchronous operations
            console.error(error);
        }
    }

    // console.log(ticketData);
    const onRemoveChannel = (labelToRemove) => {
        // Use filter to create a new array that excludes the label to be removed
        const updatedLabels = ticketData.filter(
            (label) => label.Channel.ChannelCode !== labelToRemove
        )

        // Update the state with the new labels array
        setTicketData(updatedLabels)
    }

    const onAddLabelClick = (label) => {
        console.log(label)
        console.log('ticketData', ticketData)
        setTicketData([...ticketData, label])
    }

    return (
        <div className="py-4 px-6">
            <div className="mt-4">
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
                                    prefixClass={colorClasses[index]}
                                    onClose={() =>
                                        onRemoveChannel(
                                            label.Channel.ChannelCode
                                        )
                                    }
                                >
                                    {label.Channel.ChannelName}
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
                                    <Badge innerClass={label.ColorClass} />
                                    <span className="ml-2 rtl:mr-2">
                                        {label.Channel.ChannelName}
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
export default MapChannelpop
