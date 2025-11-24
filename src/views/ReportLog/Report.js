import {
  Button,
  Card,
  DatePicker,
  Notification,
  Select,
  toast,
} from 'components/ui';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  apiGetChannelmasterdrop,
  apiGetMinutReport2,
  apiGetSp_PromoRotation,
  apiGetTxProgramReport,
} from 'services/MasterService';
import DisplayTablewithFilter from 'views/Controls/DisplayTablewithFilter';
import { components } from 'react-select';
import { HiCake, HiCheck } from 'react-icons/hi';
import { convertDateToYMD, validate } from 'components/validators';
import { ExportxlswithColor } from 'views/Controls/ExportxlswithColor';
import { apiGetPromotypedropdown } from 'services/SchedulingService';
import { apipromomasterdrop } from 'services/LibraryService';

const { Control } = components;

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
  return (
    <div
      className={`flex items-center justify-between p-2 ${
        isSelected
          ? 'bg-gray-100 dark:bg-gray-500'
          : 'hover:bg-gray-50 dark:hover:bg-gray-600'
      }`}
      {...innerProps}
    >
      <div className="flex items-center">
        {/* <Avatar shape="circle" size={20} src={data.imgPath} /> */}
        <img
          src={`data:image/png;base64,${data.imgPath}`}
          style={{
            height: '20px',
            width: '20px',
            borderRadius: 20,
          }}
        />
        <span className="ml-2 rtl:mr-2">{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};
const CustomControl = ({ children, ...props }) => {
  const selected = props.getValue()[0];

  return (
    <Control {...props}>
      &nbsp;&nbsp;
      {selected && (
        <img
          src={`data:image/png;base64,${selected.imgPath}`}
          style={{
            height: '20px',
            width: '20px',
            borderRadius: 20,
          }}
        />
      )}
      {children}
    </Control>
  );
};
const Report = () => {
  const [dealdata, setDealdata] = useState([]);
  const [dealdataCopy, setDealdataCopy] = useState([]);
  const [VisableColumns, setvisiablecolumns] = useState([]);
  const [selectedChannel, setselectedChannel] = useState({});
  const [selectedPromotype, setselectedPromotype] = useState({});
  const [selectedPromo, setselectedPromo] = useState({});
  const [Promotype, setPromotype] = useState([]);
  const [Promo, setPromo] = useState([]);

  const [StartDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);
  const openNotification = (mes, type) => {
    toast.push(
      <Notification
        title={type.charAt(0).toUpperCase() + type.slice(1)}
        type={type}
      >
        {mes}
      </Notification>,
    );
  };

  const LoginId = useSelector((state) => state.auth.session.LoginId);

  const [channelList, setchannelList] = useState([]);
  useEffect(() => {
    chenllist();
    PromotypeList();
    PromoMasterList();
  }, []);
  const chenllist = async () => {
    const resp = await apiGetChannelmasterdrop(LoginId);
    console.log(resp.data);
    const data = resp.data.map((item) => ({
      value: item.ChannelCode,
      label: item.LocationName + ' ' + item.ChannelName,
      ChannelCode: item.ChannelCode,
      LocationCode: item.LocationCode,
      ChannelName: item.ChannelName,
      ColorClass: 'bg-rose-500',
      LocationName: item.LocationName,
      imgPath: item.Channel_Image,
    }));
    setchannelList(data);
  };
  const PromotypeList = async () => {
    const resp = await apiGetPromotypedropdown(LoginId);
    console.log(resp.data);
    const data = resp.data.map((item) => ({
      value: item.PromoTypeCode,
      label: item.PromoTypeName,
    }));
    setPromotype(data);
  };
  const PromoMasterList = async () => {
    const resp = await apipromomasterdrop(LoginId);
    console.log(resp.data);
    const data = resp.data.map((item) => ({
      value: item.PromoCode,
      label: item.PromoCaption,
    }));
    setPromo(data);
  };

  const { title, Moduletitle } = useSelector((state) => state.auth.user);
  console.log(Moduletitle);
  console.log(title);
  const SubmitButton = async () => {
    console.log(selectedChannel);
    let resp = ''; // Initialize resp as an empty string

    try {
      switch (title) {
        case 'Minute to Minute':
          resp = await apiGetMinutReport2(selectedChannel, StartDate, EndDate); // Assign resp2 to resp
          break;
        case 'Program Report':
          resp = await apiGetTxProgramReport(
            selectedChannel,
            StartDate,
            EndDate,
          ); // Assign resp2 to resp
          break;
        case 'Promo Rotation':
          resp = await apiGetSp_PromoRotation(
            selectedChannel,
            StartDate,
            EndDate,
            selectedPromotype.value,
            selectedPromo.value,
          ); // Assign resp2 to resp
          break;

        default:
          break;
      }

      // Check if resp is not empty and its status is 200
      if (resp && resp.status === 200) {
        openNotification('Data Found', 'success');

        const convertIntegersToStrings = () => {
          return resp.data.map((item) => {
            const newItem = { ...item };
            Object.keys(newItem).forEach((key) => {
              if (typeof newItem[key] === 'number') {
                newItem[key] = newItem[key].toString();
              }
            });
            return newItem;
          });
        };

        const headers =
          resp.data.length > 0
            ? Object.keys(resp.data[0]).map((key, index) => ({
                header: key,
                name: key,
                code: key,
                width: 'auto',
                ScreenType: 'REPORT',
                Sequence: index,
                isvisible: true,
              }))
            : [];

        // Assuming you have these functions to set state
        setvisiablecolumns(headers);
        setDealdata(convertIntegersToStrings);
        setDealdataCopy(convertIntegersToStrings);

        return;
      }
    } catch (errors) {
      // Handle different error scenarios
      switch (errors.response.status) {
        case 404:
          openNotification('Data Not Found', 'danger');
          break;
        case 422:
          openNotification('Kindly Enter All Parameters', 'danger');
          break;
        case 500:
          openNotification('Server Error.', 'danger');
          break;
        default:
          break;
      }
    }
  };

  const handleExportToExcel = () => {
    ExportxlswithColor(
      false,
      false,
      0,
      0,
      true,
      dealdataCopy,
      'ProgramReports',
      VisableColumns,
      false,
    );
    return;
  };
  return (
    <Card>
      <h4>{title}</h4>
      <div style={{ height: '80vh' }}>
        {/* <DynamicTable data={data} /> */}
        <div className="grid grid-flow-col auto-cols-auto gap-2 mb-4 mt-2">
          <div className="col-span-2">
            <h6>Channel</h6>
            <Select
              options={channelList}
              components={{
                Option: CustomSelectOption,
                Control: CustomControl,
              }}
              value={channelList.filter(
                (option) => option.value === selectedChannel.value,
              )}
              onChange={(e) => setselectedChannel(e)}
            />
          </div>
          {title == 'Promo Rotation' && (
            <div className="col-span-2">
              <h6>Promo Type</h6>
              <Select
                options={Promotype}
                value={Promotype.filter(
                  (option) => option.value === selectedPromotype.value,
                )}
                onChange={(e) => setselectedPromotype(e)}
              />
            </div>
          )}
          {title == 'Promo Rotation' && (
            <div className="col-span-2">
              <h6>Promo </h6>
              <Select
                options={Promo}
                value={Promo.filter(
                  (option) => option.value === selectedPromo.value,
                )}
                onChange={(e) => setselectedPromo(e)}
              />
            </div>
          )}
          <div className="col-span-1">
            <h6>From Date</h6>
            <DatePicker
              size="sm"
              name="StartDate"
              prefix={<HiCake className="text-xl" />}
              Value={validate(StartDate) ? new Date(StartDate) : ''} // Set defaultValue to current date
              onChange={(date) => {
                setStartDate(convertDateToYMD(date));
              }}
            />
          </div>
          <div className="col-span-1">
            <h6>To Date</h6>
            <DatePicker
              size="sm"
              name="EndDate"
              prefix={<HiCake className="text-xl" />}
              Value={validate(EndDate) ? new Date(EndDate) : ''} // Set defaultValue to current date
              onChange={(date) => {
                setEndDate(convertDateToYMD(date));
              }}
            />
          </div>
          <Button className="mt-6" onClick={() => SubmitButton()}>
            Get Data
          </Button>
          <Button className="mt-6" onClick={() => handleExportToExcel()}>
            Export
          </Button>
        </div>
        <DisplayTablewithFilter
          data={dealdata}
          setData={setDealdata}
          dataCopy={dealdataCopy}
          setDataCopy={setDealdataCopy}
          visiablecolumns={VisableColumns}
        ></DisplayTablewithFilter>
      </div>
    </Card>
  );
};

export default Report;
