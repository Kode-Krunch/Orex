import { useState, useEffect, useMemo, useRef } from 'react'
import { Badge, Drawer, Input, Alert } from 'components/ui'
import {
    apiGetPlacemaster,
    apiGetStateMaster,
    apiGetCountryMaster,
} from 'services/MasterService'
import { Button, Card } from 'components/ui'
import {
    HiOutlinePencil,
    HiOutlinePlus,
    HiOutlinePlusCircle,
    HiPlusCircle,
} from 'react-icons/hi'
import SupplierEdit from './SupplierEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTable from 'views/Controls/DisplayTable'
import { apiGetSuppliermaster } from 'services/ProgrammingService'
import HeaderExtra from 'views/Controls/HeaderExtra'
import DrawerFooter from 'views/Controls/DrawerFooter'
import InputwithVoice from 'components/ui/Input/InputwithVoice'

const headerExtraContent = (
    openDrawer,

    globalFilter,
    setGlobalFilter
) => {
    return (
        <span className="flex items-center">
            <span className="mr-1   font-semibold">
                <InputwithVoice
                    value={globalFilter ?? ''}
                    className=" solid"
                    placeholder="Search all columns..."
                    size="sm"
                    onChange={(e) => {
                        if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
                            setGlobalFilter(e.target.value)
                        }
                    }}
                />
            </span>
            <span className="mr-1 font-semibold">
                <Button
                    block
                    variant="solid"
                    size="sm"
                    icon={<HiPlusCircle />}
                    onClick={() => openDrawer()}
                >
                    Add Supplier
                </Button>
            </span>
        </span>
    )
}

const Suppliermaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])


    const [Country, setCountry] = useState([])
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')
    const formikRef = useRef()
    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    const statusColor = {
        1: 'bg-emerald-500',
        0: 'bg-red-500',
    }

    const columns = useMemo(
        () => [
            {
                header: 'SupplierName',
                accessorKey: 'SupplierName',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.IsActive]} />
                            <span className="ml-2 rtl:mr-2 ">
                                {row.SupplierName}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Phone',
                accessorKey: 'Phone',
            },
            {
                header: 'ContactPerson',
                accessorKey: 'ContactPerson',
            },
            {
                header: 'Country Name',
                accessorKey: 'Country',
                cell: (props) => {
                    const { Country } = props.row.original
                    return (
                        <div className="flex items-center">
                            <span className="ml-2 rtl:mr-2 ">
                                {Country?.CountryName}
                            </span>
                        </div>
                    )
                },
            },
            // {
            //     header: 'Status',
            //     id: 'action',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 <Badge className={statusColor[row.IsActive]} />
            //                 <span className="ml-2 rtl:mr-2 ">
            //                     {row.IsActive == 1 ? 'Active' : 'InActive'}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
        ],
        []
    )
    useEffect(() => {
        ; (async (values) => {
            const resp = await apiGetSuppliermaster(values)
            //console.log(resp.data)
            setdata(resp.data)
        })()

            ; (async (values) => {
                const Country = await apiGetCountryMaster(values)
                const formattedOptions = Country.data.map((option) => ({
                    value: option.CountryCode,
                    label: option.CountryName,
                }))
                setCountry(formattedOptions)
            })()


    }, [])

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e, values) => {
        const resp = await apiGetSuppliermaster(values)
        seteditData([''])
        setdata(resp.data)
        setIsOpen(false)
    }



    // //console.log(log)
    return (
        <>
            {message && (
                <Alert className="mb-4" type={log} showIcon>
                    {message}
                </Alert>
            )}
            <Card
                header={<HeaderExtra Component={'Supplier Master'} />}
                headerExtra={headerExtraContent(
                    openDrawer,

                    globalFilter,
                    setGlobalFilter
                )}
                className="flex flex-col h-[87vh]"
                bodyClass="grow"
            >
                <DisplayTable
                    data={data}
                    columns={columns}
                    //sorting={sorting}
                    globalFilter={globalFilter}
                    // setSorting={setSorting}
                    setGlobalFilter={setGlobalFilter}
                    seteditData={seteditData}
                    openDrawer={openDrawer}
                    ExportName={'SupplierMaster'}
                />
            </Card>

            <Drawer
                title={
                    editData.SupplierName ? (
                        <p className="text-xl font-medium   flex ">
                            <center>
                                <Button
                                    size="xs"
                                    variant="twoTone"
                                    icon={<HiOutlinePencil />}
                                ></Button>
                            </center>
                            Supplier Master
                        </p>
                    ) : (
                        <p className="text-xl font-medium   flex ">
                            <center>
                                <Button
                                    size="xs"
                                    variant="twoTone"
                                    icon={<HiOutlinePlusCircle />}
                                ></Button>
                            </center>
                            Supplier Master
                        </p>
                    )
                }
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={
                    window.screen.width > 400
                        ? window.screen.width / 2
                        : window.screen.width / 1.5
                }
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
            >
                <SupplierEdit
                    ref={formikRef}
                    onDrawerClose={onDrawerClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                    Country={Country}
                />
            </Drawer>
        </>
    )
}

export default Suppliermaster
