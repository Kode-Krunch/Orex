import { useState, useEffect, useMemo, useRef } from 'react'
import { Badge, Drawer, Input, Alert } from 'components/ui'
import { Button, Card } from 'components/ui'
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi'
// import EntityEdit from './EntityEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTable from 'views/Controls/DisplayTable'
import HeaderExtra from 'views/Controls/HeaderExtra'
import DrawerFooter from 'views/Controls/DrawerFooter'
import { statusColor } from 'utils/statusColor'
import { apiGetweekdaysweekendsmaster } from 'services/ProgrammingService'
import Weekdays_WeekendsEdit from './Weekdays_WeekendsEdit'
import InputwithVoice from 'components/ui/Input/InputwithVoice'

const headerExtraContent = (
    openDrawer,
    globalFilter,
    setGlobalFilter
) => {
    return (
        <span className="flex items-center">
            <span className="mr-1  font-semibold">
                <InputwithVoice
                    value={globalFilter ?? ''}
                    className=" solid"
                    placeholder="Search all columns..."
                    size="sm"
                    onChange={(e) => {
                        if (/^[0-9a-zA-Z\s,-]*$/.test(e.target.value)) {
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
                    Add Weekdays
                </Button>
            </span>
        </span>
    )
}

const Weekdays_Weekends = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')
    const formikRef = useRef()
    const formSubmit = () => {
        formikRef.current?.submitForm()
    }
    //console.log(globalFilter)

    const columns = useMemo(
        () => [
            {
                header: 'name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    // console.log(row)
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.IsActive]} />
                            <span className="ml-2 rtl:mr-2 ">
                                {row.name}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'days',
                accessorKey: 'days',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <span className="ml-2 rtl:mr-2 ">
                                {row.days}
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
            const resp = await apiGetweekdaysweekendsmaster(values)
            const days = {
                0: 'Sunday',
                1: 'Monday',
                2: 'Tuesday',
                3: 'Wednesday',
                4: 'Thursday',
                5: 'Friday',
                6: 'Saturday',
            }

            const result = resp.data.map((item) => ({
                name: item.WeekdaysName,
                IsActive: item.IsActive,
                days: item.details.map((detail) => days[detail.Day]).join(', '),
                daysCode: item.details.map((detail) => detail.Day),
                WeekdaysCode: item.WeekdaysCode,
            }))

            setdata(result)
        })()
    }, [])

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e, values) => {
        setIsOpen(false)
        const resp = await apiGetweekdaysweekendsmaster(values)
        seteditData([''])
        const days = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday',
        }

        const result = resp.data.map((item) => ({
            name: item.WeekdaysName,
            IsActive: item.IsActive,
            days: item.details.map((detail) => days[detail.Day]).join(', '),
            daysCode: item.details.map((detail) => detail.Day),
            WeekdaysCode: item.WeekdaysCode,
        }))

        setdata(result)
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
                header={<HeaderExtra Component={'Weekdays Weekends'} />}
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
                    ExportName={'WeekdaysWeekends'}
                />
            </Card>

            <Drawer
                title={
                    editData.EntityName ? (
                        <p className="text-xl font-medium text-black flex ">
                            <center>
                                <Button
                                    size="xs"
                                    variant="twoTone"
                                    icon={<HiOutlinePencil />}
                                ></Button>
                            </center>
                            Weekdays Weekends
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
                            Weekdays Weekends
                        </p>
                    )
                }
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={
                    window.screen.width > 300
                        ? window.screen.width / 4
                        : window.screen.width / 2
                }
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
            >
                <Weekdays_WeekendsEdit
                    ref={formikRef}
                    onDrawerClose={onDrawerClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                />
                {/* <EntityEdit
                    ref={formikRef}
                    onDrawerClose={onDrawerClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                /> */}
            </Drawer>
        </>
    )
}

export default Weekdays_Weekends
