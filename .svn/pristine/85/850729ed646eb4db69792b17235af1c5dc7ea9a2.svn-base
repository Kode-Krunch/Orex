import {
  Alert,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Drawer,
  FormContainer,
  FormItem,
  Input,
  Switcher,
  Tooltip,
  Upload,
} from 'components/ui';
import React, { forwardRef, useEffect, useState, useRef } from 'react';
import ChannelSelecttion from 'views/Controls/ChannelSelecttion';
import PromoTypeDropNew from 'views/Controls/PromoTypeDropNew';
import { StickyFooter } from 'components/shared';
import {
  Postpromo,
  Putpromo,
  apiGetPromotypedropdown,
  apiGetTapetypedropdown,
} from 'services/SchedulingService';
import {
  apiGetChannelmasterdrop,
  apiGetLanguagemaster,
  apiGetcepsmapping,
  apiUSP_GenerateVideoID,
} from 'services/MasterService';
import {
  formatOnHHMMSSFFBlur,
  handleChangeWithFrameNew,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { apiGetContentmasterDrop, } from 'services/ProgrammingService';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import PromoTypeEdit from 'views/Programming/PromoTypeMaster/PromoTypeEdit';
import {
  HiCake,
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiPlusCircle,
} from 'react-icons/hi';
import DrawerFooter from 'views/Controls/DrawerFooter';
import { useNavigate } from 'react-router-dom';
import { convertDateToYMD, validate } from 'components/validators';
import dayjs from 'dayjs';
import { GrClose } from 'react-icons/gr';
import { FcImageFile } from 'react-icons/fc';
import { CLIENT } from 'views/Controls/clientListEnum';
import Loader from 'views/Controls/Loader';

const PromoMasterEdit = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { Content } = useSelector((state) => state.base.common);
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const IsChannelwise = Channel.label === CLIENT.USA_Forbes;
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useTimeOutMessage();
  const [showLoader, setshowLoader] = useState(false);
  const [log, setlog] = useState('');
  const [requiredFields, setRequiredFields] = useState({
    PromoTypeCode: false,
    PromoCaption: false,
    PromoDuration: false,
    LanguageCode: false,
    TCIN: false,
    TCOUT: false,
  });

  const [formState, setFormState] = useState({
    PromoCaption: Content.PromoCaption ? Content.PromoCaption : '',
    VideoID: Content.VideoID ? Content.VideoID : '',
    HouseID: Content.HouseID ? Content.HouseID : '',
    StartTime: Content.StartTime ? Content.StartTime : '',
    TCIN: Content.TCIN ? Content.TCIN : '00:00:00:00',
    TCOUT: Content.TCOUT ? Content.TCOUT : '00:00:',
    PromoDuration: Content.PromoDuration ? Content.PromoDuration : '',
    EndTime: Content.EndTime ? Content.EndTime : '',
    PromoTypeCode: Content.PromoTypeCode ? Content.PromoTypeCode : null,
    TapeID: Content.TapeID ? Content.TapeID : null,
    PromoPriority: Content.PromoPriorityCode ? Content.PromoPriorityCode : null,
    Priority: Content.PromoPriorityCode ? Content.PromoPriorityCode : null,
    LanguageCode: Content.LanguageCode ? Content.LanguageCode : null,
    ProgramCode: Content.ProgramCode ? Content.ProgramCode : null,
    SeasonNo: Content.SeasonNo ? Content.SeasonNo : null,
    epNo: '',
    IsDated: Content.IsDated ? Content.IsDated : false,
    EpisodeNo: Content.EpisodeNo ? Content.EpisodeNo : null,
    StartDate: Content.StartDate ? Content.StartDate : null,
    LongSynopsis: Content.LongSynopsis ? Content.LongSynopsis : '',
    ShortSynopsis: Content.ShortSynopsis ? Content.ShortSynopsis : '',
    KillDate: Content.KillDate ? Content.KillDate : null,
    SegmentNo: Content.SegmentNo ? Content.SegmentNo : null,
    EPGCaption: Content.EPGCaption ? Content.EPGCaption : '',
    IsActive: Content.IsActive ? Content.IsActive : 1,
    Promo_Image: Content.Promo_Image ? Content.Promo_Image : '',
  });
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const formattedValue = formatOnHHMMSSFFBlur(value, Number(ChannelSetting[0]?.FramePerSec || 24));
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: formattedValue,
    }));
  };
  useEffect(() => {
    // Convert input time to Date object

    const timeParts = formState.TCOUT.split(':');
    const dateObj = new Date();
    dateObj.setHours(parseInt(timeParts[0], 10));
    dateObj.setMinutes(parseInt(timeParts[1], 10));
    dateObj.setSeconds(parseInt(timeParts[2], 10));
    dateObj.setMilliseconds(parseInt(timeParts[3], 10));

    // Convert duration to milliseconds
    const durationParts = formState.TCIN.split(':');
    const durationMilliseconds =
      parseInt(durationParts[0], 10) * 3600000 +
      parseInt(durationParts[1], 10) * 60000 +
      parseInt(durationParts[2], 10) * 1000 +
      parseInt(durationParts[3], 10);

    // Subtract duration from input time
    dateObj.setMilliseconds(dateObj.getMilliseconds() - durationMilliseconds);

    // Format the result
    const result = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${dateObj
        .getSeconds()
        .toString()
        .padStart(2, '0')}:${dateObj
          .getMilliseconds()
          .toString()
          .slice(0, 2)
          .padStart(2, '0')}`;

    if (formState.TCOUT.length > 6) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        PromoDuration: result,
      }));
    }
  }, [formState.TCIN, formState.TCOUT]);
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const token = useSelector((state) => state.auth.session.token);
  const Username = useSelector((state) => state.auth.session.Username);
  const ChannelSetting = useSelector(
    (state) => state.auth.session.ChannelSetting,
  );
  // console.log(ChannelSetting)
  const formikRef = useRef();
  const formSubmit = () => {
    formikRef.current?.submitForm();
  };
  const toast = useRef(null);

  const [selectedchannel, setSelectedchannel] = useState(
    Content.details
      ? Content.details.map((item, index) => ({
        id: index,
        LocationCode: item.LocationCode,
        ChannelCode: item.ChannelCode,
      }))
      : [Channel].map((item, i) => ({
        id: i,
        LocationCode: item.LocationCode,
        ChannelName: item.label,
        ChannelCode: item.ChannelCode,
      })),
  );
  // console.log(Content)


  const [Checkboxcon, setCheckboxcon] = useState(formState.IsDated == 1);
  const [Checkboxcon2, setCheckboxcon2] = useState(
    formState.ProgramCode ? true : false,
  );
  const [Checkboxcon3, setCheckboxcon3] = useState(
    formState.IsActive ? true : false,
  );
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };
  const handleInputChange2 = (value, name) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };
  const [Language, setLanguage] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [promoType, setPromoType] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [episodeNo, setEpisodeNo] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [tapeType, setTapeType] = useState([]);
  const [editData, setEditData] = useState([]);
  const [autoFieldTure, setAutoFieldTure] = useState(0);
  const { ProgramCode, epNo } = formState;
  const fetchDropdowns = async () => {
    try {
      const [
        promoTypeResponse,
        contentResponse,
        tapeTypeResponse,
        languageResponse,
        channelResponse,
      ] = await Promise.all([
        apiGetPromotypedropdown(),
        apiGetContentmasterDrop(undefined, Channel.LocationCode, Channel.ChannelCode, 0),
        apiGetTapetypedropdown(),
        apiGetLanguagemaster(),
        apiGetChannelmasterdrop(LoginId),
      ]);

      setPromoType(
        promoTypeResponse.data.map((option) => ({
          value: option.PromoTypeCode,
          label: option.PromoTypeName,
        }))
      );

      setContentList(
        contentResponse.data.map((option) => ({
          value: option.ContentCode,
          label: option.ContentName,
        }))
      );

      setTapeType(
        tapeTypeResponse.data.map((option) => ({
          value: option.TapeTypeCode,
          label: option.TapeTypeName,
        }))
      );

      setLanguage(
        languageResponse.data.map((option) => ({
          value: option.LanguageCode,
          label: option.LanguageName,
        }))
      );

      setChannelList(
        channelResponse.data.map((channel, index) => ({
          id: index,
          ChannelName: channel.ChannelName,
          ChannelCode: channel.ChannelCode,
          LocationCode: channel.LocationCode,
          LocationName: channel.LocationName,
        }))
      );
    } catch (error) {
      console.error("Error fetching dropdowns:", error);
    }
  };
  const fetchSeasons = async () => {
    try {
      const response = await apiGetcepsmapping(ProgramCode, token);
      setSeasonList(
        response.data.map((option) => ({
          value: option.SeasonNo,
          label: option.SeasonNo,
          end: option.EndEpisodes,
        }))
      );
    } catch (error) {
      console.error("Error fetching seasons:", error);
      setSeasonList([]);
    }
  };
  const generateEpisodeList = () => {
    if (epNo) {
      const episodes = Array.from({ length: epNo }, (_, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString(),
      }));
      setEpisodeNo(episodes);
    }
  };
  const onDrawerClose = async () => {
    setIsOpen(false);
    try {
      const response = await apiGetPromotypedropdown();
      setPromoType(
        response.data.map((option) => ({
          value: option.PromoTypeCode,
          label: option.PromoTypeName,
        }))
      );
    } catch (error) {
      console.error("Error fetching promo types on drawer close:", error);
    }
    setEditData([""]);
  };

  useEffect(() => {
    fetchSeasons();
  }, [ProgramCode]);

  useEffect(() => {
    fetchDropdowns();
  }, []);

  useEffect(() => {
    generateEpisodeList();
  }, [epNo]);

  // console.log(ChannelSetting[0])
  const Promopriority = [
    { label: 'HIGH', value: 1 },
    { label: 'MEDIUM', value: 2 },
    { label: 'NO PRIORITY', value: 3 },
    ,
  ];
  const priority = [
    { label: 'HIGH', value: 1 },
    { label: 'MEDIUM', value: 2 },
    { label: 'LOW', value: 3 },
  ];
  const checkFieldsNotEmpty = (formState, requiredFields) => {
    const emptyFields = [];

    for (const field of requiredFields) {
      if (!formState[field]) {
        emptyFields.push(field);
      }
    }

    return emptyFields;
  };
  // Utility function to validate required fields
  const validateFormState = (formState, requiredFields) => {
    const emptyFields = checkFieldsNotEmpty(formState, Object.keys(requiredFields));
    console.log(emptyFields);

    if (formState.PromoDuration === '00:00:00:00') {
      return { isValid: false, message: 'Promo Duration cannot be zero.', emptyFields: [] };
    }
    if (emptyFields.length > 0) {
      return { isValid: false, message: 'Some required fields are empty.', emptyFields };
    }
    return { isValid: true, message: '', emptyFields: [] };
  };

  // Utility function to merge data
  const getMergedData = (formState, selectedChannel, isDated, isActive, extraData = {}) => ({
    PromoMaster: {
      ...formState,
      TapeID: toString(formState.TapeID),
      IsPaid: 1,
      IsDated: isDated ? 1 : 0,
      SupplierCode: 1,
      StartTime: formState.StartTime,
      EndTime: formState.EndTime,
      IsTAGPromo: 1,
      PromoPriorityCode: formState.PromoPriority,
      PromoPriority: formState.PromoPriority?.label || 'null',
      IsActive: isActive ? 1 : 0,
      Promo_Image: formState.Promo_Image || '',
    },
    Details: selectedChannel.map(({ LocationCode, ChannelCode }) => ({ LocationCode, ChannelCode })),
    ...extraData,
  });

  const validateAndPrepareData = (formState, selectedChannel, isDated, isActive, extraData) => {
    const validationResult = validateFormState(formState, requiredFields);
    if (!validationResult.isValid) {
      setMessage(validationResult.message);
      validationResult.emptyFields.forEach(field => {
        setRequiredFields(prev => ({ ...prev, [field]: true }));
      });
      return null;
    }
    return getMergedData(formState, selectedChannel, isDated, isActive, extraData);
  };

  const apiUpdate = async () => {
    setshowLoader(true);
    const mergedData = validateAndPrepareData(formState, selectedchannel, Checkboxcon, Checkboxcon3);
    if (!mergedData) {
      setshowLoader(false);
      return;
    }
    try {
      const resp = await Putpromo(mergedData, token, Content.PromoCode);
      const message = resp.status === 200 ? 'Data Updated Successfully' : 'Data Already Exist';
      openNotification(resp.status === 200 ? 'success' : 'warning', message);
      navigate(IsChannelwise ? '/Contentmasters' : '/PromoMaster');
      setAutoFieldTure(2);
    } catch {
      openNotification('danger', 'Server Error');
      setlog('error');
    } finally {
      setshowLoader(false);
    }
  };

  const apiAdd = async () => {
    setshowLoader(true);
    if (selectedchannel.length === 0) {
      setlog('danger');
      setMessage('Kindly Select Channel');
      setshowLoader(false);
      return;
    }

    const extraData = {
      GenvideoId: {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,
        FormName: 'Promo master',
        EventTypeCode: Number(formState.PromoTypeCode),
        Mode: 1,
      },
    };

    const mergedData = validateAndPrepareData(formState, selectedchannel, Checkboxcon, Checkboxcon3, extraData);
    if (!mergedData) {
      setshowLoader(false);
      return;
    }

    try {
      const resp = await Postpromo(mergedData, token, Username);
      const message = resp.status === 200 ? 'Data Inserted Successfully' : 'Data Already Exist';
      openNotification(resp.status === 200 ? 'success' : 'warning', message);
      navigate(IsChannelwise ? '/Contentmasters' : '/PromoMaster');
      setAutoFieldTure(2);
    } catch {
      openNotification('danger', 'Server Error');
    } finally {
      setshowLoader(false);
    }
  };

  const onCheck = (e) => {
    setCheckboxcon(!Checkboxcon);

  };
  const onCheck2 = (e) => {
    setCheckboxcon2(!Checkboxcon2);

  };
  const handleSwitcherChange = (value) => {
    setCheckboxcon3(!Checkboxcon3);
  };
  const handlePromoTypeChange = async (e) => {
    console.log('YES');

    if (Object.keys(Channel).length === 0) {
      setMessage("Kindly Select Global Channel");
      return;
    }

    if (ChannelSetting[0]?.IsTapeCounterFlag !== 1) {
      setMessage("IsTapeCounterFlag Is Not Configured With This Promo Type");
      return;
    }

    try {
      const resp = await apiUSP_GenerateVideoID(
        Channel.LocationCode,
        Channel.ChannelCode,
        "Promo master",
        e,
        0
      );
      const newHouseID = resp.data[0].CommVideoID;
      if (formState.HouseID !== newHouseID) {
        setMessage("HouseId Updated");
      }

      setFormState((prev) => ({
        ...prev,
        HouseID: newHouseID,
        VideoID: newHouseID,
      }));
    } catch (error) {
      console.error("Error generating video ID:", error);
      const errorMessage =
        error.response?.status === 500
          ? "Internal Server Error"
          : "HouseId Is Not Configured With This Promo Type";
      setMessage(errorMessage);

      setFormState((prev) => ({
        ...prev,
        HouseID: "",
        VideoID: "",
      }));
    }
  };
  const validateFields = () => {
    const updatedRequiredFields = Object.keys(formState).reduce((acc, field) => {
      acc[field] = !formState[field]; // true if the field is empty
      return acc;
    }, {});

    setRequiredFields(updatedRequiredFields);
  };
  useEffect(() => {
    if (autoFieldTure > 1) {
      validateFields();
    }
  }, [formState, autoFieldTure]);

  const beforeUpload = (fileList) => {
    const allowedFileTypes = ["image/jpeg", "image/png"];
    const MAX_FILE_SIZE = 500000;

    for (const file of fileList) {
      if (!allowedFileTypes.includes(file.type)) {
        return "Please upload a .jpeg or .png file!";
      }

      if (file.size >= MAX_FILE_SIZE) {
        return "Upload image cannot be more than 500KB!";
      }
    }

    return true;
  };
  const [previewSource, setPreviewSource] = useState('');
  return (
    <Card>
      <Loader showLoader={showLoader} />
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      <Toast ref={toast} />
      <div className="border-b-2 border-inherit mb-2">
        <h1 className="text-xl font-semibold">
          {IsChannelwise ? 'Content Master' : 'Promo Master'}
        </h1>
      </div>
      <FormContainer>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-4 ">
            <div className="grid grid-cols-12 gap-2 ">
              <div className="col-span-3">
                <FormItem
                  label={IsChannelwise ? 'Content Type' : 'Promo Type'}
                  asterisk
                  errorMessage={
                    requiredFields.PromoTypeCode ? 'Promo Type  Is Required' : null
                  }
                  invalid={requiredFields.PromoTypeCode && requiredFields.PromoTypeCode}
                >
                  <PromoTypeDropNew
                    selected={formState.PromoTypeCode}
                    setSelected={setFormState}
                    List={promoType}
                    name={'PromoTypeCode'}
                    handlePromoTypeChange={handlePromoTypeChange}
                    dis={Content.PromoCode}
                  />
                </FormItem>
              </div>
              <div className="col-span-1 mt-5 pt-2">
                <Tooltip
                  title={
                    IsChannelwise ? 'Add New Content Type' : 'Add New Promo Type'
                  }
                >
                  <Button
                    variant="solid"
                    size="sm"
                    icon={<HiPlusCircle />}
                    onClick={() => setIsOpen(true)}
                  ></Button>
                </Tooltip>
              </div>

              <div className="col-span-8">
                <FormItem
                  label="Caption"
                  asterisk
                  errorMessage={
                    requiredFields.PromoCaption ? 'Caption Is Required' : null
                  }
                  invalid={requiredFields.PromoCaption && requiredFields.PromoCaption}
                >
                  <Input
                    size="sm"
                    name="PromoCaption"
                    maxLength="99"
                    placeholder="Promo Caption"
                    value={formState.PromoCaption}
                    onChange={handleInputChange}
                  />
                </FormItem>
              </div>
              <div className="col-span-2">
                <FormItem
                  label="TC IN"
                  asterisk
                  errorMessage={
                    requiredFields.TCIN ? 'Kindly Enter TC IN' : null
                  }
                  invalid={requiredFields.TCIN && requiredFields.TCIN}
                >
                  <Input
                    size="sm"
                    placeholder="TC IN"
                    maxLength="12"
                    disabled
                    name="TCIN"
                    value={formState.TCIN}
                    onChange={(e) => handleChangeWithFrameNew(e, setFormState, Number(ChannelSetting[0]?.FramePerSec || 24))}
                    onBlur={handleBlur}
                  />
                </FormItem>
              </div>
              <div className="col-span-2">
                <FormItem
                  label="TC OUT"
                  asterisk
                  errorMessage={
                    requiredFields.TCOUT ? 'Kindly Enter TC OUT' : null
                  }
                  invalid={requiredFields.TCOUT && requiredFields.TCOUT}
                >
                  <Input
                    size="sm"
                    placeholder="TC OUT"
                    name="TCOUT"
                    maxLength="12"
                    value={formState.TCOUT}
                    onChange={(e) => handleChangeWithFrameNew(e, setFormState, Number(ChannelSetting[0]?.FramePerSec || 24))}
                    onBlur={handleBlur}
                  />
                </FormItem>
              </div>
              <div className="col-span-2">
                <FormItem
                  label="Duration"
                  asterisk
                  errorMessage={
                    requiredFields.PromoDuration ? 'Duration Is Required' : null
                  }
                  invalid={requiredFields.PromoDuration && requiredFields.PromoDuration}
                >
                  <Input
                    disabled
                    size="sm"
                    placeholder="HH:MM:SS:FF"
                    name="PromoDuration"
                    value={formState.PromoDuration}
                    onChange={(e) => handleChangeWithFrameNew(e, setFormState, Number(ChannelSetting[0]?.FramePerSec || 24))}
                  />
                </FormItem>
              </div>
              <div className="col-span-3">
                <FormItem label="Tape Type">

                  <PromoTypeDropNew
                    selected={formState.TapeID}
                    setSelected={setFormState}
                    List={tapeType}
                    name={'TapeID'}
                  />
                </FormItem>
              </div>
              <div className="col-span-3">
                <FormItem label="Sequence Priority">
                  <PromoTypeDropNew
                    selected={formState.PromoPriority}
                    setSelected={setFormState}
                    List={Promopriority}
                    name={'PromoPriority'}
                  />
                </FormItem>
              </div>
              <div className="col-span-3">
                <FormItem label="Priority">
                  <PromoTypeDropNew
                    selected={formState.Priority}
                    setSelected={setFormState}
                    List={priority}
                    name={'Priority'}
                  />
                </FormItem>
              </div>
              <div className="col-span-3">
                <FormItem
                  label="Language"
                  asterisk
                  errorMessage={
                    requiredFields.LanguageCode ? 'Language Is Required' : null
                  }
                  invalid={requiredFields.LanguageCode && requiredFields.LanguageCode}
                >
                  <PromoTypeDropNew
                    selected={formState.LanguageCode}
                    setSelected={setFormState}
                    List={Language}
                    name={'LanguageCode'}
                  />
                </FormItem>
              </div>
              <div className="col-span-3">
                <FormItem label="Video Id">
                  <Input
                    size="sm"
                    disabled={
                      ChannelSetting[0]?.IsTapeCounterFlag === 1 ? true : false
                    }
                    name="VideoID"
                    maxLength="100"
                    placeholder="VideoID"
                    value={formState.VideoID}
                    onChange={handleInputChange}
                  />
                </FormItem>
              </div>
              <div className="col-span-3">
                {/* {ChannelSetting[0]?.IsTapeCounterFlag ===
                                1 ? null : ( */}
                <FormItem label="House Id">
                  <Input
                    size="sm"
                    disabled={
                      ChannelSetting[0]?.IsTapeCounterFlag === 1 ? true : false
                    }
                    name="HouseID"
                    maxLength="100"
                    placeholder="HouseID"
                    value={formState.HouseID}
                    onChange={handleInputChange}
                  />
                </FormItem>
                {/* )} */}
              </div>
              <div className="col-span-12 flex item-center">
                <Checkbox checked={Checkboxcon2} onChange={(e) => onCheck2(e)}>
                  Is Program Specific
                </Checkbox>
                <Checkbox onChange={(e) => onCheck(e)} checked={Checkboxcon}>
                  Is Restriction
                </Checkbox>
                <div className="flex item-center">
                  <Switcher
                    checked={Checkboxcon3}
                    onChange={handleSwitcherChange}
                  />
                  <p className="ml-2">Status</p>
                </div>
              </div>
              {Checkboxcon2 ? (
                <div className="col-span-12">
                  <Card>
                    <div>
                      {/* <h1 className="text-xl font-semibold">
                                                Programs
                                            </h1> */}
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                      <div className="col-span-6">
                        <FormItem
                          label="Content Name"
                          errorMessage={
                            requiredFields.ProgramCode ? 'Required' : null
                          }
                          invalid={
                            requiredFields.ProgramCode && requiredFields.ProgramCode
                          }
                        >
                          <PromoTypeDropNew
                            selected={formState.ProgramCode}
                            setSelected={setFormState}
                            List={contentList}
                            name={'ProgramCode'}
                          />
                        </FormItem>
                      </div>
                      {/* <div className="col-span-6">
                        <Select
                          cacheOptions
                          loadOptions={loadOptions}
                          defaultOptions
                          onInputChange={handleInputChangex}
                          componentAs={AsyncSelect}
                        />
                      </div> */}

                      <div className="col-span-2">
                        <FormItem
                          label="Season No"
                          errorMessage={
                            requiredFields.SeasonNo ? 'Required' : null
                          }
                          invalid={
                            requiredFields.SeasonNo && requiredFields.SeasonNo
                          }
                        >
                          <PromoTypeDropNew
                            selected={formState.SeasonNo}
                            setSelected={setFormState}
                            List={seasonList}
                            name={'SeasonNo'}
                          // epNo={formState.epNo}
                          />
                        </FormItem>
                      </div>
                      <div className="col-span-2">
                        <FormItem
                          label="Episode No"
                          errorMessage={
                            requiredFields.EpisodeNo ? 'Required' : null
                          }
                          invalid={
                            requiredFields.EpisodeNo && requiredFields.EpisodeNo
                          }
                        >
                          {Content.EpisodeNo ? (
                            <Input
                              size="sm"
                              value={formState.EpisodeNo}
                              disabled
                            />
                          ) : (
                            <PromoTypeDropNew
                              selected={formState.EpisodeNo}
                              setSelected={setFormState}
                              List={episodeNo}
                              name={'EpisodeNo'}
                            />
                          )}
                        </FormItem>
                      </div>
                      <div className="col-span-2">
                        <FormItem
                          label="Segment No"
                          errorMessage={
                            requiredFields.SegmentNo ? 'Required' : null
                          }
                          invalid={
                            requiredFields.SegmentNo && requiredFields.SegmentNo
                          }
                        >
                          <Input
                            size="sm"
                            placeholder="Segment No"
                            type="number"
                            name="SegmentNo"
                            value={formState.SegmentNo}
                            onChange={handleInputChange}
                            disabled={formState.SegmentNo ? true : false}
                          />
                        </FormItem>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : null}
              <div className="col-span-6">
                <Card>
                  <div>
                    <h1 className="text-xl font-semibold">Captions</h1>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="col-span-3">
                      <FormItem label="EPG Detail">
                        <Input
                          size="sm"
                          placeholder=""
                          maxLength="99"
                          name="EPGCaption"
                          value={formState.EPGCaption}
                          onChange={handleInputChange}
                        />
                      </FormItem>
                    </div>
                    <div className="col-span-3 ">
                      <FormItem label="Short Synopsis">
                        <Input
                          size="sm"
                          value={formState.ShortSynopsis}
                          name="ShortSynopsis"
                          maxLength="255"
                          placeholder=""
                          onChange={(e) => handleInputChange(e)}
                        />
                      </FormItem>
                    </div>
                    <div className="col-span-3 ">
                      <FormItem label="LongSynopsis">
                        <Input
                          textArea
                          //size="sm"
                          name="LongSynopsis"
                          maxLength="500"
                          placeholder=""
                          value={formState.LongSynopsis}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </FormItem>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="col-span-6">

                <FormItem
                  label={IsChannelwise ? 'Content Image' : 'Promo Image'}
                >
                  <div style={{ display: 'grid' }}>
                    <Upload
                      uploadLimit={1}
                      beforeUpload={beforeUpload}
                      accept=".jpg, .jpeg, .png, .bmp, .svg"
                      showList={false}
                      onChange={(files) => {
                        const reader = new FileReader();
                        const file = files[0];
                        if (file && file.size > 0) {
                          reader.readAsDataURL(file);

                          reader.onloadend = () => {
                            setFormState((prevFormState) => ({
                              ...prevFormState,
                              Promo_Image: reader.result,
                            }));

                            setPreviewSource(reader.result);
                          };
                        } else {
                          setFormState((prevFormState) => ({
                            ...prevFormState,
                            Promo_Image: '',
                          }));
                          setPreviewSource('');
                        }
                      }}
                    >
                      <div className="border-dashed border-gray-500 border-2 p-3 rounded-lg w-full hover:cursor-pointer mt-1">
                        {previewSource ? (
                          <div className="flex items-center justify-center w-full">
                            <div className="relative">
                              <Tooltip title="Click to upload logo">
                                <img
                                  src={previewSource}
                                  style={{
                                    height: '150px',
                                    width: 'auto',
                                  }}
                                  alt="Preview"
                                  className="hover:opacity-80"
                                ></img>
                              </Tooltip>
                              <Tooltip
                                title="Remove Logo"
                                className="relative"
                                wrapperClass="absolute -top-3 -right-3"
                              >
                                <Button
                                  shape="circle"
                                  size="xs"
                                  variant="solid"
                                  color="red-500"
                                  icon={<GrClose />}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    setFormState((prevFormState) => ({
                                      ...prevFormState,
                                      Promo_Image: '',
                                    }));
                                    setPreviewSource('');
                                  }}
                                />
                              </Tooltip>
                            </div>
                          </div>
                        ) : (
                          <div className="h-28 flex items-center justify-center w-full">
                            <Tooltip
                              title="Click to upload logo"
                              wrapperClass="flex flex-col items-center justify-center"
                            >
                              <FcImageFile size={25} />
                              <p className="text-xs mt-1 opacity-60 dark:text-white">
                                Support: jpeg, png, bmp, svg
                              </p>
                              <p className=" text-xs mt-1 opacity-60 dark:text-white">
                                (Max 1MB)
                              </p>
                            </Tooltip>
                            {/* </Upload> */}
                          </div>
                        )}
                      </div>
                    </Upload>
                  </div>
                </FormItem>
                {Checkboxcon ? (
                  <div className="mt-2">
                    <div>
                      <h1 className="text-xl font-semibold">
                        Restriction Details
                      </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="col-span-1">
                        <FormItem
                          label="Start Date"
                          errorMessage={
                            requiredFields.StartDate ? 'Required' : null
                          }
                          invalid={
                            requiredFields.StartDate && requiredFields.StartDate
                          }
                        >
                          <DatePicker
                            size="sm"
                            name="StartDate"
                            prefix={<HiCake className="text-xl" />}
                            value={
                              validate(formState.StartDate)
                                ? new Date(formState.StartDate)
                                : ''
                            }
                            onChange={(date) => {
                              handleInputChange2(
                                convertDateToYMD(date),
                                'StartDate',
                              );
                              setFormState((prevFormState) => ({
                                ...prevFormState,
                                KillDate: null,
                              }));
                            }}
                          />
                        </FormItem>
                      </div>

                      <div className="col-span-1">
                        <FormItem
                          label="Kill Date"
                          errorMessage={
                            requiredFields.KillDate ? 'Required' : null
                          }
                          invalid={
                            requiredFields.KillDate && requiredFields.KillDate
                          }
                        >
                          <DatePicker
                            size="sm"
                            name="KillDate"
                            // prefix={<HiCake className="text-xl" />}
                            minDate={dayjs(new Date(formState.StartDate))
                              .subtract(0, 'day')
                              .startOf('day')
                              .toDate()}
                            value={
                              validate(formState.KillDate)
                                ? new Date(formState.KillDate)
                                : ''
                            }
                            onChange={(date) => {
                              handleInputChange2(
                                convertDateToYMD(date),
                                'KillDate',
                              );
                            }}
                          />
                        </FormItem>
                      </div>

                      {/* <div className="col-span-1 ">
                        <FormItem
                          label="Start Time"
                          errorMessage={
                            requiredFields.StartTime ? 'Required' : null
                          }
                          invalid={
                            requiredFields.StartTime && requiredFields.StartTime
                          }
                        >
                          <Input
                            size="sm"
                            name="StartTime"
                            value={formState.StartTime}
                            onChange={(e) =>
                              handleChangeWithOutFrameNewPro(e, setFormState)
                            }
                            onBlur={handleBlur}
                          />
                        </FormItem>
                      </div>
                      <div className="col-span-1 ">
                        <FormItem
                          label="End Time"
                          errorMessage={
                            requiredFields.EndTime ? 'Required' : null
                          }
                          invalid={
                            requiredFields.EndTime && requiredFields.EndTime
                          }
                        >
                          <Input
                            size="sm"
                            value={formState.EndTime}
                            name="EndTime"
                            onChange={(e) =>
                              handleChangeWithOutFrameNewPro(e, setFormState)
                            }
                            onBlur={handleBlur}
                          />
                        </FormItem>
                      </div> */}
                    </div>
                  </div>
                ) : null}
              </Card>
            </div>
          </div>
          <div className="col-span-1">
            <Card>
              <ChannelSelecttion
                List={channelList}
                selectedList={selectedchannel}
                setSelectedList={setSelectedchannel}
              />
            </Card>
          </div>
        </div>
      </FormContainer>
      <StickyFooter
        className="-mx-8 px-8 flex items-center justify-between py-4"
        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        <div className="md:flex items-center">
          {Content.PromoCode ? (
            <Button variant="solid" type="submit" onClick={() => apiUpdate()}>
              Update
            </Button>
          ) : (
            <Button variant="solid" type="submit" onClick={() => apiAdd()}>
              Submit
            </Button>
          )}
          &nbsp;
          <Button
            type="button"
            onClick={() =>
              navigate(IsChannelwise ? '/Contentmasters' : '/PromoMaster')
            }
          >
            Discard
          </Button>
        </div>
      </StickyFooter>

      <Drawer
        title={
          editData.PromoTypeName ? (
            <p className="text-xl font-medium  flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePencil />}
                ></Button>
              </center>
              &nbsp;&nbsp;PromoType Master
            </p>
          ) : (
            <p className="text-xl font-medium  flex ">
              <center>
                <Button
                  size="xs"
                  variant="twoTone"
                  icon={<HiOutlinePlusCircle />}
                ></Button>
              </center>
              &nbsp;&nbsp;PromoType Master
            </p>
          )
        }
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        width={600}
        footer={
          <DrawerFooter onCancel={onDrawerClose} onSaveClick={formSubmit} />
        }
      >
        <PromoTypeEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          setMessage={setMessage}
          setlog={setlog}
        />
      </Drawer>
    </Card>
  );
});

export default PromoMasterEdit;
