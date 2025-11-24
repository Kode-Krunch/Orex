import { useState, useEffect, useMemo } from 'react';
import { Badge, Alert, Tooltip, Upload, Avatar, Dialog } from 'components/ui';
import { apiGetPromomaster } from 'services/SchedulingService';
import { Button, Card } from 'components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Link } from 'react-router-dom';
import DisplayTableBigContent from 'views/Controls/DisplayTableBigContent';
import { setContent } from 'store/base/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ExportXls } from 'views/Controls/ExportXls';
import { PromoImportTemplate } from 'views/Controls/ImportTemplate';
import appConfig from 'configs/app.config';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import { IoIosCloudDownload, IoIosCloudUpload } from 'react-icons/io';
import {
  openNotification,
  parseDurationE,
} from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';
import UploadingLoaderDialog from 'views/Controls/UploadingLoaderDialog';
import FileSummaryDialog from './components/UploadPromo/FileSummaryDialog';
import {
  GREEN_700,
  RED_700,
} from 'views/Controls/Dashboard/constants/tw_colors';
import StatisticCardwithfigure from 'components/common/StatisticCardwithfigure';
import { TbSpeakerphone } from 'react-icons/tb';
import { VscVmActive } from 'react-icons/vsc';
import { MdAddCard, MdOutlineDesktopAccessDisabled } from 'react-icons/md';
import { COLOR_3, COLOR_4, COLOR_5, COLOR_8 } from 'constants/chart.constant';
import { FaPlayCircle } from 'react-icons/fa';
import VideoPlayer from 'views/Programming/ContentMaster/VideoPlayer';
import { CLIENT } from 'views/Controls/clientListEnum';

/* CONSTANTS */
const STATUS_COLOR = {
  1: 'bg-emerald-500',
  0: 'bg-red-500',
};
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const headerExtraContent = (
  globalFilter,
  setGlobalFilter,
  setSelectedFile,
  IsChannelwise,
) => {
  /* EVENT HANDLERS */
  const handleBeforeUpload = async (files, fileList) => {
    const allowedFileType = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    let selectedFile;
    if (files.length > 0) {
      selectedFile = files[0];
    } else {
      openNotification('danger', 'Please select a file!');
      return;
    }
    if (!allowedFileType.includes(selectedFile.type)) {
      openNotification('danger', 'Please upload an XLSX file!');
      return;
    }
    setSelectedFile(selectedFile);
  };

  return (
    <span className="flex items-center">
      <Tooltip
        title={
          IsChannelwise ? 'Download Content Template' : 'Download Promo Template'
        }
      >
        <Button
          variant="solid"
          size="sm"
          icon={<IoIosCloudDownload />}
          onClick={() =>
            ExportXls(
              [PromoImportTemplate],
              IsChannelwise
                ? 'Download_Story_Template'
                : 'Download_Promo_Template',
            )
          }
          className="mr-2"
        />
      </Tooltip>
      <Tooltip title={IsChannelwise ? 'Upload Content' : 'Upload Promo'}>
        <Upload
          beforeUpload={handleBeforeUpload}
          uploadLimit={1}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          showList={false}
        >
          <Button
            variant="twoTone"
            size="sm"
            icon={<IoIosCloudUpload />}
            className="mr-2"
          />
        </Upload>
      </Tooltip>
      <span className="mr-1 font-semibold">
        <InputwithVoice
          value={globalFilter ?? ''}
          className=" solid"
          placeholder="Search all columns..."
          size="sm"
          onChange={(e) => {
            if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
              setGlobalFilter(e.target.value);
            }
          }}
        />
      </span>
      <span className="mr-1 font-semibold">
        <Link to={IsChannelwise ? '/ContentMasterEdit' : '/PromoMasterEdit'}>
          <Button
            block
            variant="solid"
            size="sm"
            icon={<HiPlusCircle />}
          // onClick={() => dispatch(setContent(''))}
          >
            Add {IsChannelwise ? 'Content' : 'Promo'}
          </Button>
        </Link>
      </span>
    </span>
  );
};

const PromoMaster = () => {
  /* REDUX */
  const token = useSelector((state) => state.auth.session.token);
  const channel = useSelector((state) => state.locale.selectedChannel);
  const ChannelSetting = useSelector((state) => state.auth.session.ChannelSetting);
  const dispatch = useDispatch();
  const IsChannelwise = channel.label === CLIENT.USA_Forbes;

  /* STATES */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [data, setdata] = useState(['']);
  const [tableDataFilter, setTableDataFilter] = useState(['']);
  const [activePromos, setActivePromos] = useState('');
  const [isActivePromos, setISActivePromos] = useState('');
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileArray, setFileArray] = useState(null);
  const [isFileUploadingLoaderOpen, setIsFileUploadingLoaderOpen] =
    useState(false);
  const [isFileSummaryDialogOpen, setIsFileSummaryDialogOpen] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [videoShow, setvideoShow] = useState(false);
  const [dialogImage, setDialogImage] = useState({});
  /* HOOKS */
  const columns = useMemo(
    () => [
      {
        header: IsChannelwise ? 'Content Caption' : 'Promo Caption',
        accessorKey: 'PromoCaption',
        cell: (props) => {
          const row = props.row.original;
          const handleImageClick = () => {
            setDialogImage(row); // Set the image URL for the dialog
            setIsOpen(true); // Open the dialog
          };
          return (
            <Tooltip title={row.PromoCaption}>
              <div className="flex items-center" onClick={handleImageClick}>
                <Badge
                  style={{ minWidth: '9px', marginRight: 10 }}
                  className={STATUS_COLOR[row.IsActive]}
                />
                {row.Promo_Image ? (
                  <img
                    src={row.Promo_Image}
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                    className="hover:opacity-80 cursor-pointer"
                  // Handle click event to open dialog
                  />) :
                  <img
                    // src={'/images/blog/blog-footer-01.jpg'}
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                    className="hover:opacity-80 cursor-pointer"
                  // Handle click event to open dialog
                  />}

                <span
                  className="ml-2 rtl:mr-2 capitalize"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '350px',
                  }}
                >
                  {row.PromoCaption}
                </span>
              </div>
            </Tooltip>
          );
        },
      },
      {
        header: IsChannelwise ? 'Content Type' : 'Promo Type',
        accessorKey: 'PromoTypeName',
      },
      {
        header: 'Video ID',
        accessorKey: 'VideoID',
      },
      {
        header: IsChannelwise ? 'Content Duration' : 'Promo Duration',
        accessorKey: 'PromoDuration',
      },
    ],
    [],
  );
  /* USE EFFECTS */
  useEffect(() => {
    let interval;
    if (isFileUploadingLoaderOpen) {
      interval = setInterval(() => {
        if (uploadPercent >= 90) clearInterval(interval);
        else if (uploadPercent < 100) setUploadPercent((prev) => prev + 1);
      }, 1000);
    } else setUploadPercent(0);
    return () => clearInterval(interval);
  }, [isFileUploadingLoaderOpen, uploadPercent]);

  useEffect(() => {
    if (globalFilter.length > 4) {
      dispatch(setContent([]));
      getPromos(globalFilter);
    } else if (data.length == 1) {
      dispatch(setContent([]));
      getPromos('');
    }
  }, [globalFilter, channel]);

  useEffect(() => {
    (async () => {
      try {
        if (selectedFile) {
          setFileArray(await getFileResponse());
          setUploadPercent(100);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setSelectedFile(null);
          setIsFileUploadingLoaderOpen(false);
          setIsFileSummaryDialogOpen(true);
        }
      } catch (error) {
        console.error(error);
        setSelectedFile(null);
        openNotification('danger', 'Something went wrong while uploading file');
      }
    })();
  }, [selectedFile]);

  /* HELPER FUNCTIONS */
  const getPromos = async (search) => {
    try {
      setShowLoader(true);

      const resp = await apiGetPromomaster(
        {
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
        },
        search,
      );

      if (resp.status === 200) {
        const { Active, InActive, data } = resp.data;

        // Convert integers to strings for the promo data
        const convertIntegersToStrings = (items) =>
          items.map((item) => {
            const newItem = { ...item };
            Object.keys(newItem).forEach((key) => {
              if (typeof newItem[key] === 'number') {
                newItem[key] = newItem[key].toString();
              }
            });
            return newItem;
          });

        const convertedData = convertIntegersToStrings(data);

        setActivePromos(Active);
        setISActivePromos(InActive);
        setdata(convertedData);
        setTableDataFilter(convertedData);
      } else if (resp.status === 204) {
        // No data returned
        setdata([]);
        setTableDataFilter([]);
      }
    } catch (error) {
      console.error('Error fetching promos:', error);
    } finally {
      setShowLoader(false); // Hide loader regardless of success or error
    }
  };

  const getFileResponse = async () => {
    try {
      const bodyContent = new FormData();
      setIsFileUploadingLoaderOpen(true);
      const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = function (event) {
          resolve(event.target.result);
        };
        reader.onerror = function (error) {
          reject(error);
        };
      });
      const blob = new Blob([arrayBuffer], { type: selectedFile.type });
      bodyContent.append('file', blob, selectedFile.name);
      let response = await fetch(appConfig.apiPrefix + '/promomaster/upload/', {
        method: 'POST',
        body: bodyContent,
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });
      response = await response.json();
      if (Array.isArray(response)) {
        response = response.map((row) =>
          row.Statuscode === 0
            ? { ...row, bgColor: RED_700, fontColor: 'white' }
            : { ...row, bgColor: GREEN_700, fontColor: 'white' },
        );
        return response;
      } else {
        throw new Error('Something went wrong while uploading file');
      }
    } catch (error) {
      setIsFileUploadingLoaderOpen(false);
      throw error;
    }
  };
  const FilterTableData_On_Card = (CardName) => {
    // switch (CardName) {
    //   case IsChannelwise ? 'Total Content' : 'Total Promos':
    //     setTableDataFilter(data);
    //     break;
    //   case IsChannelwise ? 'Active Content' : 'Active Promos':
    //     setTableDataFilter(data.filter((item) => item.IsActive == 1));
    //     break;
    //   case IsChannelwise ? 'InActive Content' : 'InActive Promos':
    //     setTableDataFilter(data.filter((item) => item.IsActive == 0));
    //     break;
    //   case 'Added This Month':
    //     setTableDataFilter(data.filter((Promos) => {
    //       const addedOnDate = new Date(Promos.AddedOn);
    //       return (
    //         addedOnDate.getFullYear() === currentYear &&
    //         addedOnDate.getMonth() === currentMonth
    //       );
    //     }));
    //     break;
    //   default:
    //     break;
    // }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        alert("You pressed Arrow Up!");
        break;
      case "ArrowDown":
        alert("You pressed Arrow Down!");
        break;
      case "ArrowLeft":
        alert("You pressed Arrow Left!");
        break;
      case "ArrowRight":
        alert("You pressed Arrow Right!");
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Dialog
        isOpen={isOpen}
        width={1000}
        height={650}
        onClose={() => {
          setIsOpen(!isOpen);
          setvideoShow(false);
        }}
      >
        {isOpen && (
          <div className="w-full h-full  ">
            <div className="flex ">
              <div className="w-9/12 mr-5">
                <div className="flex items-center mt-5">
                  <Avatar size="sm" src="FAV.png" />
                  <h6
                    className="ml-2 "
                    style={{ letterSpacing: 6, color: 'rgb(127, 132, 138)' }}
                  >
                    {IsChannelwise ? 'Content' : 'Promo'}
                  </h6>
                </div>
                <h1 className="mt-5 font-outfit  font-medium ">
                  {dialogImage?.PromoCaption}
                </h1>
                <div className="flex mt-5 ml-1">
                  <h5 className="mr-1">
                    {Math.floor(
                      parseDurationE(Number(ChannelSetting[0].FramePerSec), dialogImage?.PromoDuration) / 60,
                    )}{' '}
                    Hr
                  </h5>
                  <h5>{parseDurationE(Number(ChannelSetting[0].FramePerSec), dialogImage?.PromoDuration) % 60} Min</h5>
                </div>
                <div className="flex  items-center mt-5">
                  <div
                    style={{
                      height: 30,
                      border: '1px solid #f6e6e61a',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '18px 25px',
                      background: '#00000029',
                      color: 'white',
                    }}
                  >
                    {dialogImage.PromoTypeName}
                  </div>
                  <p
                    className=" font-outfit  font-medium ml-2 mr-2"
                    style={{
                      height: 30,
                      border: '1px solid #f6e6e61a',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '18px 25px',
                      background: '#00000029',
                      color: 'white',
                    }}
                  >
                    {dialogImage.VideoID}
                  </p>
                  {/* <Tooltip title="Play Video">
                    <FaPlayCircle
                      className="text-4xl cursor-pointer hover:text-sky-700"
                      onClick={() => setvideoShow(true)}
                    />
                  </Tooltip> */}
                </div>
              </div>
              <div className="flex justify-center mt-10">
                {videoShow ? (
                  <VideoPlayer link={dialogImage?.MetaData} />
                ) : dialogImage.Promo_Image ? (
                  <img
                    src={dialogImage?.Promo_Image}
                    style={{
                      height: 300,
                      width: 300,
                    }} // Handle click event to open dialog
                  />
                ) : (
                  <img
                    src={'/img/3204121.jpg'}
                    style={{
                      height: 300,
                      width: 300,
                    }} // Handle click event to open dialog
                  />
                )}
              </div>
            </div>
            <h3 className="mt-7 font-outfit font-extrabold"> Synopsis</h3>
            <p className="mt-2 font-outfit  font-medium">
              {dialogImage?.LongSynopsis}
            </p>
          </div>
        )}
      </Dialog>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      <Card
        header={<HeaderExtra />}
        headerExtra={headerExtraContent(
          globalFilter,
          setGlobalFilter,
          setSelectedFile,
          IsChannelwise,
        )}
        className="flex flex-col h-[85vh]"
        bodyClass="grow"
        style={{ overflow: 'scroll' }}
      >
        <div
          className={`grid grid-cols-1 gap-4 mb-4 mt-2 lg:grid-cols-4 xl:grid-cols-4`}
        >
          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order3"
            Icon={<TbSpeakerphone style={{ fontSize: 35, color: COLOR_3 }} />}
            CardName={IsChannelwise ? 'Total Content' : 'Total Promos'}
            CardNote="Promos are short advertisements aired during breaks in programming."
            CardFigure={activePromos + isActivePromos}
            COLOR="bg-emerald-500"
            Function={FilterTableData_On_Card}
            IsFunction={true}
            cursor={false}
          ></StatisticCardwithfigure>

          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order2"
            Icon={<VscVmActive style={{ fontSize: 35, color: COLOR_4 }} />}
            CardName={IsChannelwise ? 'Active Content' : 'Active Promos'}
            CardNote=" refers to an advertisement currently scheduled for broadcast."
            CardFigure={activePromos}
            COLOR="bg-amber-500"
            Function={FilterTableData_On_Card}
            IsFunction={true}
            cursor={false}
          ></StatisticCardwithfigure>

          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order1"
            Icon={
              <MdOutlineDesktopAccessDisabled
                style={{ fontSize: 35, color: COLOR_5 }}
              />
            }
            CardName={IsChannelwise ? 'InActive Content' : 'InActive Promos'}
            CardNote=" refers to an advertisement that is not currently running."
            CardFigure={isActivePromos}
            COLOR="bg-red-500"
            Function={FilterTableData_On_Card}
            IsFunction={true}
            cursor={false}
          ></StatisticCardwithfigure>

          <StatisticCardwithfigure
            CardHeight={180}
            AnimateColorClass="order8"
            Icon={<MdAddCard style={{ fontSize: 35, color: COLOR_8 }} />}
            CardName="Added This Month"
            CardNote="refers to advertisements that were added for broadcast in the current month."
            CardFigure={
              data.filter((Promos) => {
                const addedOnDate = new Date(Promos.AddedOn);
                return (
                  addedOnDate.getFullYear() === currentYear &&
                  addedOnDate.getMonth() === currentMonth
                );
              }).length
            }
            COLOR="bg-yellow-500"
            Function={FilterTableData_On_Card}
            IsFunction={true}
            cursor={false}
          ></StatisticCardwithfigure>
        </div>
        <DisplayTableBigContent
          data={tableDataFilter}
          columns={columns}
          sorting={sorting}
          globalFilter={''}
          setSorting={setSorting}
          setGlobalFilter={setGlobalFilter}
          openDrawer={() => setIsDrawerOpen(true)}
          ExportName={IsChannelwise ? 'StoryMaster' : 'PromoMaster'}
        />
      </Card>
      <UploadingLoaderDialog
        title="Uploading File"
        isOpen={isFileUploadingLoaderOpen}
        uploadPercent={uploadPercent}
      />
      {Array.isArray(fileArray) && (
        <FileSummaryDialog
          fileArray={fileArray}
          setFileArray={setFileArray}
          isOpen={isFileSummaryDialogOpen}
          setIsOpen={setIsFileSummaryDialogOpen}
        />
      )}
      <Loader showLoader={showLoader} />
      <div
        tabIndex={0} // Make the div focusable
        onKeyDown={handleKeyDown}
        style={{
          border: "1px solid black",
          padding: "20px",
          textAlign: "center",
          outline: "none",
        }}
      >
        Press an arrow key!
      </div>
    </>
  );
};

export default PromoMaster;
