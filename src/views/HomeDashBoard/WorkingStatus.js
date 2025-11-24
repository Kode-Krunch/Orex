import React, { useMemo, useCallback } from 'react'
import { Card, Button, Table, Badge } from 'components/ui'
import useThemeClass from 'utils/hooks/useThemeClass'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'
const { Tr, Td, TBody, THead, Th } = Table

const orderStatusColor = {
    0: {
        label: 'Online',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Offline',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },

}

const OrderColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}

        >
            {row.id}
        </span>
    )
}
const latestOrderData = [
    {
        id: '1',
        date: 1660132800,
        customer: 'Ron Vargas',
        status: 0,
        paymentMehod: 'visa',
        paymentIdendifier: '•••• 6165',

    },
    {
        id: '2',
        date: 1659132800,
        customer: 'Carolyn Hanso',
        status: 1,
        paymentMehod: 'visa',
        paymentIdendifier: '•••• 7128',

    },
    {
        id: '3',
        date: 1658132800,
        customer: 'Gabriella May',
        status: 0,
        paymentMehod: 'paypal',
        paymentIdendifier: '••••@gmail.com',

    },
    {
        id: '4',
        date: 1657332800,
        customer: 'Tara Fletcher',
        status: 0,
        paymentMehod: 'master',
        paymentIdendifier: '•••• 0921',

    },
    {
        id: '5',
        date: 1654132800,
        customer: 'Eileen Horton',
        status: 1,
        paymentMehod: 'paypal',
        paymentIdendifier: '••••@gmail.com',

    },
    {
        id: '6',
        date: 1647632800,
        customer: 'Lloyd Obrien',
        status: 0,
        paymentMehod: 'visa',
        paymentIdendifier: '•••• 0443',

    },
    {
        id: '7',
        date: 1646832800,
        customer: 'Tara Fletcher',
        status: 1,
        paymentMehod: 'paypal',
        paymentIdendifier: '••••@gmail.com',

    },
]
const WorkingStatus = ({ data = latestOrderData, className }) => {
    const columns = useMemo(
        () => [
            {
                header: 'Id',
                accessorKey: 'id',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },
            {
                header: 'User',
                accessorKey: 'customer',
            },

            // {
            //     header: 'Date',
            //     accessorKey: 'date',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <span>{dayjs.unix(row.date).format('DD/MM/YYYY')}</span>
            //         )
            //     },
            // },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={orderStatusColor[status].dotClass}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
                            >
                                {orderStatusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },


        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-6">
                <h4>Working Status</h4>

            </div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    )
}

export default WorkingStatus
