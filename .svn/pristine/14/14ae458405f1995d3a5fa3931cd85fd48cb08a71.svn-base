import { useState, useEffect, useMemo } from 'react';
import { Badge, Alert, Tooltip, Dropdown } from 'components/ui';
import {
  apiGetSongmaster,
  apiGetSongmasterbyId,
} from 'services/SchedulingService';
import { Button, Card } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Link, useNavigate } from 'react-router-dom';
import { setContent } from 'store/base/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import StatisticCardwithfigure from 'components/common/StatisticCardwithfigure';
import {
  TbMusic,
  TbMusicCheck,
  TbMusicOff,
  TbMusicUp,
  TbTableDown,
  TbTableExport,
} from 'react-icons/tb';
import { COLOR_3, COLOR_4, COLOR_5, COLOR_8 } from 'constants/chart.constant';
import { IoIosMusicalNotes, IoMdDownload } from 'react-icons/io';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { MdOutlineStar } from 'react-icons/md';
import { handleExportToExcel } from 'views/Controls/DisplayTableForClient';
import Loader from 'views/Controls/Loader';
import UploadSongFileValidateAndSubmitDialog from './Components/UploadSongFileValidateAndSubmitDialog';


const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const headerExtraContent = (
  openDrawer,
  globalFilter,
  setGlobalFilter,
  dispatch,
  tableData,
  columns, setSongUploadDialog,
  setRatingUploadDialog
) => {
  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/Song_Rating_Template.xlsx`;
    link.download = 'Song Rating Template.xlsx';
    link.click();
  };

  const handleDownloadSongTemplate = () => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/Song_Import_Template.xlsx`;
    link.download = 'Song Import Template.xlsx';
    link.click();
  };

  return (
    <span className="flex items-center">
      <Dropdown
        renderTitle={
          <Button block variant="solid" size="sm" icon={<IoIosMusicalNotes />}>
            Song
          </Button>
        }
        trigger="hover"
        className="mr-1"
      >
        <Dropdown.Item
          onSelect={handleDownloadSongTemplate}
          className="border-b border-b-gray-600 rounded-b-none"
        >
          <IoMdDownload /> Song Template
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => setSongUploadDialog(true)}>
          <TbTableDown /> Import Song
        </Dropdown.Item>
      </Dropdown>
      <Dropdown
        renderTitle={
          <Button block variant="solid" size="sm" icon={<MdOutlineStar />}>
            Rating
          </Button>
        }
        trigger="hover"
        className="mr-1"
      >
        <Dropdown.Item
          onSelect={handleDownloadTemplate}
          className="border-b border-b-gray-600 rounded-b-none"
        >
          <IoMdDownload /> Rating Template
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => setRatingUploadDialog(true)}>
          <TbTableDown /> Import Rating
        </Dropdown.Item>
      </Dropdown>
      <Dropdown
        renderTitle={
          <Button block variant="solid" size="sm" icon={<TbTableExport />}>
            Export
          </Button>
        }
        trigger="hover"
        className="mr-1"
      >
        <Dropdown.Item
          onSelect={() => handleExportToExcel(columns, tableData, 'All Songs')}
          className="border-b border-b-gray-600 rounded-b-none"
        >
          <IoMdDownload /> All Songs
        </Dropdown.Item>

        <Dropdown.Item
          onSelect={() =>
            handleExportToExcel(
              columns,
              tableData.filter((item) => item.IsActive == 1),
              'Active Songs',
            )
          }
          className="border-b border-b-gray-600 rounded-b-none"
        >
          <Badge innerClass="bg-emerald-500">
            <IoMdDownload />
          </Badge>{' '}
          Active Songs
        </Dropdown.Item>
        <Dropdown.Item
          onSelect={() =>
            handleExportToExcel(
              columns,
              tableData.filter((item) => item.IsActive == 0),
              'Inactive Songs',
            )
          }
        >
          <Badge innerClass="bg-red-500">
            <IoMdDownload />
          </Badge>{' '}
          Inactive Songs
        </Dropdown.Item>
      </Dropdown>
      <span className="mr-1 font-semibold">
        <Link to={'/SongMasterEdit'}>
          <Button
            block
            variant="solid"
            size="sm"
            icon={<HiPlusCircle />}
            onClick={() => dispatch(setContent(''))}
          >
            Add Song
          </Button>
        </Link>
      </span>
    </span>
  );
};
const SongMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Channel = useSelector((state) => state.locale.selectedChannel);

  const [globalFilter, setGlobalFilter] = useState('');
  const [ManagedColumnSongMaster, setManagedColumnSongMaster] = useState([]);
  const [data, setdata] = useState(['']);
  const [tableDataFilter, setTableDataFilter] = useState(['']);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const { themeColor, primaryColorLevel } = useSelector((state) => state.theme);
  const [showLoader, setShowLoader] = useState(false);
  const [songuploadDialog, setSongUploadDialog] = useState(false);
  const [ratinguploadDialog, setRatingUploadDialog] = useState(false);
  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };

  const columns = useMemo(
    () => [
      {
        header: 'Song Caption',
        accessorKey: 'SongCaption',
        cell: (props) => {
          const row = props.row.original;
          console.log(row);
          return (
            <div className="flex items-center">
              <Badge className={statusColor[row.IsActive]} />
              <span className="ml-2 rtl:mr-2 ">{row.SongCaption}</span>
            </div>
          );
        },
        options: {
          cell: {
            style: {
              paddingBlock: '',
            },
          },
        },
      },

      {
        header: 'Duration',
        accessorKey: 'SongDuration',
        options: {
          cell: {
            style: {
              paddingBlock: '',
            },
          },
        },
      },
      {
        header: 'Release Year',
        accessorKey: 'YrRelease',
        options: {
          cell: {
            style: {
              paddingBlock: '',
            },
          },
        },
      },
      {
        header: 'Rating',
        accessorKey: 'Rating',
        cell: (props) => {
          const row = props.row.original;
          console.log(row);
          return (
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <span
                  key={index}
                  className={`star ${row.Rating >= star ? 'filled' : ''} ${row.Rating === star - 0.5 ? 'half-filled' : ''
                    }`}
                >
                  ★
                </span>
              ))}
            </div>
          );
        },
        options: {
          cell: {
            style: {
              paddingBlock: '',
            },
          },
        },
      },
      {
        header: 'Action',
        accessorKey: 'Action',
        cell: (props) => {
          const row = props.row.original;
          console.log(row);
          return (
            <div className="flex items-center">
              <Tooltip title="Song Master Edit">
                <span
                  className={`cursor-pointer pl-3 text-base hover:text-${themeColor}-${primaryColorLevel}`}
                  onClick={async () => {
                    const Songmaster = await apiGetSongmasterbyId(row.SongCode);
                    dispatch(setContent(Songmaster.data));
                    navigate('/SongMasterEdit');
                  }}
                >
                  <HiOutlinePencil />
                </span>
              </Tooltip>
            </div>
          );
        },
        options: {
          cell: {
            style: {
              paddingBlock: '',
            },
          },
        },
      },
    ],
    [],
  );

  const GetSongs = () => {
    (async (values) => {
      let Parameters = {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,
      };
      const resp = await apiGetSongmaster(Parameters);
      if (resp.data) {
        const convertIntegersToStrings = () => {
          return resp.data.map((item) => {
            const newItem = { ...item };
            Object.keys(newItem).forEach((key) => {
              if (typeof newItem[key] === 'number') {
                newItem[key] = newItem[key].toString();
              }
            });
            return newItem;
          });
        };

        setdata(convertIntegersToStrings);
        setTableDataFilter(convertIntegersToStrings);
      } else {
        setdata([]);
        setTableDataFilter([]);
      }
    })();
  };

  useEffect(() => {
    GetSongs();
  }, [Channel]);

  const openDrawer = () => { };

  const FilterTableData_On_Card = (CardName) => {
    switch (CardName) {
      case 'Total Songs':
        setTableDataFilter(data);
        break;
      case 'Active Songs':
        setTableDataFilter(data.filter((item) => item.IsActive == 1));
        break;
      case 'InActive Songs':
        setTableDataFilter(data.filter((item) => item.IsActive == 0));
        break;
      case 'Added This Month':
        setTableDataFilter(
          data.filter((Song) => {
            const addedOnDate = new Date(Song.AddedOn);
            return (
              addedOnDate.getFullYear() === currentYear &&
              addedOnDate.getMonth() === currentMonth
            );
          }),
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      <Card
        header={
          <HeaderExtra ModuleText={'Scheduling'} Component={'Song Master'} />
        }
        headerExtra={headerExtraContent(
          openDrawer,
          globalFilter,
          setGlobalFilter,
          dispatch,
          data,
          columns,
          setSongUploadDialog,
          setRatingUploadDialog
        )}
        className="h-[87vh] overflow-auto"
      >
        <div
          className={`grid grid-cols-1 gap-4 mb-4 mt-2 lg:grid-cols-4 xl:grid-cols-4`}
        >
          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order3"
            Icon={<TbMusic style={{ fontSize: 35, color: COLOR_3 }} />}
            CardName={'Total Songs'}
            CardNote="Song are short advertisements aired during breaks in programming."
            CardFigure={data.length}
            COLOR="bg-emerald-500"
            Function={FilterTableData_On_Card}
            IsFunction={true}
            cursor={true}
          ></StatisticCardwithfigure>

          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order2"
            Icon={<TbMusicCheck style={{ fontSize: 35, color: COLOR_4 }} />}
            CardName={'Active Songs'}
            CardNote=" refers to an advertisement currently scheduled for broadcast."
            CardFigure={data.filter((item) => item.IsActive == 1).length}
            COLOR="bg-amber-500"
            Function={FilterTableData_On_Card}
            IsFunction={true}
            cursor={true}
          ></StatisticCardwithfigure>

          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order1"
            Icon={<TbMusicOff style={{ fontSize: 35, color: COLOR_5 }} />}
            CardName={'InActive Songs'}
            CardNote=" refers to an advertisement that is not currently running."
            CardFigure={data.filter((item) => item.IsActive == 0).length}
            COLOR="bg-red-500"
            Function={FilterTableData_On_Card}
            IsFunction={true}
            cursor={true}
          ></StatisticCardwithfigure>

          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order8"
            Icon={<TbMusicUp style={{ fontSize: 35, color: COLOR_8 }} />}
            CardName="Added This Month"
            CardNote="refers to advertisements that were added for broadcast in the current month."
            CardFigure={
              data.filter((Song) => {
                const addedOnDate = new Date(Song.AddedOn);
                return (
                  addedOnDate.getFullYear() === currentYear &&
                  addedOnDate.getMonth() === currentMonth
                );
              }).length
            }
            COLOR="bg-yellow-500"
            Function={FilterTableData_On_Card}
            IsFunction={true}
            cursor={true}
          ></StatisticCardwithfigure>
        </div>
        <div>
          <ReportsTable
            tableData={tableDataFilter}
            originalColumns={columns}
            managedColumns={ManagedColumnSongMaster}
            setManagedColumns={setManagedColumnSongMaster}
            exportFileName="Song Master"
            columnsToFormatInINR={[]}
          />
        </div>

        <UploadSongFileValidateAndSubmitDialog
          setShowLoader={setShowLoader}
          isDialogOpen={songuploadDialog}
          setIsDialogOpen={setSongUploadDialog}
          submissionSP={'USP_PG_SongsDataInsert'}
          valdationSP={'USP_PG_Songs_Validation'}
          successMessage={'Song Created successfully'}
          fileUploadapi={'songmaster/upload_songs'}
          name={'Song'}
          tableName={'Song'} />

        <UploadSongFileValidateAndSubmitDialog
          setShowLoader={setShowLoader}
          isDialogOpen={ratinguploadDialog}
          setIsDialogOpen={setRatingUploadDialog}
          submissionSP={'USP_PG_SongsDataInsert'}
          valdationSP={'USP_PG_SongsRating_Validation'}
          successMessage={'Rating Created successfully'}
          fileUploadapi={'songmaster/uploadrating'}
          name={'Rating'}
          tableName={'Rating'} />
        <Loader showLoader={showLoader} />
      </Card >
    </>
  );
};

export default SongMaster;
