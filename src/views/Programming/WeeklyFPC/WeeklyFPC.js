import React, { useEffect, useState } from 'react';
import { apiCallstoreprocedure } from 'services/CommonService';
import { convertDateToYMD } from 'components/validators';
import { useSelector } from 'react-redux';
import CalendarWeekly from 'components/shared/CalendarWeekly';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import { Button, Tooltip, Upload } from 'components/ui';
import { handleExportToExcel } from 'views/Controls/DisplayTable';
import { StickyFooter } from 'components/shared';
import { useNavigate } from 'react-router-dom';
import { HiOutlineCloudUpload, HiOutlineDownload } from 'react-icons/hi';
import UploadingLoaderDialog from 'views/Controls/UploadingLoaderDialog';
import FileSummaryDialog from './components/UploadWeeklyFPC/FileSummaryDialog';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import appConfig from 'configs/app.config';
import {
  GREEN_700,
  RED_700,
} from 'views/Controls/Dashboard/constants/tw_colors';
import Loader from 'views/Controls/Loader';
import UploadFileValidateAndSubmitDialog from './components/UploadFileValidateAndSubmitDialog';
import { CLIENT } from 'views/Controls/clientListEnum';
import { FPCImportTemplate } from 'views/Controls/ImportTemplate';
import { ExportXls } from 'views/Controls/ExportXls';
import { FaFileExport } from 'react-icons/fa';
/* CONSTANTS */
const COLUMNS = [
  {
    header: 'Start Time',
    accessorKey: 'startlabel',
  },
  {
    header: 'End Time',
    accessorKey: 'endLabel',
  },
  {
    header: 'Telecast Date',
    accessorKey: 'start',
  },
  {
    header: 'Content Name',
    accessorKey: 'title',
  },
];

const WeeklyFPC = () => {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);
  const [currentDate, setCurrentDate] = useState({
    start: '',
    end: '',
  });

  /* STATES */
  const [showLoader, setShowLoader] = useState(false);
  const [eventsData, seteventsData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileArray, setFileArray] = useState(null);
  const [isFileUploadingLoaderOpen, setIsFileUploadingLoaderOpen] =
    useState(false);
  const [isFileSummaryDialogOpen, setIsFileSummaryDialogOpen] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [uploadStandardDialog, setUploadStandardDialog] = useState(false);

  /* HOOKS */
  const navigate = useNavigate();

  /* USE EFFECTS */
  useEffect(() => {
    hideStackedSideNav_secondary();
    const fetchData2 = async () => {
      try {
        const resp = await apiCallstoreprocedure('USP_PG_GetWeeklyFPC', {
          Locationcode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
          FromDate: currentDate.start,
          Todate: currentDate.end,
        });
        if (resp.status == 204) {
          seteventsData([]);
          return;
        }
        const mr = resp.data.map((item, key) => ({
          id: key,
          title: ` ${item.ContentName} `,
          start: `${item.TelecastDate}T${item.TelecastStartTime}:00`,
          startlabel: `${item.TelecastStartTime}`,
          end: `${item.TelecastDate}T${item.TelecastEndTime}:00`,
          endLabel: `${item.TelecastEndTime}`,
          eventColor: `${item.Colour}`,
        }));
        seteventsData(mr);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (currentDate.start && currentDate.end) {
      fetchData2();
    }
  }, [currentDate, channel]);

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
        setIsFileUploadingLoaderOpen(false);
        setIsFileSummaryDialogOpen(false);
        openNotification('danger', 'Something went wrong while uploading file');
      }
    })();
  }, [selectedFile]);

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

  /* HELPER FUNCTIONS */
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
      let response = await fetch(
        appConfig.apiPrefix +
        `/fpcmaster/upload/?LocationCode=${channel.LocationCode
        }&ChannelCode=${channel.ChannelCode}&TelecastDate=${convertDateToYMD(
          new Date(),
        )}`,
        {
          method: 'POST',
          body: bodyContent,
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      response = await response.json();
      if (Array.isArray(response)) {
        response = response.map((row) =>
          row.statuscode === 0
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

  console.log(channel);

  return (
    <>

      <Loader showLoader={showLoader} />
      <CalendarWeekly
        initialView="timeGridWeek"
        headerToolbar={{
          left: '',
          center: 'title',
          right: 'prev,next',
        }}
        selectable
        events={eventsData}
        datesSet={(dateInfo) => {
          setCurrentDate({
            start: convertDateToYMD(dateInfo.start),
            end: convertDateToYMD(dateInfo.end),
          });
        }}
        contentHeight="auto"
      />{' '}
      <StickyFooter
        className="-mx-8 px-8 flex items-center justify-start py-4 z-10"
        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        <Button
          onClick={() => {
            navigate('/Programming');
          }}
          className="mr-2"
        >
          Back
        </Button>
        <Button
          variant="solid"
          className="mr-2"
          icon={<FaFileExport />}
          onClick={() => {
            const formatDate = (dateString) => {
              const options = {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              };
              const date = new Date(dateString);
              return date.toLocaleDateString('en-US', options).replace(',', '');
            };
            const formattedEvents = eventsData.map((event) => ({
              ...event,
              start: formatDate(event.start),
              end: formatDate(event.end),
              startlabel: event.startlabel,
              endLabel: event.endLabel,
              title: event.title,
            }));

            handleExportToExcel(COLUMNS, formattedEvents, 'WeeklyFPC');
          }}
        >
          Export Excel
        </Button>
        {CLIENT.ASIANET || CLIENT.KINA_U !== channel.label && (
          <Button
            variant="twoTone"
            className="mr-2"
            icon={<HiOutlineDownload />}
            onClick={() => {
              const templateFile = channel.label === CLIENT.ASIANET ? 'Asianet_Cinema_FPC_Template.xlsx'
                : channel.label == CLIENT.KINA_U || channel.label == CLIENT.VIJAY_TAKKER
                  ? 'FPC_Import_Template_New_Format.xlsx'
                  : 'FPC_Import_Template.xlsx';
              try {
                const link = document.createElement('a');
                link.href = `${process.env.PUBLIC_URL}/${templateFile}`;
                link.download = templateFile;
                document.body.appendChild(link); // Ensure link is in DOM
                link.click();
                document.body.removeChild(link); // Clean up
              } catch (error) {
                console.error('Failed to download template:', error);
                openNotification('danger', 'Failed to download template');
              }
            }}
          >
            Download Template
          </Button>
        )}
        {/* <Tooltip title="Upload Standard Formart" placement="top">
          <Upload
            beforeUpload={handleBeforeUpload}
            uploadLimit={1}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            showList={false}
          >
            <Button variant="solid" icon={<HiOutlineCloudUpload />}>
              Upload
            </Button>
          </Upload>
        </Tooltip> */}
        {(CLIENT.ASIANET === channel.label || CLIENT.KINA_U === channel.label || CLIENT.KINA_U || channel.label === CLIENT.VIJAY_TAKKER) && (
          <div className="ml-2">
            <Tooltip title="Upload Weekly FPC" placement="top">
              <Button
                variant="twoTone"
                icon={<HiOutlineCloudUpload />}
                onClick={() => {
                  setUploadDialog(true);
                }}
                color="blue-600"
              >
                Upload Weekly FPC
              </Button>
            </Tooltip>
          </div>
        )}

        {(channel.label !== CLIENT.ASIANET && channel.label !== CLIENT.KINA_U && channel.label !== CLIENT.VIJAY_TAKKER) && (
          <div className="ml-2">
            <Tooltip title="Upload Standard Format" placement="top">
              <Button
                variant="twoTone"
                icon={<HiOutlineCloudUpload />}
                onClick={() => {
                  setUploadStandardDialog(true);
                }}
                color="blue-600"
              >
                Upload Weekly FPC
              </Button>
            </Tooltip>
          </div>
        )}
      </StickyFooter>
      <UploadFileValidateAndSubmitDialog
        setShowLoader={setShowLoader}
        isDialogOpen={uploadDialog}
        setIsDialogOpen={setUploadDialog}
        submissionSP={'USP_PG_WeeklyFPCSave'}
        valdationSP={'USP_PG_WeeklyFPC_Validation'}
        successMessage={'Weekly FPC Created successfully'}
        // fileUploadapi={
        //   channel.label ==
        //     (CLIENT.ASIANET || CLIENT.ANI_PLUS || CLIENT.MASST_INDIA)
        //     ? 'fpcmaster/uploadFileNewFormat'
        //     : channel.label == (CLIENT.VIJAY_TAKKER) ? 'fpcmaster/uploadFileNewFormat_VIJAYTV'
        //       : 'fpcmaster/uploadintenclient'
        // }

        fileUploadapi={
          ([
            CLIENT.ANI_PLUS,
            CLIENT.MASST_INDIA,
          ].includes(channel.label))
            ? 'fpcmaster/uploadFileNewFormat'
            : channel.label == CLIENT.KINA_U || channel.label == CLIENT.VIJAY_TAKKER
              ? 'fpcmaster/uploadFileNewFormat_VIJAYTV' : channel.label == CLIENT.ASIANET ? 'fpcmaster/uploadFileNewFormat_AsiaNetChannel'
                : 'fpcmaster/uploadintenclient'
        }
        name={'Weekly FPC'}
        tableName={'WeeklyFPC'}

      />

      <UploadFileValidateAndSubmitDialog
        setShowLoader={setShowLoader}
        isDialogOpen={uploadStandardDialog}
        setIsDialogOpen={setUploadStandardDialog}
        submissionSP={'USP_PG_WeeklyFPCSave'}
        valdationSP={'USP_PG_WeeklyFPC_Validation'}
        successMessage={'Weekly FPC Created successfully'}
        fileUploadapi={
          channel.label === CLIENT.GEC ||
            channel.label === CLIENT.INDIA_GEC ||
            channel.label === CLIENT.USA_GEC
            ? 'fpcmaster/uploadintenclient'
            : 'fpcmaster/uploadFileStandardFormat'
        }
        name={'Weekly FPC'}
        tableName={'WeeklyFPC'}
      />
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
    </>
  );
};

export default WeeklyFPC;
