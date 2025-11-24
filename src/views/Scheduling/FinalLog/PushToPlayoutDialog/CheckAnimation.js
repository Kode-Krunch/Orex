import React, { useContext, useEffect } from 'react';
import Lottie from 'lottie-react';
import checkAnimation from './Animation.json';
import AnimationError from './AnimationError.json';
import Table from 'components/ui/Table';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { parseDuration } from 'views/Controls/GLOBALFUNACTION';

const { Tr, Th, Td, THead, TBody } = Table;

const CheckAnimation = ({ rowSuccess, setRowSuccess, isDialogOpen }) => {
  const { schedulingTableData } = useContext(SchedulerContext);
  const times = isDialogOpen
    ? schedulingTableData
      .filter((item) => item.F_C_S_P === 'CT')
      .map((item) => ({
        ...item,
        FPC_Time: item.FPC_Time + '00:00',
      }))
    : [];
  useEffect(() => {
    if (isDialogOpen) {
      // Reset rowSuccess when dialog opens
      setRowSuccess(
        Array(
          schedulingTableData.filter((item) => item.F_C_S_P === 'CT').length,
        ).fill(false),
      );

      // Loop through each row with a delay to trigger animations one by one
      times.forEach((_, index) => {
        setTimeout(() => {
          setRowSuccess((prev) => {
            const newRowSuccess = [...prev];
            newRowSuccess[index] = true; // Trigger this row success

            return newRowSuccess;
          });
        }, index * 500); // Delay between each row animation and appearance
      });
    } else {
      // Clear the rowSuccess array when dialog closes
      times = [];
      setRowSuccess([]); // Reset to an empty state
    }
  }, [isDialogOpen]); // Re-run when isDialogOpen changes

  return (
    <div>
      <Table compact borderlessRow={false}>
        <THead>
          <Tr>
            <Th className="text-center"> </Th>
            <Th className="text-center">Program</Th>
            <Th className="text-center">FPC Time</Th>
            <Th className="text-center">Telecast Time</Th>
            <Th className="text-center">Status</Th>
          </Tr>
        </THead>

        <TBody>
          {times.map(
            (time, index) =>
              rowSuccess[index] && ( // Only render if rowSuccess is true
                <Tr key={index} className="h-10">
                  <Td>
                    {(() => {
                      const difference =
                        Number(parseDuration(time.Tel_Time)) -
                        Number(parseDuration(time.FPC_Time + '00:00'));
                      return difference < 0 ? (
                        <Lottie
                          animationData={AnimationError}
                          loop={false}
                          autoplay={true}
                          style={{ width: '20px', height: '20px' }}
                        />
                      ) : difference > 0 ? (
                        <Lottie
                          animationData={AnimationError}
                          loop={false}
                          autoplay={true}
                          style={{ width: '20px', height: '20px' }}
                        />
                      ) : (
                        <Lottie
                          animationData={checkAnimation}
                          loop={false}
                          autoplay={true}
                          style={{ width: '20px', height: '20px' }}
                        />
                      );
                    })()}
                  </Td>
                  <Td>{time.Event_Name}</Td>
                  <Td>{time.FPC_Time}</Td>
                  <Td>{time.Tel_Time}</Td>
                  <Td>
                    {(() => {
                      const difference =
                        Number(parseDuration(time.Tel_Time)) -
                        Number(parseDuration(time.FPC_Time + '00:00'));


                      return difference < 0 ? (
                        <p className="w-[120px] rounded text-center bg-red-500/50 text-red-100 text-sm font-semibold ">
                          {Math.floor(Math.abs(difference))} Min Delay
                        </p>
                      ) : difference > 0 ? (
                        <p className="bg-amber-500/20 text-amber-100 text-sm font-semibold w-[120px] rounded text-center">
                          {Math.floor(Math.abs(difference))} Min Early
                        </p>
                      ) : (
                        <p className="bg-emerald-500/20 text-emerald-100 text-sm font-semibold w-[120px] rounded text-center">
                          On time
                        </p>
                      );
                    })()}
                  </Td>
                </Tr>
              ),
          )}
        </TBody>
      </Table>
    </div>
  );
};

export default CheckAnimation;
