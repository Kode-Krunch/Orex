import { Button, Dialog, Radio } from 'components/ui';
import { useContext, useState } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import Events from './BulkInsertDialog/components/Events';
import { operationTypesEnum } from 'views/Scheduling/Scheduler/enum';

function RepeatInsertDialog({ isDialogOpen, setIsDialogOpen }) {
  /* CONTEXT */
  const { executeOperation } = useContext(SchedulerContext);

  /* STATES */
  const [repeatInsertType, setRepeatInsertType] = useState('sequentialInsert');

  /* EVENT HANDLERS */
  const handleClose = () => setIsDialogOpen(false);

  const handleRepeatInsert = async () => {
    try {
      const result = await executeOperation({
        operation: operationTypesEnum.REPEAT_INSERT_ROW,
        repeatInsertType,
      });
      handleClose();
      if (result) openNotification('success', 'Events inserted successfully');
    } catch (error) {
      openNotification('danger', 'Something went wrong while inserting events');
      console.error(error);
    }
  };

  return (
    <Dialog
      isOpen={isDialogOpen}
      onClose={handleClose}
      onRequestClose={handleClose}
      width={'40%'}
      contentClassName={'mt-8'}
    >
      <div className="flex flex-col h-full">
        <h4 className="border-b border-b-gray-700 pb-2 mb-3">Repeat Insert</h4>
        <div className="max-h-[60vh] overflow-y-auto flex flex-col gap-6 pr-2 text-white">
          <Events />
          <div>
            <p className="text-sm mb-1">Insert Type</p>
            <Radio.Group
              value={repeatInsertType}
              onChange={setRepeatInsertType}
            >
              <Radio value={'sequentialInsert'} className="text-gray-300">
                Sequential Insert
              </Radio>
              <Radio value={'randomizeInsert'} className="text-gray-300">
                Randomize Insert
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="text-right mt-6">
          <Button variant="solid" onClick={handleRepeatInsert}>
            Insert
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default RepeatInsertDialog;
