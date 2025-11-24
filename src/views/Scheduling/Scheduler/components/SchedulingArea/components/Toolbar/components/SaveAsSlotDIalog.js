import { Button, DatePicker, Dialog, Input, TimeInput } from 'components/ui';
import { convertDateToYMD } from 'components/validators';
import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineArrowRightAlt, MdOutlineDeleteForever, MdOutlineDeleteOutline } from 'react-icons/md';
import { PiArrowFatLinesRight } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import { getUniqueObjects, openNotification } from 'views/Controls/GLOBALFUNACTION';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { format } from 'date-fns';

const convertIntoDateobject = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);

    // Create a new Date object with the current date
    const dateObject = new Date();
    dateObject.setHours(hours);
    dateObject.setMinutes(minutes);
    dateObject.setSeconds(0); // Optionally, set seconds to 0
    dateObject.setMilliseconds(0); // Optionally, set milliseconds to 0
    return dateObject

}
function SaveAsSlotDIalog({ save_Slotvisible, setSave_Slotvisible }) {

    const channel = useSelector((state) => state.locale.selectedChannel);

    /* CONTEXT */
    const { schedulingTableData, date } = useContext(SchedulerContext);

    /* STATES */
    const [fpcTimes, setFpcTimes] = useState([]);
    const [newTimes, setNewTimes] = useState([]);
    const [selectedDate, setselectedDate] = useState(null);


    /* USE EFFECTS */
    useEffect(() => {
        if (Array.isArray(schedulingTableData)) {
            let uniqueFpcTimeRows = getUniqueObjects(schedulingTableData, 'FPC_Time');
            const fpcTimesONLY = uniqueFpcTimeRows
                .filter(item => item.FPC_Time !== '')
                .map(item => ({ FPC_Time: item.FPC_Time }));

            setFpcTimes(fpcTimesONLY);
            setNewTimes(fpcTimesONLY);
        }
    }, [schedulingTableData]);

    /* EVENT HANDLERS */
    const handleCopyFPCTimes = () => {
        if (fpcTimes.length > 0) {
            setNewTimes(fpcTimes.map(time => ({ ...time, newTime: convertIntoDateobject(time?.FPC_Time) })));
        }
    };
    const handleInputChange = (index, value) => {
        setNewTimes(prevTimes => {
            return prevTimes.map((time, i) => {
                if (i === index) {
                    return { ...time, newTime: value };
                }
                return time;
            });
        });
    };
    const handleFPCTimeMove = (index) => {
        setNewTimes(prevTimes => {
            return prevTimes.map((time, i) => {
                if (i === index) {
                    const newTime = convertIntoDateobject(time?.FPC_Time) || "00:00";
                    return { ...time, newTime };
                }
                return time;
            });
        });
    };
    const handleRemoveFPCTimeAll = () => {
        setNewTimes(prevTimes => {
            return prevTimes.map(time => {
                return { ...time, newTime: null };
            });
        });
    }
    const storeFPCSlotTime = async (FromTelecastTime, ToTelecastTime) => {
        try {
            const SaveAsSlot = await apiCallstoreprocedure('USP_Sch_SongSchedulingSaveAs', {
                LocationCode: channel.LocationCode,
                ChannelCode: channel.ChannelCode,
                FromTelecastDate: convertDateToYMD(date),
                ToTelecastDate: convertDateToYMD(selectedDate),
                FromTelecastTime: FromTelecastTime,
                ToTelecastTime: format(ToTelecastTime, 'HH:mm')
            });
            console.log(SaveAsSlot);
        } catch (error) {
            console.error('Error fetching storage details:', error);
        }
    };
    const processAllNewTimes = async (data) => {
        const itemsWithNewTime = data.filter(item => item.newTime);
        if (itemsWithNewTime.length === 0) {
            openNotification('warning', 'No newTime entries to process.')
            return;
        }
        await Promise.all(itemsWithNewTime.map(item => storeFPCSlotTime(item.FPC_Time, item.newTime)));
        openNotification('success', 'Save As Slot Wise Done Successfully')
    };

    return (
        <Dialog isOpen={save_Slotvisible} width={500} onClose={() => {
            setSave_Slotvisible(false);
            setselectedDate(null);
            handleRemoveFPCTimeAll()
        }}>
            <h6 className="pb-1 border-b border-b-gray-600 mb-3 text-white">
                Save As Slot Wise
            </h6>
            <div className='flex justify-between items-center mb-4 gap-2'>
                <div>
                    <p>From Date</p>
                    <DatePicker size='xs' value={date} disabled />
                </div>
                <div>
                    <p>To Date</p>
                    <DatePicker size='xs' value={selectedDate} placeholder="Select Date" onChange={setselectedDate} />
                </div>
            </div>
            <div className="pb-2 mb-2 pr-1 border-b border-b-gray-600 h-96 flex flex-col">
                <div className="grid grid-cols-12 gap-1 items-center mb-3 border-dashed border-b border-b-gray-600 pb-2">
                    <div className="font-semibold text-gray-200 text-md flex justify-center items-center col-span-5">FPC TIME</div>
                    <div className='flex justify-center items-center col-span-1'>
                        <Button variant="solid" size='xs' icon={<PiArrowFatLinesRight />} title="MOVE ALL TIME" onClick={handleCopyFPCTimes} />
                    </div>
                    <div className="font-semibold text-gray-200 text-md flex justify-center items-center col-span-5">NEW TIME </div>
                    <div className="font-semibold text-gray-200 text-xs flex justify-start items-center col-span-1">
                        <Button variant="twoTone" size='xs' icon={<MdOutlineDeleteForever />} title="REMOVE ALL TIME" onClick={handleRemoveFPCTimeAll} /></div>
                </div>
                <div className="grow overflow-auto no-scrollbar ">
                    {newTimes.length > 0 ? (
                        newTimes.map((time, index) => (
                            <div key={index} className="grid grid-cols-12 gap-1 items-center mb-3">
                                <div className='flex justify-center items-center col-span-5'>
                                    <Input value={time.FPC_Time} size="xs" disabled style={{ width: 110 }} />
                                </div>
                                <div className='flex justify-center items-center col-span-1'>
                                    <Button variant="twoTone" size='xs' icon={<MdOutlineArrowRightAlt />} title="MOVE TIME" onClick={() => handleFPCTimeMove(index)} />
                                </div>
                                <div className='flex justify-center items-center col-span-6'>
                                    <TimeInput

                                        size="xs"
                                        value={time.newTime}
                                        onChange={(e) => handleInputChange(index, e)}
                                        style={{ width: 110, marginLeft: 40 }}
                                    />
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-xs text-center mt-5">No data available. Click the button above.</p>
                    )}
                </div>
            </div>
            <div className="flex justify-end itmes-center w-full">
                <Button
                    size="sm"
                    className="w-max font-normal"
                    variant="twoTone"
                    style={{
                        fontSize: '0.8rem',
                        lineHeight: '1rem',
                    }}
                    onClick={() => { if (selectedDate) { processAllNewTimes(newTimes) } else { openNotification('warning', "Please Select Date ") } }}
                >
                    Apply
                </Button>
            </div>
        </Dialog>
    );
}

export default SaveAsSlotDIalog;
