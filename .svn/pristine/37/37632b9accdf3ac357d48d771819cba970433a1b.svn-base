import { useState, useEffect, useMemo } from 'react';
import { Badge, Tooltip, Upload, Dialog, Select } from 'components/ui';
import {
  apiGetContentsegmaster,
  apiGetContentTypemaster,
} from 'services/ProgrammingService';
import { Button, Card } from 'components/ui';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { Link, useNavigate } from 'react-router-dom';
import { setContent, setContentSeg } from 'store/base/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import appConfig from 'configs/app.config';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import {
  HiOutlineCloudUpload,
  HiOutlinePencil,
  HiPlusCircle,
} from 'react-icons/hi';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { GRAY_300 } from 'views/Controls/Dashboard/constants/tw_colors';
import Loader from 'views/Controls/Loader';
import { apiCallstoreprocedure } from 'services/CommonService';
import { MdOutlinePostAdd } from 'react-icons/md';
import { LuView } from 'react-icons/lu';
import { ContentsegmasterImportTemplate } from 'views/Controls/ImportTemplate';
import { IoIosCloudDownload, IoIosCloudUpload } from 'react-icons/io';
import { ExportXls } from 'views/Controls/ExportXls';
import Td from 'components/ui/Table/Td';
import ContentsegEdit from './ContentsegEdit';
import { setContSegMasterSearchKeyword } from 'store/sectionWiseState/contentSegSlice';

const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: false };

const headerExtraContent = (dispatch, setdialogIsOpen) => {
  const DonwloadPromoImportTemplate = () => {
    ExportXls([ContentsegmasterImportTemplate], 'Segment_Import_Template');
  };
  return (
    <span className="flex items-center">
      <Tooltip title="Download Segment Template">
        <Button
          variant="solid"
          size="sm"
          icon={<IoIosCloudDownload />}
          onClick={() => DonwloadPromoImportTemplate()}
          className="mr-2"
        />
      </Tooltip>
      <Tooltip title="Upload Segment">
        <Button
          variant="solid"
          size="sm"
          icon={<IoIosCloudUpload />}
          onClick={() => setdialogIsOpen(true)}
          className="mr-2"
        />
      </Tooltip>
      <span className="mr-1 font-semibold">
        <Link to={'/addcontentseg'}>
          <Button
            block
            variant="solid"
            size="sm"
            icon={<HiPlusCircle />}
            onClick={() => {
              dispatch(setContent(''));
              dispatch(setContentSeg(''));
            }}
          >
            Add Content Segment
          </Button>
        </Link>
      </span>
    </span>
  );
};

const ContentSegmaster = () => {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const contSegMasterSearchKeyword = useSelector(
    (state) => state.contentSegment,
  ).contSegMasterSearchKeyword;
  hideStackedSideNav_secondary();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.session.token);
  const { themeColor, primaryColorLevel } = useSelector((state) => state.theme);
  const [globalFilter2, setGlobalFilter2] = useState('');
  const [FilterValue, setFilterValue] = useState([]);
  const [ContentCheckList, setContentCheckList] = useState([]);
  const [ContentCheckListFilter, setContentCheckListFilter] = useState([]);
  const [isAddSegmentDialogOpen, setIsAddSegmentDialogOpen] = useState(false);
  const [filterColumns, setFilterColumns] = useState([]);
  useEffect(() => {
    const filteredContentList = ContentCheckList.filter((content) => {
      if (FilterValue.some((option) => option.value === 'all')) {
        return true;
      }
      return FilterValue.some(
        (option) => option.value == content.ContentTypeCode,
      );
    });
    setContentCheckListFilter(filteredContentList);
  }, [FilterValue]);

  useEffect(() => {
    (async (values) => {
      const res = await apiGetContentTypemaster();
      const formattedOptions = res.data.map((option) => ({
        value: option.ContentTypeCode,
        label: option.ContentTypeName,
      }));
      setFilterColumns([{ value: 'all', label: 'All' }, ...formattedOptions]);
    })();
  }, []);

  const [ContentSegDataCheckList, setContentSegDataCheckList] = useState([]);
  const [ShowLoader, setShowLoader] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const tip = <p className="mt-2">XLSX only</p>;
  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };
  const columnsSEG = useMemo(
    () => [
      {
        header: 'Content',
        accessorKey: 'ContentMaster.ContentName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center">
              <Tooltip title={row.ContentMaster?.ContentName}>
                <Badge
                  style={{ minWidth: '9px' }}
                  className={statusColor[row.IsActive]}
                />
                <span
                  className="ml-2 rtl:mr-2 capitalize"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '200px',
                  }}
                >
                  {row.ContentMaster?.ContentName}
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
      {
        header: 'Season',
        accessorKey: 'SeasonNo',
        options: {
          cell: {
            style: {
              paddingBlock: '',
            },
          },
        },
      },
      {
        header: 'Episode',
        accessorKey: 'EpisodeNo',
        options: {
          cell: {
            style: {
              paddingBlock: '',
            },
          },
        },
      },
      {
        header: 'Total Segments',
        accessorKey: 'MaximumSegments',
        options: {
          cell: {
            style: {
              paddingBlock: '',
            },
          },
        },
      },
      {
        header: 'Total Duration',
        accessorKey: 'EpisodeDurationinMin',
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
          return (
            <Td className="text-xs font-medium" style={{ width: 50 }}>
              <center>
                <Tooltip title="Segment Edit">
                  <span
                    className={`cursor-pointer pl-3 text-base hover:text-${themeColor}-${primaryColorLevel}`}
                    onClick={() => {
                      const transformedObject = {
                        tx: {
                          value: row.TXVersionMaster.TXVersionCode,
                          label: row.TXVersionMaster.TXVersionName,
                        },
                      };

                      console.log(transformedObject);
                      const updatedArray = {
                        ...row,
                        ...transformedObject,
                      };
                      console.log('updatedArray', updatedArray);
                      dispatch(setContent(updatedArray));
                      dispatch(setContentSeg(''));
                      navigate('/addcontentseg');
                    }}
                  >
                    <HiOutlinePencil />
                  </span>
                </Tooltip>
              </center>
            </Td>
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
      },
    ],
    [],
  );

  const columns = useMemo(
    () => [
      {
        header: 'Content',
        accessorKey: 'ContentName',
        cell: (props) => {
          const row = props.row.original;
          // const handleImageClick = () => {
          //   setDialogImage(row); // Set the image URL for the dialog
          //   setIsOpen(true); // Open the dialog
          // };
          return (
            <Tooltip title={row.ContentName}>
              <div className="flex items-center w-[300px]">
                {row.Content_Image ? (
                  <img
                    src={row.Content_Image}
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                    className="hover:opacity-80 cursor-pointer"
                    // onClick={handleImageClick} // Handle click event to open dialog
                  />
                ) : (
                  <img
                    src={'/img/3204121.jpg'}
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                    className="hover:opacity-80 cursor-pointer"
                    // onClick={handleImageClick} // Handle click event to open dialog
                  />
                )}

                <span
                  className="ml-2 rtl:mr-2 capitalize"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '300px',
                  }}
                >
                  {row.ContentName}
                </span>
              </div>
            </Tooltip>
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
        header: 'Type',
        accessorKey: 'ContentTypeName',
        options: {
          cell: {
            style: {
              paddingBlock: '',
            },
          },
        },
      },
      {
        header: 'Language',
        accessorKey: 'LanguageName',
        options: {
          cell: {
            style: {
              paddingBlock: '',
            },
          },
        },
      },
      {
        header: 'Season',
        accessorKey: 'SeasonNo',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center justify-center">
              <h6>{row.SeasonNo}</h6>
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
        header: 'Total EP',
        accessorKey: 'TotalEpisodes',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center justify-center">
              <h6>{row.TotalEpisodes}</h6>
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
        header: 'Seg Created',
        accessorKey: 'SegmentationDone',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center justify-center">
              <h6
                className="ml-2 rtl:mr-2 capitalize"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '200px',
                }}
              >
                {row.SegmentationDone}
              </h6>
              {row.SegmentationDone > 0 && (
                <Tooltip title="View Segment">
                  <Button
                    size="xs"
                    variant="plain"
                    shape="circle"
                    className="mr-2 ml-2"
                    icon={<LuView color={GRAY_300} />}
                    onClick={() => {
                      dispatch(setContent(''));
                      dispatch(setContentSeg(''));

                      GETSEGMENTAPI(row, row.ContentCode);
                    }}
                  />
                </Tooltip>
              )}
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
        header: 'Seg Pending',
        accessorKey: 'SegmentationPending',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div className="flex items-center justify-center">
              <span
                className="ml-2 rtl:mr-2 capitalize"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '200px',
                }}
              >
                {row.SegmentationPending !== 0 ? (
                  <h6>{row.SegmentationPending}</h6>
                ) : (
                  'All Created'
                )}
              </span>
              {row.SegmentationPending !== 0 && (
                <Tooltip title="Add Segment">
                  <Button
                    size="xs"
                    variant="plain"
                    shape="circle"
                    className="mr-2 ml-2"
                    icon={<MdOutlinePostAdd color={GRAY_300} />}
                    onClick={() => {
                      dispatch(
                        setContent({
                          SeasonNo: row.SeasonNo,
                        }),
                      );
                      console.log('rowp', row);

                      dispatch(
                        setContentSeg({
                          ContentCode: row.ContentCode,
                          ContentName: row.ContentName,
                          ContentTypeCode: row.ContentTypeCode,
                          EpisodeNo: 0,
                          SeasonNo: row.SeasonNo,
                          ClassificationCode: row.ClassificationCode,
                        }),
                        setIsAddSegmentDialogOpen(true),
                      );
                    }}
                  />
                </Tooltip>
              )}
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

  useEffect(() => {
    setShowLoader(true);
    let data = {};
    data.par_LocationCode = Channel.LocationCode;
    data.par_ChannelCode = Channel.ChannelCode;

    apiCallstoreprocedure('USP_PG_ContentSegmentation_Get', data)
      .then((response) => {
        if (response.status == 200) {
          setShowLoader(false);
          setContentCheckList(Object.assign([], response.data));
          setContentCheckListFilter(Object.assign([], response.data));
          console.log(response.status);
        }

        if (response.status == 204) {
          setContentCheckList([]);
          setContentCheckListFilter([]);
          setShowLoader(false);
        }
      })
      .catch((error) => {
        if (error.response.status) {
          setContentCheckList([]);
          setContentCheckListFilter([]);
          setShowLoader(false);
        }
      });
  }, [Channel]);

  const [dialogIsOpen, setdialogIsOpen] = useState(false);

  const onDialogClose = (e) => {
    console.log('onDialogClose', e);
    setdialogIsOpen(false);
  };
  const beforeUpload = async (files, fileList) => {
    const allowedFileType = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    const invalidFileTypeMessage = 'Please upload an XLSX file!';
    if (fileList.length >= 1) {
      return `You can only upload ${1} file(s)`;
    }
    const selectedFile = files[0];

    if (!allowedFileType.includes(selectedFile.type)) {
      return invalidFileTypeMessage;
    }

    setSelectedFile(selectedFile);
  };

  const onDialogOk = async () => {
    const headersList = {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    };
    const bodyContent = new FormData();
    // Convert binary data to a string
    const reader = new FileReader();
    reader.onload = async function (event) {
      const arrayBuffer = event.target.result;
      const blob = new Blob([arrayBuffer], { type: selectedFile.type });
      bodyContent.append('file', blob, selectedFile.name);
      // Now you can make the API call
      try {
        const response = await fetch(
          appConfig.apiPrefix + '/contentsegmaster/upload/',
          {
            method: 'POST',
            body: bodyContent,
            headers: headersList,
          },
        );
        const result = await response.json();
        if (response.status == 404) {
          openNotification('warning', result.detail);
          return;
        }
        if (response.status == 500) {
          openNotification('warning', result.detail);
          return;
        }
        // If you need to handle additional logic after a successful upload
        if (response.status == 200) {
          openNotification('success', 'File Upload Successfully');
          setdialogIsOpen(false);
          setShowLoader(true);
          let data = {};
          data.par_LocationCode = Channel.LocationCode;
          data.par_ChannelCode = Channel.ChannelCode;
          apiCallstoreprocedure('USP_PG_ContentSegmentation_Get', data)
            .then((response) => {
              if (response.status == 200) {
                setShowLoader(false);

                setContentCheckListFilter(response.data);
                console.log(response.status);
              }

              if (response.status == 204) {
                setContentCheckListFilter([]);
                setShowLoader(false);
              }
            })
            .catch((error) => {
              if (error.response.status) {
                setContentCheckListFilter([]);
                setShowLoader(false);
              }
            });
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const [dialogIsOpenSeg, setdialogIsOpenSeg] = useState(false);
  const [ContentSegmanagedColumns, setContentSegManagedColumns] = useState([]);
  const [
    ContentSegmanagedFordialogColumns,
    setContentSegmanagedFordialogColumns,
  ] = useState([]);
  const GETSEGMENTAPI = async (data, id) => {
    setShowLoader(true);
    const Parameters = {
      LocationCode: Channel.LocationCode,
      ChannelCode: Channel.ChannelCode,
      ContentCode: data.ContentCode,
      SeasonNo: Number(data.SeasonNo),
    };
    const resp = await apiGetContentsegmaster(Parameters);
    setContentSegDataCheckList(
      resp.data.filter((item) => id == item.ContentMaster.ContentCode),
    );
    setShowLoader(false);
    setdialogIsOpenSeg(true);
    dispatch(setContent(''));
    dispatch(setContentSeg(''));
  };

  return (
    <>
      <Loader showLoader={ShowLoader} />
      <Dialog
        isOpen={dialogIsOpen}
        width={500}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <Upload beforeUpload={beforeUpload} uploadLimit={1} tip={tip}>
          <Button variant="solid" icon={<HiOutlineCloudUpload />}>
            Upload your file
          </Button>
        </Upload>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onDialogClose}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={onDialogOk}>
            OK
          </Button>
        </div>
      </Dialog>
      <Card
        header={<HeaderExtra />}
        headerExtra={headerExtraContent(dispatch, setdialogIsOpen)}
        className="flex flex-col  "
        bodyClass="grow"
      >
        <span className="flex justify-between items-center">
          <div className="mr-1 font-semibold" style={{ width: '300px' }}>
            <Select
              isMulti
              placeholder="Please Select"
              defaultValue={[filterColumns[0]]}
              options={filterColumns}
              style={{ width: '300px' }}
              onChange={(e) => {
                setFilterValue(e);
              }}
              size="xs"
            />
          </div>
          <span className="mr-1   font-semibold">
            <InputwithVoice
              value={contSegMasterSearchKeyword}
              className=" solid"
              placeholder="Search all columns..."
              size="sm"
              onChange={(e) => {
                dispatch(setContSegMasterSearchKeyword(e.target.value));
              }}
            />
          </span>
        </span>
        <Dialog
          isOpen={dialogIsOpenSeg}
          onClose={() => setdialogIsOpenSeg(false)}
          width={1200}
        >
          <Card
            className="h-[500px] overflow-y-scroll"
            header="Created Segment"
          >
            <ReportsTable
              tableData={ContentSegDataCheckList}
              originalColumns={columnsSEG}
              managedColumns={ContentSegmanagedFordialogColumns}
              setManagedColumns={setContentSegmanagedFordialogColumns}
              exportFileName="Content Seg"
              toolbarOptions={TOOLBAR_OPTIONS}
              columnsToFormatInINR={[]}
              externalGlobalFilter={globalFilter2}
            />
            {/* )} */}
          </Card>
        </Dialog>
        <div className="h-[80vh] w-[80wh] overflow-y-hidden hover:overflow-y-scroll">
          <ReportsTable
            tableData={ContentCheckListFilter}
            originalColumns={columns}
            managedColumns={ContentSegmanagedColumns}
            setManagedColumns={setContentSegManagedColumns}
            exportFileName="Content Seg"
            toolbarOptions={TOOLBAR_OPTIONS}
            columnsToFormatInINR={[]}
            externalGlobalFilter={contSegMasterSearchKeyword}
          />
        </div>
      </Card>
      <Dialog
        isOpen={isAddSegmentDialogOpen}
        onClose={() => setIsAddSegmentDialogOpen(false)}
        onRequestClose={() => setIsAddSegmentDialogOpen(false)}
        className="max-w-[90vw] !w-[90vw] -mt-8"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="h-[85vh] overflow-y-auto">
            <ContentsegEdit setIsOpen={setIsAddSegmentDialogOpen} />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ContentSegmaster;
