import { useState, useEffect, useMemo, useRef } from 'react'
import { Badge, Drawer, Input, Alert } from 'components/ui'
import {
    apiGetSubmodulemaster,
    apiGetModulemaster,
} from 'services/MasterService'
import { Button, Card } from 'components/ui'
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi'
import SubModuleEdit from './SubModuleEdit'
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
                    Add SubModule
                </Button>
            </span>
        </span>
    )
}

const SubModulemaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])
    const [module, setModule] = useState([])
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
                header: 'SubModule',
                accessorKey: 'SubModuleName',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.IsActive]} />
                            <span className="ml-2 rtl:mr-2 ">
                                {row.SubModuleName}
                            </span>
                        </div>
                    )
                },
            },
            // {
            //     header: 'Module Name',
            //     accessorKey: 'ModuleName',
            // },
            {
                header: 'Module',
                accessorKey: 'module.ModuleName',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <span className="ml-2 rtl:mr-2 ">
                                {row.module?.ModuleName}
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
            const resp = await apiGetSubmodulemaster(values)
            const convertIntegersToStrings = () => {
                return resp.data.map(item => {
                    const newItem = { ...item };
                    Object.keys(newItem).forEach(key => {
                        if (typeof newItem[key] === 'number') {
                            newItem[key] = newItem[key].toString();
                        }
                    });
                    return newItem;
                });
            };
            setdata(convertIntegersToStrings)
        })()
            ; (async (values) => {
                const Module = await apiGetModulemaster(values)
                const formattedOptions = Module.data.map((option) => ({
                    value: option.ModuleCode,
                    label: option.ModuleName,
                }))
                setModule(formattedOptions)
            })()
    }, [])
    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e, values) => {
        setIsOpen(false)
        const resp = await apiGetSubmodulemaster(values)
        const convertIntegersToStrings = () => {
            return resp.data.map(item => {
                const newItem = { ...item };
                Object.keys(newItem).forEach(key => {
                    if (typeof newItem[key] === 'number') {
                        newItem[key] = newItem[key].toString();
                    }
                });
                return newItem;
            });
        };
        setdata(convertIntegersToStrings)
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
                header={<HeaderExtra Component={'SubModule Master'} />}
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
                    ExportName={'SubModuleMaster'}
                />
            </Card>

            <Drawer
                title={
                    editData.SubModuleName ? (
                        <p className="text-xl font-medium   flex ">
                            <center>
                                <Button
                                    size="xs"
                                    variant="twoTone"
                                    icon={<HiOutlinePencil />}
                                ></Button>
                            </center>
                            &nbsp;&nbsp; SubModule Master
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
                            &nbsp;&nbsp;SubModule Master
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
                <SubModuleEdit
                    ref={formikRef}
                    onDrawerClose={onDrawerClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                    module={module}
                />
            </Drawer>
        </>
    )
}

export default SubModulemaster
