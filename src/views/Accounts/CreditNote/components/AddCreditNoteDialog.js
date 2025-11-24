import { Button, Dialog, Radio, Select } from 'components/ui';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import { convertDateToYMD } from 'components/validators';
import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { IoMdArrowForward } from 'react-icons/io';
import { apiGetInvoice } from 'services/BillingService';
import { apiGetclientmasterdropmaster } from 'services/CreditcontrolService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

function AddCreditNoteDialog({
  isAddCNDialogOpen,
  setIsAddCNDialogOpen,
  noteType,
  setNoteType,
  setBills,
  setShowLoader,
  setCurPage,
  channel,
  loginId,
  token,
}) {
  /* STATES */
  const [clientList, setClientList] = useState([]);
  const [form, setForm] = useState({
    client: '',
    datesRange: [null, null],
  });

  /* USE EFFECTS */
  useEffect(() => {
    try {
      (async () => {
        if (isAddCNDialogOpen) {
          const response = await apiGetclientmasterdropmaster();
          if (response.status === 200) {
            let clientList = [];
            clientList = response.data.map((client) => ({
              label: client.ClientName,
              value: client.ClientCode,
            }));
            setClientList(clientList);
          } else if (response.status === 204) {
            openNotification('info', 'No clients found!');
          } else {
            openNotification(
              'error',
              `Something went wrong. Server responded with status code ${response.status}`,
            );
          }
        }
      })();
    } catch (error) {
      console.error(error);
    }
  }, [isAddCNDialogOpen]);

  /* EVENT HANDLERS */
  const handleDialogClose = () => {
    try {
      setClientList([]);
      setForm({
        client: '',
        datesRange: [null, null],
      });
      setIsAddCNDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!validateFields(form)) {
        return;
      }
      handleDialogClose();
      setShowLoader(true);
      let param = {
        loginCode: loginId,
        locationCode: channel.LocationCode,
        fromDate: convertDateToYMD(form.datesRange[0]),
        uptoDate: convertDateToYMD(form.datesRange[1]),
        channelCode: channel.ChannelCode,
        id: 4,
        filter: `${form.client}`,
      };
      let response = await apiGetInvoice(param, token);
      if (response.status === 200) {
        setBills(response.data);
        setCurPage('bills');
      } else if (response.status === 204) {
        setBills([]);
        setCurPage('bills');
      } else {
        openNotification(
          'danger',
          `Something went wrong. Server responded with status code ${response.status}.`,
          'Error',
        );
      }
      setShowLoader(false);
    } catch (error) {
      if ('message' in error) {
        openNotification('danger', `${error.message}`, 'Error');
      } else {
        openNotification('danger', `Something went wrong.`, 'Error');
      }
      setShowLoader(false);
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const validateFields = (form) => {
    try {
      if (noteType.value !== 1 && noteType.value !== 0) {
        openNotification('danger', 'Please select Credit/Debit note type!');
        return false;
      }
      if (form.client === '') {
        openNotification('danger', 'Please select client!');
        return false;
      }
      if (form.datesRange[0] === null || form.datesRange[1] === null) {
        openNotification('danger', 'Please select valid date range!');
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog
      isOpen={isAddCNDialogOpen}
      onClose={handleDialogClose}
      onRequestClose={handleDialogClose}
      closable={false}
    >
      <div className="flex justify-between relative items-center mb-4">
        <h5>Add Credit/Debit Note</h5>
        <Button
          shape="circle"
          variant="plain"
          icon={<GrClose className="text-gray-500" />}
          onClick={handleDialogClose}
          className="absolute -top-4 -right-4"
        />
      </div>
      <div>
        <div>
          <p className="text-white">
            Type <span className="text-red-500">*</span>
          </p>
          <Radio.Group
            value={noteType.value}
            onChange={(value) => {
              setNoteType({
                value: value,
                label: value === 1 ? 'Credit' : 'Debit',
              });
            }}
            className="mt-2"
          >
            <Radio value={1}>Credit</Radio>
            <Radio value={0}>Debit</Radio>
          </Radio.Group>
        </div>
        <div className="mt-4">
          <p className="text-white">
            Client <span className="text-red-500">*</span>
          </p>
          <Select
            placeholder="Select"
            className="mt-1 caret-white"
            size="sm"
            options={clientList}
            onChange={(option) => {
              setForm({ ...form, client: option?.value });
            }}
            name="client"
            autoFocus
            defaultMenuIsOpen
            closeMenuOnSelect
          />
        </div>
        <div className="mt-4">
          <p className="text-white">
            Dates Range <span className="text-red-500">*</span>
          </p>
          <DatePickerRange
            value={form.datesRange}
            onChange={(datesRange) => {
              setForm({ ...form, datesRange: datesRange });
            }}
            placeholder="Select"
            size="sm"
            className="mt-1"
            disabled={!form.client}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
            name="datesRange"
          />
        </div>
        <div className="text-right mt-8 flex gap-2 items-center justify-end">
          <Button variant="plain" onClick={handleDialogClose} className="!px-4">
            Cancel
          </Button>
          <Button
            variant="solid"
            disabled={
              (noteType.value != 0 && noteType.value != 1) ||
              !form.datesRange[0] ||
              !form.datesRange[1] ||
              !form.client
            }
            onClick={handleSubmit}
            icon={<IoMdArrowForward />}
            className="!px-4"
          >
            Get Bills
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default AddCreditNoteDialog;
