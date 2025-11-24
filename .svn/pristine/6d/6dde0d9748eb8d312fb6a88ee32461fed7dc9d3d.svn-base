import { useState, useEffect, useMemo, useRef, forwardRef } from 'react';
import {
  Badge,
  Drawer,
  Input,
  Alert,
  FormItem,
  Checkbox,
  Radio,
  FormContainer,
} from 'components/ui';
import { MultiSelect } from 'primereact/multiselect';
import {
  apiGetContentmaster,
  apiGetContentTypemaster,
  apiGetFillertypemaster,
  apiGetfpccontent,
  apiGetfpcorgrepmaster,
  apiGetPatternmaster,
} from 'services/ProgrammingService';
import { Button, Card, Select } from 'components/ui';
import {
  HiOutlineFilter,
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiOutlineSearch,
  HiPlusCircle,
} from 'react-icons/hi';
// import { getProducts, initialTableData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import DisplayTable from 'views/Controls/DisplayTable';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import { Field, Formik } from 'formik';
import { Form, Link } from 'react-router-dom';
import { setFilterData } from 'views/crm/Customers/store/dataSlice';

import './fpccomman.css';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
const headerExtraContent = (
  openDrawer,
  DebouncedInput,
  globalFilter,
  setGlobalFilter,
  content,
) => { };

const FPCContents = () => {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const [isOpen, setIsOpen] = useState(false);
  const [slotduration, setslotduration] = useState('');
  const [editData, seteditData] = useState(['']);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [data, setdata] = useState(['']);
  const [currency, setCurrency] = useState([]);
  const [selectedContenttype, setSelectedContenttype] = useState(null);
  const [selectedorgrep, setSelectedorgrep] = useState(null);
  const [content, setcontent] = useState({
    value: '',
    label: '',
  });
  const [orgrep, setorgrep] = useState({
    value: '',
    label: '',
  });
  const [pattern, setpattern] = useState({
    value: '',
    label: '',
  });
  const [contenttype, setcontenttype] = useState({
    value: '',
    label: '',
  });
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };

  const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };
  const customStyles = {
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'red', // Change the remove (X) color to your preferred color
    }),
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const FilterForm = forwardRef(({ onSubmitComplete }, ref) => {
    const dispatch = useDispatch();
    const customStyles = {
      control: (base) => ({
        ...base,
        minHeight: '10px', // Adjust the height as needed
      }),
    };

    return (
      <>
        {' '}
        <div className="col-span-4 mb-1">
          <h6>Content/House ID</h6>
        </div>
        <div>
          <Input size="sm" placeholder="Search By Content" />
        </div>
        <div className="col-span-4 mt-2 mb-1">
          <h6>Search By Content Type</h6>
        </div>
        <MultiSelect
          value={selectedContenttype}
          onChange={(e) => setSelectedContenttype(e.value)}
          options={contenttype}
          optionLabel="label"
          filter
          placeholder="Select Content Type"
          maxSelectedLabels={3}
          className="w-full md:w-20rem"
          styles={customStyles}
        />
        <div>
          <style>
            {`
          /* Adjust the height as needed */
          .p-multiselect .p-multiselect-trigger,
          .p-multiselect .p-multiselect-trigger > .p-multiselect-label {
            height: 30px !important;
          }
        `}
          </style>
          <MultiSelect
            options={contenttype}
            placeholder=" fasdf Content Type"
          />
        </div>
      </>
    );
  });
  const columns = useMemo(
    () => [
      {
        header: 'Content ',
        accessorKey: 'ContentName',
      },
      {
        header: 'Slot Duration',
        accessorKey: 'SlotDuration',
      },
      {
        header: 'Episode No.',
        accessorKey: 'EpisodeNo',
      },
      {
        header: 'Season No.',
        accessorKey: 'SeasonNo',
      },
      {
        header: 'Actual Duration',
        accessorKey: 'ActualDuration',
      },
      // {
      //     header: 'Status',
      //     id: 'action',
      //     cell: (props) => {
      //         const row = props.row.original
      //         return (
      //             <div className="flex items-center">
      //                 <Badge className={statusColor[row.IsActive]} />
      //                 <span className="ml-2 rtl:mr-2 ">
      //                     {row.IsActive == 1 ? 'Active' : 'InActive'}
      //                 </span>
      //             </div>
      //         )
      //     },
      // },
    ],
    [],
  );
  useEffect(() => {
    (async (values) => {
      const Parameters = {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,
      };
      const resp = await apiGetContentmaster(values);
      const formattedOptions = resp.data.map((option) => ({
        value: option.ContentCode,
        label: option.ContentName,
      }));
      setcontent(formattedOptions);
    })();
    (async (values) => {
      const resp = await apiGetfpcorgrepmaster(values);
      const formattedOptions = resp.data.map((option) => ({
        value: option.OriginalRepeatCode,
        label: option.OriginalRepeatName,
      }));
      setorgrep(formattedOptions);
    })();
    (async (values) => {
      const resp = await apiGetPatternmaster(values);
      const formattedOptions = resp.data.map((option) => ({
        value: option.PatternCode,
        label: option.PatternName,
      }));
      setpattern(formattedOptions);
    })();
    (async (values) => {
      const resp = await apiGetfpccontent(values);
      const formattedOptions = resp.data.map((option) => ({
        value: option.PatternCode,
        label: option.PatternName,
      }));
      setpattern(formattedOptions);
    })();
    (async (values) => {
      const resp = await apiGetPatternmaster(values);
      const formattedOptions = resp.data.map((option) => ({
        value: option.PatternCode,
        label: option.PatternName,
      }));
      setpattern(formattedOptions);
    })();
    (async (values) => {
      const resp = await apiGetContentTypemaster(values);
      const formattedOptions = resp.data.map((option) => ({
        value: option.ContentTypeCode,
        label: option.ContentTypeName,
      }));
      setcontenttype(formattedOptions);
    })();
  }, []);
  // useEffect(()=>{//console.log(contenttype)},[contenttype])
  useEffect(() => {
    //console.log(selectedContenttype)
  }, [selectedContenttype]);
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = async (e, values) => {
    setIsOpen(false);
    const resp = await apiGetFillertypemaster(values);
    setdata(resp.data);
    seteditData(['']);
  };
  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 1500,
    ...props
  }) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);
    return (
      <div className="flex justify-end">
        <div className="flex items-center mb-4">
          <InputwithVoice
            {...props}
            value={value}
            onChange={(e) => {
              if (/^[0-9a-zA-Z\s]*$/.test(e.target.value)) {
                setValue(e.target.value);
              }
            }}
          />
        </div>
      </div>
    );
  }

  function timeToMilliseconds(time) {
    const [hours, minutes, seconds, frames] = time.split(':').map(parseFloat);
    return ((hours * 60 + minutes) * 60 + seconds) * 1000 + frames;
  }

  function millisecondsToTime(milliseconds) {
    const frames = String(milliseconds % 1000).padStart(2, '0');
    milliseconds = Math.floor(milliseconds / 1000);
    const seconds = String(milliseconds % 60).padStart(2, '0');
    milliseconds = Math.floor(milliseconds / 60);
    const minutes = String(milliseconds % 60).padStart(2, '0');
    const hours = String(Math.floor(milliseconds / 60)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${frames}`;
  }
  const handleChange = (event) => {
    const inputValue = event.target.value;
    // Remove non-digit characters
    const newValue = inputValue.replace(/\D/g, '');
    // Format the value as ##:##:##:##
    let formattedValue = '';
    for (let i = 0; i < Math.min(newValue.length, 7); i += 2) {
      if (i > 0) formattedValue += ':';
      formattedValue += newValue.substr(i, 2);
    }
    setslotduration(formattedValue);
  };
  // //console.log(log)
  return (
    <>
      <div className="grid grid-cols-6 md:grid-cols-6 gap-1">
        <div className="col-span-5"></div>
      </div>
      <br></br>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      {/* {log && (
                <Alert className="mb-4" type="success" showIcon>
                    {log}
                </Alert>
            )} */}
      <div>
        <div className="flex justify-end">
          <Drawer
            title="Filter"
            isOpen={isOpen}
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
            footer={
              <DrawerFooter
                onCancel={onDrawerClose}
                onSaveClick={formSubmit}
                BtnSaveTxt="Apply"
              />
            }
          >
            <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} />
          </Drawer>
        </div>
        <div className="grid grid-cols-6 md:grid-cols-6 gap-1">
          <div className="col-span-4">
            <Select
              placeholder="Please Select Content"
              options={content}
            ></Select>
          </div>
          <div className="col-span-2"></div>

          <div className="col-span-2">
            <Select placeholder="Season" options={content}></Select>
          </div>
          <div className="col-span-2">
            <Select placeholder="Episode" options={content}></Select>
          </div>
          <div className="col-span-2">
            <Select placeholder="Org/Rep" options={orgrep}></Select>
          </div>

          <div className="col-span-2">
            <Input
              size="sm"
              type="text"
              value={slotduration}
              placeholder="HH:MM:SS:FF"
              onChange={handleChange}
            />
          </div>

          <div className="col-span-3">
            <Select placeholder="Break Patt." options={pattern}></Select>
          </div>
        </div>

        <br></br>
        {/* <DisplayTable
                        data={data}
                        columns={columns}
                        sorting={sorting}
                        globalFilter={globalFilter}
                        setSorting={setSorting}
                        setGlobalFilter={setGlobalFilter}
                        seteditData={seteditData}
                        openDrawer={openDrawer}
                        ExportName={'FillerTypeMaster'}
                    /> */}
      </div>
    </>
  );
};

export default FPCContents;
