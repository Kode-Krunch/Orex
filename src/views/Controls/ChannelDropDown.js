import { useRef, useEffect, useMemo, useState } from 'react'

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Table from 'components/ui/Table'
import Checkbox from 'components/ui/Checkbox'
import { apiGetChannelmasterdrop } from 'services/MasterService'
import { Avatar, Badge, Dropdown, ScrollBar, Select, Tag } from 'components/ui'
import { Affix } from 'components/shared'
import cloneDeep from 'lodash/cloneDeep'
import { HiCheck } from 'react-icons/hi'
import { components } from 'react-select'
import './Common.css'
import { useSelector } from 'react-redux'
const { Control } = components

const { Tr, Th, Td, THead, TBody } = Table

function IndeterminateCheckbox({ indeterminate, onChange, ...rest }) {
    const ref = useRef(null)

    useEffect(() => {
        if (typeof indeterminate === 'boolean' && ref.current) {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, indeterminate])

    return <Checkbox ref={ref} onChange={(_, e) => onChange(e)} {...rest} />
}

function ChannelDropDown({ selectedChannel, onChannelSelect }) {
    const [ticketData, setTicketData] = useState({ labels: [] })
    const LoginId = useSelector((state) => state.auth.session.LoginId)
    const [rowSelection, setRowSelection] = useState({})
    const [data, setdata10] = useState({})
    const [ChannelListOption, setChannelList] = useState([
        {
            value: 'us',
            label: 'United State',
            imgPath: '/img/countries/us.png',
        },
        { value: 'cn', label: 'China', imgPath: '/img/countries/cn.png' },
    ])

    const colorClasses = [
        'bg-rose-500',
        'bg-indigo-500',
        'bg-blue-500',
        'bg-amber-400',
    ]

    useEffect(() => {
        ; (async (values) => {
            const resp = await apiGetChannelmasterdrop(LoginId)

            setdata10(resp.data)
            console.log(resp.data)
            const channelsBYID = resp.data.map((channel, index) => ({
                ChannelName: channel.ChannelName,
                ChannelCode: channel.ChannelCode,
                ColorClass: colorClasses[index % colorClasses.length],
                LocationCode: channel.LocationCode,
                LocationName: channel.LocationName,
                value: channel.ChannelCode,
                label: channel.ChannelName,
                imgPath: '/img/countries/us.png',
            }))

            // const ChannelListOption = resp.data
            //     .filter((channel) => channel.IsActive === 1)
            //     .map((channel) => ({
            //         value: channel.ChannelCode,
            //         label: channel.ChannelName,
            //         imgPath: '/img/countries/us.png', // You need to provide the correct path to the image here
            //     }))
            //console.log(ChannelListOption)

            setChannelList(channelsBYID)

            //    const channels = resp.data
            //    .filter(channel => channel.IsActive === 1)
            //   .map(channel => channel.ChannelName);
            //    setChannelList(channels)

            // const channelListColors = {};

            // channels.forEach((channel, index) => {
            //   const colorClass = colorClasses[index % colorClasses.length]; // Rotate through color classes
            //   channelListColors[channel] = colorClass;
            // });

            // setchannelListColors(channelListColors)
        })()
    }, [])

    const columns = useMemo(() => {
        return [
            {
                id: 'select',
                header: ({ table }) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
            },
            {
                header: 'Channel Name',
                accessorKey: 'ChannelName',
            },
            {
                header: ' ',
                accessorKey: ' ',
            },
            {
                header: ' ',
                accessorKey: ' ',
            },
            {
                header: ' ',
                accessorKey: ' ',
            },
            {
                header: ' ',
                accessorKey: ' ',
            },
            {
                header: ' ',
                accessorKey: ' ',
            },
        ]
    }, [])

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    // const countryOptions = [
    //     { value: 'us', label: 'United State', imgPath: '/img/countries/us.png' },
    //     { value: 'cn', label: 'China', imgPath: '/img/countries/cn.png' },
    //     { value: 'jp', label: 'Japan', imgPath: '/img/countries/jp.png' },
    //     { value: 'fr', label: 'French', imgPath: '/img/countries/fr.png' },
    // ]

    const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
        return (
            <div
                className={`flex items-center justify-between p-2 ${isSelected
                        ? 'bg-gray-100 dark:bg-gray-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                {...innerProps}
            >
                <div className="flex items-center">
                    <Avatar shape="circle" size={20} src={data.imgPath} />
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </div>
                {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
            </div>
        )
    }

    const CustomControl = ({ children, ...props }) => {
        const selected = props.getValue()[0]
        return (
            <Control {...props}>
                {selected && (
                    <Avatar
                        className="ltr:ml-4 rtl:mr-4"
                        shape="circle"
                        size={18}
                        src={selected.imgPath}
                    />
                )}
                {children}
            </Control>
        )
    }
    return (
        <div>
            <Select
                options={ChannelListOption}
                components={{
                    Option: CustomSelectOption,
                    Control: CustomControl,
                }}
                onChange={(selectedOption) => {
                    onChannelSelect(selectedOption) // Call the callback with the selected option
                }}
            //defaultValue={ChannelListOption[0]}
            />
        </div>
    )
}
export default ChannelDropDown
