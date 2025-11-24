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
import { EPISODE_COLUMNS, EPISODES_TABLE_TOOLBAR_OPTIONS } from './constants';
import EditSegDialog from './EditSegDialog';
import SegContentInfoDialog from './SegContentInfoDialog';

function UpdateSynopsis() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [showLoader, setShowLoader] = useState(false);
  const [contentOptions, setContentOptions] = useState([]);
  const [selContent, setSelContent] = useState(null);
  const [season, setSeason] = useState('');
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
              <Tooltip title="View Synopsis">
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
              <Tooltip title="Update Synopsis">
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
  const handleSearch = async () => {
    let episodes = [];
    const errorMsg = 'Something went wrong while fetching content episodes';
    try {
      setShowLoader(true);
      episodes = await getJsonArrayfromApi(
        apiGetContentsegmaster,
        {
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
          ContentCode: selContent.value,
          SeasonNo: Number(season),
        },
        'No episodes found for selected content and season',
        errorMsg,
        errorMsg,
      );
    } catch (error) {
      console.error(error);
      openNotification('danger', errorMsg);
    } finally {
      setEpisodes(episodes);
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
                Season <span className="text-red-500">*</span>
              </p>
              <Input
                size="sm"
                placeholder="Season No"
                type="number"
                value={season}
                onChange={(event) => setSeason(Number(event.target.value))}
              />
            </div>
            <Button
              icon={<IoMdSearch />}
              size="sm"
              variant="solid"
              className="w-max"
              onClick={handleSearch}
            >
              Search
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
          handleSearch={handleSearch}
        />
      )}
      <SegContentInfoDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} contentInfo={contentInfo} />
      <Loader showLoader={showLoader} />
    </>
  );
}

export default UpdateSynopsis;
