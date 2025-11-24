import React, { useEffect, useState } from 'react';
import { Card, Button, Dialog } from 'components/ui';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import {
  convertDateFormat,
  FORMATDATE_FOR_EVERY,
  formatStartDate,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { useSelector } from 'react-redux';
import { PostFPCSaveAs } from 'services/ProgrammingService';
import { useNavigate } from 'react-router-dom';

const SaveAsFPC = () => {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [visible2, setVisible2] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dateFormat = 'DD MMM YYYY';
  useEffect(() => {
    // Get yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Get the date 7 days before yesterday
    const last7thDay = new Date();
    last7thDay.setDate(yesterday.getDate() - 6);

    // Format the dates as needed (e.g., YYYY-MM-DD)
    const formatDate = (date) => date.toISOString().split('T')[0];

    setDateRange({
      from: formatDate(last7thDay),
      to: formatDate(yesterday),
    });
  }, []);

  const handleDateChange = (newDates) => {
    const [newStartDate, newEndDate] = newDates;
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleSaveASFPC = async () => {
    console.log(startDate);

    const Params = {
      FromDate: formatStartDate(startDate),
      ToDate: formatStartDate(endDate),
      selectedWeekdays: ['0', '1', '2', '3', '4', '5', '6'],
      LocationCode: Channel.LocationCode,
      ChannelCode: Channel.ChannelCode,
      TelecastDate: formatStartDate(startDate),
    };
    console.log(Params);

    try {
      const resp = await PostFPCSaveAs(Params, token);
      if (resp.data.code === '200') {
        openNotification('success', 'FPC Saved successfully');
        setVisible2(false);
        return;
      } else {
        openNotification('danger', 'FPC Did Not Saved');
        setVisible2(false);
        return;
      }
    } catch (error) {
      openNotification('danger', 'FPC Did Not Saved');
      setVisible2(false);
    }
  };
  return (
    <Card header={<HeaderExtra />}>
      <h6>Please select the date range for which you want to save the FPC.</h6>
      <div className="w-2/5">
        <DatePickerRange
          placeholder="Select dates range"
          minDate={new Date()}
          value={[startDate, endDate]}
          onChange={handleDateChange}
          inputFormat={dateFormat}
          size="sm"
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-red-500">
            The FPC for the period from{' '}
            {FORMATDATE_FOR_EVERY(new Date(dateRange.from))} to{' '}
            {FORMATDATE_FOR_EVERY(new Date(dateRange.to))} will be saved
            according to the selected date range and save as rules.
          </p>
        </div>
        <div className="">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={() => navigate('/Programming')}
          >
            Back
          </Button>
          <Button variant="solid" onClick={() => setVisible2(true)}>
            Save
          </Button>
        </div>
      </div>
      <Dialog
        isOpen={visible2}
        onClose={() => setVisible2(false)}
        onRequestClose={() => setVisible2(false)}
      >
        <h5 className="mb-4">Confirm?</h5>
        <p>
          Are you sure want to Save As FPC for {FORMATDATE_FOR_EVERY(startDate)}{' '}
          to {FORMATDATE_FOR_EVERY(endDate)} ?
        </p>
        <div className="text-right mt-6">
          <Button onClick={() => setVisible2(false)} size="sm" className="mr-2">
            No
          </Button>

          <Button variant="solid" onClick={handleSaveASFPC} size="sm">
            Yes
          </Button>
        </div>
      </Dialog>
    </Card>
  );
};

export default SaveAsFPC;
