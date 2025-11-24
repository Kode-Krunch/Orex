import { Button, Card, Input, Tooltip } from 'components/ui';
import React, { useEffect, useMemo, useState } from 'react';
import { HiOutlineEye, HiOutlinePencil } from 'react-icons/hi';
import { IoMdSearch } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { apiGetContentsegmaster } from 'services/ProgrammingService';
import {
    fetchSelectorOptionsFromSp,
    getJsonArrayfromApi,
    openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import HeaderExtra from 'views/Controls/HeaderExtra';
import Loader from 'views/Controls/Loader';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import SelectXs from 'views/Controls/SelectXs/SelectXs';
import { EPISODE_COLUMNS, EPISODES_TABLE_TOOLBAR_OPTIONS } from '../UpdateSynopsis/constants';
import EditSegDialog from '../UpdateSynopsis/EditSegDialog';
import SegContentInfoDialog from '../UpdateSynopsis/SegContentInfoDialog';
import { apiCallstoreprocedure } from 'services/CommonService';

function UpdateSeason() {
    /* REDUX */
    const channel = useSelector((state) => state.locale.selectedChannel);

    /* STATES */
    const [showLoader, setShowLoader] = useState(false);
    const [contentOptions, setContentOptions] = useState([]);
    const [selContent, setSelContent] = useState(null);
    const [season, setSeason] = useState('');
    const [newSeason, setNewSeason] = useState('');
    const [episodes, setEpisodes] = useState([]);
    const [managedColumns, setManagedColumns] = useState([]);
    const [externalGlobalFilter, setExternalGlobalFilter] = useState('');
    const [isEditSegDialogOpen, setIsEditSegDialogOpen] = useState(false);
    const [selEpisode, setSelEpisode] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [contentInfo, setContentInfo] = useState({});


    /* HOOKS */
    const columns = useMemo(
        () => [

            {
                header: 'Action',
                accessorKey: 'Action',
                cell: (props) => {
                    return (
                        <div className="flex justify-center gap-2">
                            <Tooltip title="View Season">
                                <Button
                                    shape="circle"
                                    variant="plain"
                                    size="xs"
                                    icon={<HiOutlineEye />}
                                    onClick={() => {
                                        setIsDialogOpen(true);
                                        setContentInfo(props.row.original);
                                    }}
                                />
                            </Tooltip>
                            <Tooltip title="Update Season">
                                <Button
                                    shape="circle"
                                    variant="plain"
                                    size="xs"
                                    icon={<HiOutlinePencil />}
                                    onClick={() => {
                                        setIsEditSegDialogOpen(true);
                                        setSelEpisode(props.row.original);
                                    }}
                                />
                            </Tooltip>
                        </div>

                    );
                },
                options: {
                    cell: {
                        header: {
                            sort: false,
                            filter: false,
                            style: {
                                borderRight: false,
                                borderLeft: false,
                                width: '0%',
                            },
                        },
                        style: {
                            paddingBlock: '',
                        },
                    },
                },
            }, ...EPISODE_COLUMNS,
        ],
        [],
    );

    /* USE EFFECTS */
    useEffect(() => {
        (async () => {
            let options = [];
            try {
                setShowLoader(true);
                options = await fetchSelectorOptionsFromSp(
                    'USP_PG_ContentSegmentation_Get',
                    {
                        par_LocationCode: channel.LocationCode,
                        par_ChannelCode: channel.ChannelCode,
                    },
                    'ContentName',
                    'ContentCode',
                    'No contents found for selected channel',
                    'Something went wrong while fetching contents',
                    'Something went wrong while fetching contents',
                );
            } catch (error) {
                console.error(error);
                openNotification(
                    'danger',
                    'Something went wrong while fetching contents',
                );
            } finally {
                setContentOptions(options);
                setShowLoader(false);
            }
        })();
    }, []);

    /* EVENT HANDLERS */
    const handleUpdate = async () => {
        const successMsg = 'Content season updated successfully';
        const errorMsg = 'Cannot modify season because content season already useded in FPC';
        try {
            setShowLoader(true);
            console.log(channel.LocationCode);
            console.log(channel.ChannelCode);
            console.log(selContent.value);
            console.log(Number(season));
            console.log(Number(newSeason));

            const resp = await apiCallstoreprocedure(
                'USP_UpdateContentSeason',
                {
                    LocationCode: channel.LocationCode,
                    ChannelCode: channel.ChannelCode,
                    ContentCode: selContent.value,
                    SeasonNo: Number(season),
                    NesSeasonNo: Number(newSeason),
                }
            )
            console.log(resp);
            // Check if resp is an array and has length 1
            if (resp.data[0].Result === 1) {
                openNotification('success', successMsg);
            }
            else if (resp.data[0].Result === 2) {
                openNotification('warning', 'Content Old Season Is Not Matched.');
            }
            else {
                openNotification('warning', errorMsg);
            }
        }
        catch (error) {
            console.error(error);
            openNotification('warning', errorMsg);
        }
        finally {
            setShowLoader(false);
        }


    };



    return (
        <>
            <Card
                header={<HeaderExtra />}
                headerExtra={<></>}
                className="flex flex-col min-h-[87vh]"
                bodyClass="grow flex flex-col pt-3"
            >
                <div className="pb-4 border-b border-b-gray-700 mb-0 flex justify-between items-end">
                    <div className="grid grid-cols-4 gap-3 items-end">
                        <div className="flex flex-col gap-1 col-span-2">
                            <p for="client" className="text-white">
                                Content <span className="text-red-500">*</span>
                            </p>
                            <SelectXs
                                placeholder="Select"
                                options={contentOptions}
                                value={selContent}
                                onChange={setSelContent}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p for="client" className="text-white">
                                Old Season <span className="text-red-500">*</span>
                            </p>
                            <Input
                                size="sm"
                                placeholder="Season No"
                                type="number"
                                value={season}
                                onChange={(event) => setSeason(Number(event.target.value))}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p for="client" className="text-white">
                                New Season <span className="text-red-500">*</span>
                            </p>
                            <Input
                                size="sm"
                                placeholder="Season No"
                                type="number"
                                value={newSeason}
                                onChange={(event) => setNewSeason(Number(event.target.value))}
                            />
                        </div>
                        <Button
                            icon={<IoMdSearch />}
                            size="sm"
                            variant="solid"
                            className="w-max"
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </div>
                    {episodes.length > 0 && (
                        <Input
                            size="sm"
                            placeholder="Search all columns"
                            className="w-[300px]"
                            value={externalGlobalFilter}
                            onChange={(event) => setExternalGlobalFilter(event.target.value)}
                        />
                    )}
                </div>
                {episodes.length > 0 ? (
                    <ReportsTable
                        tableData={episodes}
                        tableName={'UpdateSynopsisEpisodes'}
                        originalColumns={columns}
                        managedColumns={managedColumns}
                        setManagedColumns={setManagedColumns}
                        externalGlobalFilter={externalGlobalFilter}
                        exportFile={false}
                        toolbarOptions={EPISODES_TABLE_TOOLBAR_OPTIONS}
                    />
                ) : (
                    <div className="grow flex justify-center items-center">
                        No episodes to show
                    </div>
                )}
            </Card>
            {isEditSegDialogOpen && selEpisode && (
                <EditSegDialog
                    isOpen={isEditSegDialogOpen}
                    setIsOpen={setIsEditSegDialogOpen}
                    episodeDetails={selEpisode}
                    setShowLoader={setShowLoader}
                    handleUpdate={handleUpdate}
                />
            )}
            <SegContentInfoDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} contentInfo={contentInfo} />
            <Loader showLoader={showLoader} />
        </>
    );
}

export default UpdateSeason;