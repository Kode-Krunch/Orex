import { Button, Dialog, Tag } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { apiCallstoreprocedure } from 'services/CommonService';
import {
  isChannelSelected,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import ManualMatchTable from './ManualMatchTable';
import { telecastStatus } from './enums';
import { asunMatchingRouteTitle } from 'configs/routes.config';
import { apiPOSTAsrunMatch } from 'services/BillingService';
import WarningDialog from 'views/Controls/WarningDialog';
import Loader from 'views/Controls/Loader';
import { handleExportToExcel } from 'views/Controls/DisplayTable';
import { HiDownload } from 'react-icons/hi';

import {
  StatusEditor,
  TelecastDurationEditor,
  TelecastTimeEditor,
} from './HelperComponents';

/* CONSTANTS */
const TABLE_COLUMNS = [
  {
    field: 'ClientName',
    accessorKey: 'ClientName',
    header: 'Client',
    editable: false,
    editor: null,
  },
  {
    field: 'AgencyName',
    accessorKey: 'AgencyName',
    header: 'Agency',
    editable: false,
    editor: null,
  },
  {
    field: 'BrandName',
    accessorKey: 'BrandName',
    header: 'Brand',
    editable: false,
    editor: null,
  },
  {
    field: 'VideoID',
    accessorKey: 'VideoID',
    header: 'Video ID',
    editable: false,
    editor: null,
  },
  {
    field: 'CommercialCaption',
    accessorKey: 'CommercialCaption',
    header: 'Commercial',
    editable: false,
    editor: null,
  },
  {
    field: 'ContentName',
    accessorKey: 'ContentName',
    header: 'Content Name',
    editable: false,
    editor: null,
  },
  {
    field: 'SpotAmount',
    accessorKey: 'SpotAmount',
    header: 'Spot Amount',
    editable: false,
    editor: null,
  },
  {
    field: 'ScheduleTime',
    accessorKey: 'ScheduleTime',
    header: 'Schedule Time',
    editable: false,
    editor: null,
  },
  {
    field: 'AsRunProgram',
    accessorKey: 'AsRunProgram',
    header: 'AsRun Program',
    editable: false,
    editor: null,
  },
  {
    field: 'TimeBandName',
    accessorKey: 'TimeBandName',
    header: 'Timeband',
    editable: false,
    editor: null,
  },
  {
    field: 'Remark',
    accessorKey: 'Remark',
    header: 'Status',
    editable: true,
    editor: StatusEditor,
  },
  {
    field: 'AsRunTime',
    accessorKey: 'AsRunTime',
    header: 'Telecast Time',
    editable: true,
    editor: TelecastTimeEditor,
  },
  {
    field: 'AsRunDuration',
    accessorKey: 'AsRunDuration',
    header: 'Telecast Duration',
    editable: true,
    editor: TelecastDurationEditor,
  },
  {
    field: 'CommercialDuration',
    accessorKey: 'CommercialDuration',
    header: 'Duration',
    editable: false,
    editor: null,
  },
];

function ManualMatchDialog({
  isManualMatchDialogOpen,
  setIsManualMatchDialogOpen,
  channel,
  date,
  currentRouteTitle,
  token,
}) {
  /* STATES */
  const [originalShowData, setOriginalShowData] = useState(null);
  const [manualMatchedData, setManualMatchedData] = useState(null);
  // UI States
  const [showLoader, setShowLoader] = useState(false);
  const [isCancelManualMatchDialogOpen, setIsCancelManualMatchDialogOpen] =
    useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      setShowLoader(true);
      if (isManualMatchDialogOpen && date && isChannelSelected(channel)) {
        // let param = {
        //   ChannelCode: channel.ChannelCode,
        //   LocationCode: channel.LocationCode,
        //   TelecastDate: date,
        // };
        let response;
        if (currentRouteTitle === asunMatchingRouteTitle) {
          let param = {
            ChannelCode: channel.ChannelCode,
            LocationCode: channel.LocationCode,
            TelecastDate: date,
          };

          response = await apiCallstoreprocedure(
            'USP_Billing_Asrun_ShowData',
            param,
          );
        } else {
          let param = {
            ChannelCode: channel.ChannelCode,
            LocationCode: channel.LocationCode,
            TelecastDate: date,
          };
          response = await apiCallstoreprocedure(
            'USP_Billing_Asrun_ShowData_NTC',
            param,
          );
        }
        if (response) {
          if (response.status === 200) {
            setOriginalShowData(JSON.parse(JSON.stringify(response.data)));
            setManualMatchedData(JSON.parse(JSON.stringify(response.data)));
          } else if (response.status === 204) {
            setOriginalShowData([]);
            setManualMatchedData([]);
          } else {
            openNotification(
              'danger',
              `Unable to get Show Data. Server responded with status code ${response.status}`,
            );
          }
        } else {
          openNotification(
            'danger',
            'Something went wrong. Unable to get Show Data',
          );
        }
      }
      setShowLoader(false);
    })();
  }, [date, channel, isManualMatchDialogOpen, currentRouteTitle]);

  /* EVENT HANDLERS */
  const handleSave = async () => {
    try {
      let IsNTC = 0;
      if (currentRouteTitle !== asunMatchingRouteTitle) {
        IsNTC = 1;
      }
      setShowLoader(true);
      const data = manualMatchedData.filter((row) => row.Flag === 1);
      let response = await apiPOSTAsrunMatch(data, channel, token, IsNTC);
      if (response) {
        if (response.status === 200) {
          openNotification('success', 'Manual match data saved successfully');
          setIsManualMatchDialogOpen(false);
          setOriginalShowData(null);
          setManualMatchedData(null);
        } else {
          openNotification(
            'danger',
            `Something went wrong while saving manual match data. Server responded with status code ${response.status}`,
          );
        }
      } else {
        openNotification(
          'danger',
          'Something went wrong. Unable to save manual match data',
        );
      }
      setShowLoader(false);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong. Unable to save manual match data',
      );
      console.error(error);
      setShowLoader(false);
    }
  };

  const handleDialogClose = () => {
    setIsManualMatchDialogOpen(false);
  };

  /* HELPER FUNCTIONS */
  const getMatchedTotal = (type) => {
    try {
      if (Array.isArray(manualMatchedData)) {
        if (type === telecastStatus.TELECASTED) {
          return manualMatchedData.filter(
            (data) => data.Remark === telecastStatus.TELECASTED,
          ).length;
        } else
          return manualMatchedData.filter(
            (data) => data.Remark === telecastStatus.NOT_TELECASTED,
          ).length;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog
        isOpen={isManualMatchDialogOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
        height={'90vh'}
        width={'95vw'}
        contentClassName="h-full flex flex-col mb-8 mt-8"
        className="max-w-max"
      >
        <div className="mb-5 flex justify-between items-center">
          <h3>Manual Match</h3>
          <div className="flex gap-2">
            <Tag prefix prefixClass="bg-green-700" showCloseButton={false}>
              <span className="text-[0.8rem]">
                Telecasted - {getMatchedTotal(telecastStatus.TELECASTED)}
              </span>
            </Tag>
            <Tag prefix prefixClass="bg-red-700" showCloseButton={false}>
              <span className="text-[0.8rem]">
                Not Telecasted -{' '}
                {getMatchedTotal(telecastStatus.NOT_TELECASTED)}
              </span>
            </Tag>
          </div>
        </div>
        <div className="grow h-0">
          <ManualMatchTable
            manualMatchedData={manualMatchedData}
            setManualMatchedData={setManualMatchedData}
            originalShowData={originalShowData}
            columns={TABLE_COLUMNS}
          />
        </div>
        <div className="flex gap-2 justify-end items-center mt-6">
          <Button
            variant="solid"
            onClick={() => {
              handleExportToExcel(
                TABLE_COLUMNS,
                manualMatchedData,
                'Manual Match',
              );
            }}
            icon={<HiDownload />}
          >
            Export
          </Button>
          <Button variant="solid" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Dialog>
      <WarningDialog
        isDialogOpen={isCancelManualMatchDialogOpen}
        title="Manual Matching"
        description={`All the changes will reset. Are you sure you want to continue to close?`}
        submitButtonTitle="Yes"
        handleDialogSubmit={() => {
          setOriginalShowData(null);
          setManualMatchedData(null);
          setIsCancelManualMatchDialogOpen(false);
          setIsManualMatchDialogOpen(false);
        }}
        handleDialogClose={() => {
          setIsCancelManualMatchDialogOpen(false);
        }}
      />
      <Loader showLoader={showLoader} />
    </>
  );
}

export default ManualMatchDialog;
