import { useState, useEffect, useMemo, useRef } from 'react'
import { Badge, Drawer, Input, Alert } from 'components/ui'
import {
    apiGetStarCastmaster,
    apiGetStarCastTypemaster,
} from 'services/ProgrammingService'
import { Button, Card } from 'components/ui'
import {
    HiOutlinePencil,
    HiOutlinePlusCircle,
    HiPlusCircle,
} from 'react-icons/hi'
import StarCastEdit from './StarCastEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTable from 'views/Controls/DisplayTable'
import { apiGetCountryMaster } from 'services/MasterService'
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
                    Add StarCast
                </Button>
            </span>
        </span>
    )
}

const StarCastmaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])
    const [Country, setCountry] = useState([])
    const [StarCastType, setStarCastType] = useState([])
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
                header: 'StarCast Name',
                accessorKey: 'StarCastName',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.IsActive]} />
                            <span className="ml-2 rtl:mr-2 ">
                                {row.StarCastName}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'StarCastType',
                accessorKey: 'StarCastTypeMaster.StarCastTypeName',
                cell: (props) => {
                    const { StarCastTypeMaster } = props.row.original
                    console.log(StarCastType)
                    return (
                        <div className="flex items-center">
                            <span className="ml-2 rtl:mr-2 ">
                                {StarCastTypeMaster?.StarCastTypeName}
                            </span>
                        </div>
                    )
                },
            },

            {
                header: 'Gender',
                accessorKey: 'MaleFemale',
            },

            //{
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
            const resp = await apiGetStarCastmaster(values)
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
            ; (async (values) => {
                const StarCastType = await apiGetStarCastTypemaster(values)
                const formattedOptions = StarCastType.data.map((option) => ({
                    value: option.StarCastTypeCode,
                    label: option.StarCastTypeName,
                }))
                setStarCastType(formattedOptions)
            })()
    }, [])
    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e, values) => {
        setIsOpen(false)
        const resp = await apiGetStarCastmaster(values)
        setdata(resp.data)
        seteditData([''])
    }

    // //console.log(log)
    return (
        <>
            {message && (
                <Alert className="mb-4" type={log} showIcon>
                    {message}
                </Alert>
            )}
            {/* {log && (
                <Alert className="mb-4" type="success" showIcon>
                    {log}
                </Alert>
            )} */}
            <Card
                header={<HeaderExtra Component={'StarCast Master'} />}
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
                    //setSorting={setSorting}
                    setGlobalFilter={setGlobalFilter}
                    seteditData={seteditData}
                    openDrawer={openDrawer}
                    ExportName={'StarCastMaster'}
                />
            </Card>

            <Drawer
                title={
                    editData.StarCastName ? (
                        <p className="text-xl font-medium   flex ">
                            <center>
                                <Button
                                    size="xs"
                                    variant="twoTone"
                                    icon={<HiOutlinePencil />}
                                ></Button>
                            </center>
                            StarCast Master
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
                            StarCast Master
                        </p>
                    )
                }
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={600}
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
            >
                <StarCastEdit
                    ref={formikRef}
                    onDrawerClose={onDrawerClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                    Country={Country}
                    StarCastType={StarCastType}
                />
            </Drawer>
        </>
    )
}

export default StarCastmaster
