import { Checkbox } from 'components/ui';
import React, { useContext } from 'react';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { getBreaks } from '../../../utils';

function Breaks({
  selectedBreaks,
  setSelectedBreaks,
  isSkipLastBreak,
  setIsSkipLastBreak,
  isOnlyLastBreak,
  setIsOnlyLastBreak
}) {
  /* CONTEXT */
  const { schedulingTableData } = useContext(SchedulerContext);

  /* CONSTANTS */
  const breaks = getBreaks(schedulingTableData);

  /* EVENT HANDLERS */
  const handleAllBreakSelection = (value) => {
    if (value) {
      setSelectedBreaks(breaks.map((curBreak) => curBreak.value));
      setIsOnlyLastBreak(false)
    }
    else setSelectedBreaks([]);
  };

  return (
    <>
      <div>
        <div className="text-sm mb-1 flex justify-between items-center">
          <span>Breaks</span>
          <Checkbox
            onChange={handleAllBreakSelection}
            className="text-gray-200"
            checked={selectedBreaks.length === breaks.length}
          >
            All Breaks
          </Checkbox>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <Checkbox.Group value={selectedBreaks} onChange={(value) => {
            setSelectedBreaks(value);
            setIsOnlyLastBreak(false)
          }}>
            {breaks.map((breakItem) => (
              <Checkbox className="text-gray-200" value={breakItem.value}>
                {breakItem.value}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      </div>
      <div className='flex gap-4'>
        <Checkbox
          checked={isSkipLastBreak}
          onChange={() => {
            setIsSkipLastBreak(!isSkipLastBreak);
            if (!isSkipLastBreak) {
              setIsOnlyLastBreak(false)
            }
          }}
          className="text-gray-300"
        >
          Skip Last Break
        </Checkbox>
        <Checkbox
          checked={isOnlyLastBreak}
          onChange={() => {
            setIsOnlyLastBreak(!isOnlyLastBreak)
            if (!isOnlyLastBreak) {
              setIsSkipLastBreak(false)
              setSelectedBreaks([])
            }
          }}
          className="text-gray-300"
        >
          Only Last Break
        </Checkbox>
      </div>
    </>
  );
}

export default Breaks;
