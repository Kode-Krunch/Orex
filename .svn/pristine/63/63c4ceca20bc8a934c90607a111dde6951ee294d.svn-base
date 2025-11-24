import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  DatePicker,
  FormContainer,
  FormItem,
  Input,
} from 'components/ui';
import NTCTypeDrop from 'views/Controls/NTCTypeDrop';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import Table from 'components/ui/Table';
import { HiBackspace, HiOutlineX } from 'react-icons/hi';
import { InputText } from 'primereact/inputtext';
import { apiGetNTCtypedropdown } from 'services/NTCService';
import { apiGetChannelmasterdrop } from 'services/MasterService';
import dayjs from 'dayjs';
import {
  Postautoshufflepromo,
  apiautoshufflepromo,
  apipromomasterdropasperdate,
} from 'services/LibraryService';
import { StickyFooter } from 'components/shared';
import { convertDateToYMD } from 'components/validators';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import { hideStackedSideNav_secondary } from '../general';
import { AiOutlineSave } from 'react-icons/ai';

const PromoShuffleTemplatesAdd = ({
  TemplateName,
  setaddnew2,
  selectedpromaster,
  setSelectedpromaster,
  editData,
  setdata,
  setMessage,
  setaddnew,
  setTemplateName,
}) => {
  const { Content } = useSelector((state) => state.base.common);
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const token = useSelector((state) => state.auth.session.token);
  const { Tr, Th, Td, THead, TBody } = Table;

  const [NTCtype, setNTCtype] = useState([]);
  const [Channel, setChannel] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    'country.name': {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });
  const defaultChannel = useSelector((state) => state.locale.selectedChannel);

  const [formState, setFormState] = useState({
    ChannelCode: editData[0]?.value || defaultChannel.ChannelCode,
    LocationCode: editData[0]?.LocationCode || defaultChannel.LocationCode,
    FromDate: null,
    ToDate: null,
  });
  useEffect(() => {
    hideStackedSideNav_secondary();
  }, []);

  useEffect(() => {
    const fetchNTCtype = async () => {
      try {
        const response = await apiGetNTCtypedropdown(editData.TemplateNo);
        const formattedOptions = response.data.map((option) => ({
          value: option.NTCTypeCode,
          label: option.NTCTypeName,
        }));
        setNTCtype(formattedOptions);
      } catch (error) {
        console.error('Error fetching NTC Type data:', error);
      }
    };

    const fetchChannel = async () => {
      try {
        const response = await apiGetChannelmasterdrop(LoginId);
        const formattedOptions = response.data.map((option) => ({
          LocationCode: option.LocationCode,
          value: option.ChannelCode,
          label: option.ChannelName,
        }));
        setChannel(formattedOptions);
      } catch (error) {
        console.error('Error fetching channel data:', error);
      }
    };

    fetchNTCtype();
    fetchChannel();
  }, [editData.TemplateNo, LoginId]);

  const [promaster, setPromaster] = useState([]);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    if (/^[0-9a-zA-Z:\s]*$/.test(e.target.value)) {
      let _filters = { ...filters };
      _filters['global'].value = value;
      setFilters(_filters);
      setGlobalFilterValue(value);
    }
  };

  const handleInputChange = (value, name) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const apix = async () => {
    if (!formState.FromDate) {
      setMessage('Kndly Select From Date');
      setPromaster([]);
      return;
    }

    if (!formState.ToDate) {
      setMessage('Kndly Select To Date');
      setPromaster([]);
      return;
    }

    try {
      const fromDate = convertDateToYMD(formState.FromDate);
      const toDate = convertDateToYMD(formState.ToDate);
      const response = await apipromomasterdropasperdate(
        formState,
        fromDate,
        toDate,
      );
      setPromaster(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('Data Not Found');
      } else {
        setMessage('Server Error.');
      }
      setPromaster([]);
    }
  };

  const addApi = async () => {
    if (!formState.ChannelCode) {
      openNotification('info', 'Kndly select channel');
      return;
    }

    if (selectedpromaster.length === 0) {
      openNotification('info', 'Kndly select promo');
      return;
    }

    const mergedData = selectedpromaster.map((item) => ({
      TemplateNo: TemplateName,
      PromoCode: item.PromoCode,
      LocationCode: formState.LocationCode,
      ChannelCode: formState.ChannelCode,
      IsActive: 1,
    }));

    try {
      const response = await Postautoshufflepromo(mergedData, token);
      if (response.status === 200) {
        setaddnew2(false);
        setaddnew(false);
        setTemplateName('');
        setSelectedpromaster([]);
        const responseData = await apiautoshufflepromo({}); // Ensure to pass required values
        setdata(responseData.data);
      }
    } catch (error) {
      console.error('Error adding promo shuffle template:', error);
    }
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center">
      <div>
        <h4 className="m-0">
          Select Promo <span className="text-red-500">*</span>
        </h4>
      </div>
      <div>
        <InputwithVoice
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          size="sm"
          placeholder="Keyword Search"
        />
      </div>
    </div>
  );

  const minDate = dayjs(new Date(formState.FromDate))
    .subtract(0, 'day')
    .startOf('day')
    .toDate();

  const header = renderHeader();

  return (
    <>
      <Card>
        <FormContainer>
          <Card>
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-1">
                <FormItem label="Channel" asterisk>
                  <NTCTypeDrop
                    selected={formState.ChannelCode}
                    setSelected={setFormState}
                    List={Channel}
                    name="ChannelCode"
                    name2="LocationCode"
                    disabled={true}
                  />
                </FormItem>
              </div>

              <div className="col-span-1">
                <FormItem label="Template">
                  <Input disabled value={TemplateName} size="sm" />
                </FormItem>
              </div>
              <div className="col-span-1">
                <FormItem label="From Date">
                  <DatePicker
                    size="sm"
                    value={formState.FromDate}
                    onChange={(e) => handleInputChange(e, 'FromDate')}
                  />
                </FormItem>
              </div>
              <div className="col-span-1">
                <FormItem label="To Date">
                  <DatePicker
                    size="sm"
                    minDate={minDate}
                    value={formState.ToDate}
                    onChange={(e) => handleInputChange(e, 'ToDate')}
                  />
                </FormItem>
              </div>

              <div
                className="col-span-1"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <FormItem label=" ">
                  <Button size="sm" onClick={apix}>
                    Show
                  </Button>
                </FormItem>
              </div>
            </div>
          </Card>
        </FormContainer>
        <br />
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <Card>
              <DataTable
                value={promaster}
                selectionMode="checkbox"
                selection={selectedpromaster}
                filterDisplay="menu"
                globalFilterFields={[
                  'PromoCaption',
                  'VideoID',
                  'PromoDuration',
                ]}
                filters={filters}
                onSelectionChange={(e) => setSelectedpromaster(e.value)}
                dataKey="PromoCode"
                tableStyle={{ minWidth: '20rem' }}
                header={header}
                scrollable
                scrollHeight="400px"
              >
                <Column
                  selectionMode="multiple"
                  headerStyle={{ width: '1rem', height: '1rem' }}
                />
                <Column field="PromoCaption" header="Caption" />
                <Column field="PromoDuration" header="Promo Duration" />
                <Column field="VideoID" header="VideoID" />
              </DataTable>
            </Card>
          </div>
          <div className="col-span-1">
            <Card header="Selected Promos">
              <Table compact>
                <THead>
                  <Tr>
                    <Th>Caption</Th>
                    <Th>Duration</Th>
                    <Th>Video ID</Th>
                    <Th>Action</Th>
                  </Tr>
                </THead>
                <TBody>
                  {selectedpromaster.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.PromoCaption}</Td>
                      <Td>{item.PromoDuration}</Td>
                      <Td>{item.VideoID}</Td>
                      <Td>
                        <Button
                          size="xs"
                          onClick={() => {
                            const updatedItems = selectedpromaster.filter(
                              (itemx) => itemx.PromoCode !== item.PromoCode,
                            );
                            setSelectedpromaster(updatedItems);
                          }}
                        >
                          <HiOutlineX />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </Card>
          </div>
        </div>
      </Card>

      <StickyFooter
        className="-mx-8 px-8 flex items-center justify-between py-4"
        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        <div className="md:flex items-center">
          <Button
            icon={<HiBackspace />}
            size="sm"
            type="button"
            onClick={() => {
              setaddnew2(false);
              setaddnew(false);
              setTemplateName('');
              setSelectedpromaster([]);
            }}
          >
            Discard
          </Button>{' '}
          &nbsp;
          <Button
            onClick={addApi}
            variant="solid"
            size="sm"
            type="submit"
            icon={<AiOutlineSave />}
          >
            Save
          </Button>
        </div>
      </StickyFooter>
    </>
  );
};

export default PromoShuffleTemplatesAdd;
