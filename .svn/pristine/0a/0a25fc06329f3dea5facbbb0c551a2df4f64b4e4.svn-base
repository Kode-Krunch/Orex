import { Button, Card, Dialog, Steps } from 'components/ui';
import React, { useContext, useEffect, useState } from 'react';
import Summary from './Summary';
import Verify from './Verify';
import {
  openNotification,
  parseDuration,
} from 'views/Controls/GLOBALFUNACTION';
import Lottie from 'lottie-react';
import Proccess from './Proccess.json';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { exportPlayout } from '../../utils/utils';
import { useSelector } from 'react-redux';
import { CLIENT, CLIENTWiseUploadPath } from 'views/Controls/clientListEnum';
import { apiexportpayout } from 'services/ProgrammingService';
import { convertDateToYMD } from 'components/validators';

function PushToPlayoutDialog({
  isDialogOpen,
  setIsDialogOpen,
  CountData,
  Commercial_scheduling_Counts,
  TotalBreaks,
  totalDuration,
  blankTxLogCount,
}) {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const channelSettings = useSelector(
    (state) => state.auth.session.ChannelSettingMain,
  );

  /* CONTEXT */
  const { schedulingTableData, date } = useContext(SchedulerContext);

  /* STATES */
  const [step, setStep] = useState(1);
  const [ProcessingTime, setProcessingTime] = useState(true);
  const [isCheckAnyError, setisCheckAnyError] = useState(false);
  const [rowSuccess, setRowSuccess] = useState(
    Array(
      schedulingTableData.filter((item) => item.F_C_S_P === 'CT').length,
    ).fill(false),
  );

  /* USE EFFECTS */
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setProcessingTime(false);
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer); // Cleanup on component unmount or when step changes
    }
  }, [step]);

  /* EVENT HANDLERS */
  const allRowsSuccess = rowSuccess.every((success) => success);
  const onDialogClose = () => {
    if (allRowsSuccess || step == 1) {
      try {
        setIsDialogOpen(false);
        setStep(1);
        setRowSuccess([]);
      } catch (error) {
        console.error(error);
      }
    } else {
      openNotification('warning', 'You have to wait for few sec..');
    }
  };

  return (
    <>
      <Dialog
        isOpen={isDialogOpen}
        onClose={onDialogClose}
        width={'40vw'}
        contentClassName="mt-8"
      >
        <Dialog
          isOpen={isCheckAnyError}
          onClose={() => {
            setisCheckAnyError(false);
          }}
          contentClassName="pb-0 px-0"
          style={{
            content: {
              marginTop: 250,
            },
          }}
        >
          <div className="px-6 pb-6">
            <h5 className="mb-4">Confirmation</h5>

            <p>Are You Sure You Want To Continue</p>
          </div>

          <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
            <Button
              className="ltr:mr-2 rtl:ml-2"
              onClick={() => {
                setisCheckAnyError(false);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="solid"
              onClick={() => {
                setisCheckAnyError(false);
                setStep(3);
              }}
            >
              Okay
            </Button>
          </div>
        </Dialog>

        <h5 className="mb-4">Push To Playouts</h5>
        <Steps current={step}>
          <Steps.Item title="Summary" />
          <Steps.Item title="Validate" />
          <Steps.Item title="Push" />
        </Steps>
        <div className="h-[60vh] mt-4">
          {step === 1 && (
            <Summary
              CountData={CountData}
              Commercial_scheduling_Counts={Commercial_scheduling_Counts}
              TotalBreaks={TotalBreaks}
              totalDuration={totalDuration}
              blankTxLogCount={blankTxLogCount}
            />
          )}
          {step === 2 && (
            <Verify
              rowSuccess={rowSuccess}
              setRowSuccess={setRowSuccess}
              isDialogOpen={isDialogOpen}
            />
          )}
          {step === 3 && (
            <Card
              bordered={false}
              className="h-full"
              bodyClass="h-full flex justify-center items-center"
              style={{ backgroundColor: 'rgb(39 50 65)' }}
            >
              <Lottie
                animationData={Proccess}
                loop={ProcessingTime}
                autoplay={true}
                style={{ width: '300px', height: '300px' }}
              />
            </Card>
          )}
        </div>
        <div className="text-right mt-6">
          {step === 1 && (
            <Button variant="solid" onClick={() => setStep(2)}>
              Verify
            </Button>
          )}

          {step === 2 && (
            <Button
              variant="solid"
              disabled={!allRowsSuccess}
              onClick={() => {
                const CheckAnyError = schedulingTableData
                  .filter((item) => item.F_C_S_P === 'CT')
                  .map((it) => {
                    const difference =
                      Number(parseDuration(it.Tel_Time)) -
                      Number(parseDuration(it.FPC_Time));

                    return difference < 0 || difference > 0 ? false : true; // This could be simplified to just checking if difference === 0
                  });
                // Check if any value in CheckAnyError is false
                if (CheckAnyError.some((value) => value === false)) {
                  setisCheckAnyError(true);
                } else {
                  setStep(3); // Proceed to the next step if all are valid
                }
              }}
            >
              Next
            </Button>
          )}

          {step === 3 && (
            <>
              {channel.label == CLIENT.USA_Forbes ||
                channel.label == CLIENT.AUS_TELSTRA ||
                channel.label == CLIENT.ASIANET ||
                channel.label == CLIENT.KINA_U ||
                channel.label == CLIENT.VIJAY_TAKKER ? (
                <Button
                  variant="solid"
                  disabled={ProcessingTime}
                  onClick={async () => {
                    try {
                      var UploadPath = '';
                      if (channel.label == CLIENT.ASIANET || channel.label == CLIENT.KINA_U) {
                        UploadPath = CLIENTWiseUploadPath.ASIANET;
                      }
                      if (channel.label == CLIENT.VIJAY_TAKKER) {
                        UploadPath = CLIENTWiseUploadPath.VIJAY_TAKKER;
                      }
                      if (channel.label == CLIENT.USA_Forbes) {
                        UploadPath = CLIENTWiseUploadPath.USA_Forbes;
                      }
                      if (channel.label == CLIENT.AUS_TELSTRA) {
                        UploadPath = CLIENTWiseUploadPath.AUS_TELSTRA;
                      }

                      const resp = await apiexportpayout(
                        channel.LocationCode,
                        channel.ChannelCode,
                        convertDateToYMD(date),
                        UploadPath,
                      );

                      setIsDialogOpen(false);
                      setStep(1);
                      setRowSuccess([]);
                      setProcessingTime(true);

                      // Checking for a successful message from the API response
                      console.log('resp', resp.status);
                      console.log('resp1', resp);
                      if (resp?.status === 200) {
                        const filePath = resp?.data?.file_path;
                        if (
                          filePath !== null &&
                          filePath !== undefined &&
                          filePath !== ''
                        ) {
                          openNotification(
                            'success',
                            <>
                              <p>Data Uploaded Successfully</p>
                              <p>{filePath}</p>
                            </>,
                          );
                        } else {
                          openNotification(
                            'success',
                            'Data Uploaded Successfully',
                          );
                        }
                      } else {
                        openNotification('error', 'Data Export Failed');
                      }
                    } catch (error) {
                      console.error('Export Error:', error);
                      openNotification('error', 'Data Export Failed');
                    }
                  }}
                >
                  Upload
                </Button>
              ) : (
                <Button
                  variant="solid"
                  disabled={ProcessingTime}
                  onClick={async () => {
                    await exportPlayout(
                      date,
                      channel,
                      [...schedulingTableData].slice(1),
                      channelSettings?.filter(
                        (item) =>
                          item.Channel.ChannelCode === channel.ChannelCode &&
                          item.locations.LocationCode === channel.LocationCode,
                      )[0],
                    );
                    setIsDialogOpen(false);
                    setStep(1);
                    setRowSuccess([]);
                    setProcessingTime(true);
                  }}
                >
                  Download
                </Button>
              )}
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default PushToPlayoutDialog;
