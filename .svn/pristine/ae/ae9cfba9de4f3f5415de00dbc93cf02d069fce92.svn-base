import { Button, Dialog } from 'components/ui';
import React from 'react';
import DailyFPCApp from 'views/Programming/FPCMaster/DailyFPCApp';

function FPCVerifyDialog({
  DailyFPCdialogVisible,
  setDailyFPCDialogVisible,
  data,
  setdata,
  channel,
  SelectedDate,
  emptySegmentData,
  setemptySegmentData,
  apexBarChar,
}) {
  return (
    <Dialog
      isOpen={DailyFPCdialogVisible}
      width={1200}
      height={600}
      onClose={() => setDailyFPCDialogVisible(false)}
    >
      <h4 className="mb-4">FPC Verify</h4>
      <div className="">
        <DailyFPCApp
          data={data}
          setdata={setdata}
          LocationCode={channel.LocationCode}
          ChannelCode={channel.ChannelCode}
          SelectedDate={SelectedDate}
          emptySegmentData={emptySegmentData}
          setemptySegmentData={setemptySegmentData}
        ></DailyFPCApp>
      </div>
      <Button
        label="Save"
        variant="solid"
        size="sm"
        className="mt-6"
        onClick={() => {
          apexBarChar(data, false);
        }}
      >
        Save
      </Button>
    </Dialog>
  );
}

export default FPCVerifyDialog;
