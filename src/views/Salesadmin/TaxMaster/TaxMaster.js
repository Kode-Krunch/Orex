import { useState, useEffect, useMemo, useRef } from 'react'
import { Badge, Drawer, Input, Alert } from 'components/ui'
import { apiGetTaxMaster, apiGetYearMaster } from 'services/SalesAdminService'
import { Button, Card } from 'components/ui'
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi'
import TaxMasterEdit from './TaxMasterEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTable from 'views/Controls/DisplayTable'
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
                    Add TAX
                </Button>
            </span>
        </span>
    )
}

const TaxMaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([])
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')

    const statusColor = {
        1: 'bg-emerald-500',
        0: 'bg-red-500',
    }
    const formikRef = useRef()
    const formSubmit = () => {
        formikRef.current?.submitForm()
    }
    const columns = useMemo(
        () => [

            {
                header: 'Year',
                accessorKey: 'YeartaxDetail[0].Description',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.IsActive]} />
                            <span className="ml-2 rtl:mr-2 ">
                                {row.YeartaxDetail[0]?.Description}
                            </span>
                        </div>
                    )
                },

            },

            {
                header: 'TAX Name',
                accessorKey: 'TaxName',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">

                            <span className="ml-2 rtl:mr-2 ">
                                {row.TaxName}
                            </span>
                        </div>
                    )
                },
            },


        ],
        []
    )
    useEffect(() => {
        ; (async (values) => {
            const resp = await apiGetTaxMaster(values)
            // //console.log(resp.data);
            setdata(resp.data)
        })()
    }, [])
    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e, values) => {
        setIsOpen(false)
        const resp = await apiGetTaxMaster(values)
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
                header={<HeaderExtra Component={'Tax Master'} />}
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
                    ExportName={'TaxMaster'}
                />
            </Card>

            <Drawer
                title={
                    editData.Description ? (
                        <p className="text-xl font-medium   flex ">
                            <center>
                                <Button
                                    size="xs"
                                    variant="twoTone"
                                    icon={<HiOutlinePencil />}
                                ></Button>
                            </center>
                            &nbsp;&nbsp; Tax Master
                        </p>
                    ) : (
                        <p className="text-xl font-medium   flex ">
                            <center>
                                <Button
                                    size="xs"
                                    variant="twoTone"
                                    icon={<HiPlusCircle />}
                                ></Button>
                            </center>
                            &nbsp;&nbsp;Tax Master
                        </p>
                    )
                }
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={
                    window.screen.width > 400
                        ? window.screen.width / 3
                        : window.screen.width / 1.5
                }
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
            >
                <TaxMasterEdit
                    ref={formikRef}
                    onDrawerClose={onDrawerClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                />
            </Drawer>
        </>
    )
}

export default TaxMaster
