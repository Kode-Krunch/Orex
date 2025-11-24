import { useState, useEffect, useRef, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Input,
  FormContainer,
  FormItem,
  Card,
  Upload,
  Tooltip,
  Select,
  DatePicker,
  Steps,
} from 'components/ui';
import {
  PostContentNew,
  apiEventMasterCreate,
  apiEventMasterCreateNew,
  apiGetSubGenremasterDrop,
  apiGetTeamMasterDrop,
  apiGroupMasterGet,

} from 'services/ProgrammingService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { CLIENT } from 'views/Controls/clientListEnum';
import Loader from 'views/Controls/Loader';
import { FcImageFile } from 'react-icons/fc';
import { GrClose } from 'react-icons/gr';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import { StickyFooter } from 'components/shared';
import { apiGetLanguagemaster } from 'services/MasterService';
import { convertDateToYMD } from 'components/validators';
import { viewsEnum } from 'views/Programming/ManageEvents/enum';
import AddHeader from 'views/Programming/ManageEvents/components/AddHeader';
import Events from 'views/Programming/ManageEvents/components/Events';
import SelectEntityDialog from 'views/Programming/ManageEvents/components/SelectEntityDialog';
import axios from 'axios';
import WarningDialog from 'views/Controls/WarningDialog';
import { IoSaveOutline } from 'react-icons/io5';
import TeamMapping from 'views/Programming/ManageEvents/components/TeamMapping';
import {
  apiGetLocalEventMasterDrop,
  apiGetLocalEventMasterDropBySubGenre,
} from 'services/EventServices';
import { json } from 'd3-fetch';

const DefaultImage = 'https://cloudbats.planetcast.in/download.jpg';

const validationSchema = Yup.object().shape({
  ContentName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Event Name Required'),
  //LanguageCode: Yup.string().required('Language Required'),
  IsSubProgram: Yup.string().required('Sports Sub Type Required'),
  FPCReleaseDate: Yup.string().required('Event Start Date Required'),
  ContentKilldate: Yup.string().required('Event End Date Required'),
  SlotDuration: Yup.string()
    .matches(/^[0-9]+$/, 'Must be a number')
    .required('Duration Required'),
  SubGenreCode: Yup.string().required('Sport Type Required'),
  Content_Image: Yup.string().optional(),
});

const EventAddEdit = forwardRef((props, ref) => {
  const formikRef = useRef();
  const channel = useSelector((state) => state.locale.selectedChannel);
  const username = useSelector((state) => state.auth.session.Username);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState(DefaultImage);
  const [languages, setLanguages] = useState([]);
  const [localevent, setLocalEvent] = useState([]);
  const [subGenres, setSubGenres] = useState([]);
  const [eventOptions, setEventOptions] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEntityType, setSelectedEntityType] = useState('events');
  const [selectedEventGroup, setSelectedEventGroup] = useState('');
  const [eventGroupOptions, setEventGroupOptions] = useState([]);
  const [groupWiseSelectedEntities, setGroupWiseSelectedEntities] = useState(
    {},
  );
  const [isSelectEntityDialogOpen, setIsSelectEntityDialogOpen] =
    useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [clickedActionRowData, setClickedActionRowData] = useState(null);
  const [showLanguagePanel, setShowLanguagePanel] = useState(false); // Default set false - vsiable false

  const fetchLanguages = async () => {
    try {
      const response = await apiGetLanguagemaster();
      setLanguages(
        response.data.map((opt) => ({
          value: opt.LanguageCode,
          label: opt.LanguageName,
        })),
      );
    } catch (error) {
      openNotification('danger', 'Failed to fetch languages');
    }
  };

  const fetchSubGenres = async () => {
    try {
      const response = await apiGetSubGenremasterDrop(
        channel.LocationCode,
        channel.ChannelCode,
      );
      setSubGenres(
        response.data.map((opt) => ({
          value: opt.SubGenreCode,
          label: opt.SubGenreName,
        })),
      );
    } catch (error) {
      openNotification('danger', 'Failed to fetch subgenres');
    }
  };

  const generateDataForSave = () => {
    try {
      const channelMappings = [
        {
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
        },
      ];
      let data = {
        request: {
          EventName: selectedEvent?.ContentName || '',
          ContentCode: selectedEvent?.ContentCode || 0,
          IsActive: 1,
        },
        details: [],
        maping: channelMappings,
      };
      Object.keys(groupWiseSelectedEntities).forEach((group) => {
        groupWiseSelectedEntities[group].forEach((entity) => {
          data.details.push({
            GroupCode:
              eventGroupOptions.find(
                (eventGroup) => eventGroup.GroupName === group,
              )?.GroupCode || 0,
            TeamName: entity.TeamName,
            TeamCode: entity.TeamCode,
            IsActive: 1,
          });
        });
      });
      return data;
    } catch (error) {
      openNotification('danger', 'Failed to generate data for save');
      throw error;
    }
  };

  const GetLocalEvent = async (SubGenreCode) => {
    const LocalEvent = await apiGetLocalEventMasterDropBySubGenre(SubGenreCode);
    const formattedOptions = LocalEvent.data.map((option) => ({
      value: option.LocalEventCode,
      label: option.LocalEventName,
    }));
    setLocalEvent(formattedOptions);
  };

  useEffect(() => {
    fetchLanguages();
    fetchSubGenres();
  }, [channel]);

  useEffect(() => {
    if (selectedEvent && selectedEventGroup) {
      setIsSelectEntityDialogOpen(true);
    }
  }, [selectedEvent, selectedEventGroup]);

  const handleImageUpload = async (file) => {
    if (!file) return DefaultImage;
    if (channel.label !== CLIENT.MASST_INDIA) return URL.createObjectURL(file);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folderName', channel.ChannelName);
      const {
        data: { url },
      } = await axios.post('http://103.14.97.155:3050/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return url;
    } catch (error) {
      openNotification(
        'warning',
        error.response?.data.message || 'Image upload failed',
      );
      return DefaultImage;
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const payload = {
        content: {
          ContentName: values.ContentName,
          ShortName: '',
          ERPCode: '',
          ContentTypeCode: 25,
          ClassificationCode: 2,
          ViewCode: 9,
          //LanguageCode: values.LanguageCode,
          LanguageCode: values?.LanguageCode || '1',
          CensorshipCode: 7,
          BlackWhite: 1,
          InHouseOutHouse: 0,
          FPCReleaseDate: convertDateToYMD(values.FPCReleaseDate),
          ContentKilldate: convertDateToYMD(values.ContentKilldate),
          SlotDuration: Number(values.SlotDuration),
          Synopsis: '',
          GroupName: 1,
          IsSubProgram: values.IsSubProgram,
          IsEpRestriction: 0,
          IsRecorded: 0,
          AllowOverBooking: 0,
          IgnoreRODPSpots: 0,
          GenreCode: 6,
          SubGenreCode: values.SubGenreCode,
          AspectRatio: '1',
          SD: 0,
          HD: 0,
          UHD: 0,
          IsGeneric: 0,
          EPGContentName: values.ContentName,
          GenericSynopsis: '',
          ApprovedStatus: 1,
          AppRejRemark: '',
          Content_Image: previewSource,
          MetaData: '',
          TxMasterCode: 5,
          VideoTypeCode: 2,
          IsActive: 1,
          DefaultSegDur: '',
          DefaultSeg: 0,
          PromoCode: 0,
        },
        contenttxversion: [{ TxVersionCode: 5, IsActive: 1 }],
        contentepsrestriction: [],
        contentlocchnlmap: [
          {
            LocationCode: channel.LocationCode,
            ChannelCode: channel.ChannelCode,
            IsActive: 1,
          },
        ],
        cepsmapping: [
          { SeasonNo: 1, StartEpisode: 1, EndEpisodes: 1, IsActive: 1 },
        ],
        contentratings: [],
      };

      console.log('payload', payload);
      const response = await PostContentNew(payload);
      if (response.status === 204) {
        openNotification('danger', 'Event Already Exists');
      } else if (response.status === 200) {
        openNotification('success', 'Event Added Successfully');
        setStep(step + 1);
        const reps = [
          {
            ContentCode: response.data.ContentCode,
            ContentName: response.data.ContentName,
            AspectRatio: response.data.AspectRatio,
            ContentTypeCode: response.data.ContentTypeCode,
            IsSubProgram: response.data.IsSubProgram,
            value: response.data.ContentCode,
            label: response.data.ContentName,
          },
        ];
        setEventOptions(reps);
        setSelectedEvent(...reps);
        resetForm();
      }
    } catch (error) {
      openNotification(
        'danger',
        error.response?.status === 500 ? 'Server Error' : 'Failed to add event',
      );
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    const allowedFileType = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxFileSize = 5000000;
    if (!allowedFileType.includes(file[0].type))
      return 'Please upload a .jpeg or .png  or .jpg file!';
    if (file[0].size > maxFileSize) return 'Image cannot exceed 5MB!';
    return true;
  };

  const handleReset = () => {
    setSelectedEvent(null);
    setSelectedEntityType('');
    setSelectedEventGroup('');
    setGroupWiseSelectedEntities({});
    setIsSelectEntityDialogOpen(false);
    setEventGroupOptions([]);
    setPreviewSource(DefaultImage);
    formikRef.current?.resetForm();
    setIsResetDialogOpen(false);
  };

  const handleSave = async () => {
    if (!selectedEvent || Object.keys(groupWiseSelectedEntities).length === 0) {
      openNotification(
        'danger',
        'Please select an event and map entities before saving',
      );
      return;
    }
    setLoading(true);
    try {
      const data = generateDataForSave();
      const response = await apiEventMasterCreateNew(data);
      if (response.status === 200) {
        setClickedActionRowData({
          EventCode: response.data.EventCode,
          EventName: response.data.EventName,
          ContentMaster: {
            ContentCode: selectedEvent.ContentCode,
            ContentName: selectedEvent.ContentName,
          },
          IsActive: 1,
        });
        openNotification('success', 'Event added successfully');
        setStep(step + 1);
        handleReset();
      } else {
        openNotification(
          'danger',
          `Unable to add event. Server responded with status code ${response.status}`,
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail === 'Data already exists'
          ? 'Data already exists for selected event'
          : 'Something went wrong. Unable to add event';
      openNotification('danger', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onChangeStep = (nextStep) => {
    setStep(Math.max(0, Math.min(nextStep, steps.length - 1)));
  };

  const steps = [
    {
      title: 'Event Details',
      fields: [
        'ContentName',
        'SlotDuration',
        'FPCReleaseDate',
        'ContentKilldate',
        'LanguageCode',
        'SubGenreCode',
        'Content_Image',
      ],
    },
    { title: 'Manage Events', fields: [] },
    { title: 'Generate Matches', fields: [] },
    // { title: 'View Event', fields: [] },
  ];

  const renderStepContent = (step, values, errors, touched, setFieldValue) => {
    if (step !== 0) return null;
    return (
      <FormContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormItem
            label="Event Name"
            asterisk
            invalid={errors.ContentName && touched.ContentName}
            errorMessage={errors.ContentName}
          >
            <Field
              type="text"
              name="ContentName"
              placeholder="Event Name"
              component={Input}
              size="sm"
              maxLength={50}
            />
          </FormItem>
          <FormItem
            label="Duration (Mins)"
            asterisk
            invalid={errors.SlotDuration && touched.SlotDuration}
            errorMessage={errors.SlotDuration}
          >
            <Field name="SlotDuration">
              {({ field }) => (
                <Input
                  size="sm"
                  placeholder="Duration"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9]*$/.test(value))
                      setFieldValue('SlotDuration', value.slice(0, 3));
                  }}
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Event Start Date"
            asterisk
            invalid={errors.FPCReleaseDate && touched.FPCReleaseDate}
            errorMessage={errors.FPCReleaseDate}
          >
            <Field name="FPCReleaseDate">
              {({ field, form }) => (
                <DatePicker
                  size="sm"
                  {...field}
                  value={
                    values.FPCReleaseDate
                      ? new Date(values.FPCReleaseDate)
                      : null
                  }
                  placeholder="Select Date"
                  onChange={(date) =>
                    form.setFieldValue('FPCReleaseDate', date)
                  }
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Event End Date"
            asterisk
            invalid={errors.ContentKilldate && touched.ContentKilldate}
            errorMessage={errors.ContentKilldate}
          >
            <Field name="ContentKilldate">
              {({ field, form }) => (
                <DatePicker
                  size="sm"
                  {...field}
                  value={
                    values.ContentKilldate
                      ? new Date(values.ContentKilldate)
                      : null
                  }
                  placeholder="Select Date"
                  onChange={(date) =>
                    form.setFieldValue('ContentKilldate', date)
                  }
                />
              )}
            </Field>
          </FormItem>
          {showLanguagePanel && (
            <FormItem
              label="Language"
              asterisk
              invalid={errors.LanguageCode && touched.LanguageCode}
              errorMessage={errors.LanguageCode}
            >
              <Field name="LanguageCode">
                {({ field, form }) => (
                  <Select
                    {...field}
                    options={languages}
                    value={
                      languages.find(
                        (opt) => opt.value === values.LanguageCode,
                      ) || null
                    }
                    onChange={(opt) =>
                      form.setFieldValue('LanguageCode', opt?.value || '')
                    }
                    size="sm"
                  />
                )}
              </Field>
            </FormItem>
          )}
          <FormItem
            label="Sport Type"
            asterisk
            invalid={errors.SubGenreCode && touched.SubGenreCode}
            errorMessage={errors.SubGenreCode}
          >
            <Field name="SubGenreCode">
              {({ field, form }) => (
                <Select
                  {...field}
                  options={subGenres}
                  value={
                    subGenres.find(
                      (opt) => opt.value === values.SubGenreCode,
                    ) || null
                  }
                  onChange={(opt) => {
                    form.setFieldValue('SubGenreCode', opt?.value || '');
                    GetLocalEvent(opt?.value);
                    form.setFieldValue('IsSubProgram', '');
                  }}
                  size="sm"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Sports Sub Type"
            asterisk
            invalid={errors.IsSubProgram && touched.IsSubProgram}
            errorMessage={errors.IsSubProgram}
          >
            <Field name="IsSubProgram">
              {({ field, form }) => (
                <Select
                  {...field}
                  options={localevent}
                  value={
                    localevent.find(
                      (opt) => opt.value === values.IsSubProgram,
                    ) || null
                  }
                  onChange={(opt) =>
                    form.setFieldValue('IsSubProgram', opt?.value)
                  }
                  size="sm"
                />
              )}
            </Field>
          </FormItem>
          <FormItem
            label="Event Image"
            invalid={errors.Content_Image && touched.Content_Image}
            errorMessage={errors.Content_Image}
          >
            <Field name="Content_Image">
              {({ field, form }) => (
                <Upload
                  uploadLimit={1}
                  beforeUpload={beforeUpload}
                  showList={false}
                  onChange={(files) => {
                    const file = files[0];
                    if (file) {
                      handleImageUpload(file).then((url) => {
                        setPreviewSource(url);
                        form.setFieldValue('Content_Image', url);
                      });
                    } else {
                      setPreviewSource(DefaultImage);
                      form.setFieldValue('Content_Image', '');
                    }
                  }}
                >
                  <div className="border-dashed border-gray-500 border-2 p-3 rounded-lg hover:cursor-pointer">
                    {previewSource ? (
                      <div className="flex items-center justify-center relative">
                        <Tooltip title="Click to upload image">
                          <img
                            src={previewSource}
                            alt="Preview"
                            className="hover:opacity-80"
                            style={{ height: '150px', width: 'auto' }}
                          />
                        </Tooltip>
                        <Tooltip
                          title="Remove Image"
                          wrapperClass="absolute -top-3 -right-3"
                        >
                          <Button
                            shape="circle"
                            size="xs"
                            variant="solid"
                            color="red-500"
                            icon={<GrClose />}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewSource(DefaultImage);
                              form.setFieldValue('Content_Image', '');
                            }}
                          />
                        </Tooltip>
                      </div>
                    ) : (
                      <div className="h-28 flex flex-col items-center justify-center">
                        <Tooltip title="Click to upload image">
                          <FcImageFile size={25} />
                          <p className="text-xs mt-1 opacity-60">
                            Support: jpeg, jpg, png (Max 5MB)
                          </p>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                </Upload>
              )}
            </Field>
          </FormItem>
        </div>
      </FormContainer>
    );
  };

  return (
    <div className="p-4">
      <Loader showLoader={loading} />
      <Card className="mb-4">
        <Steps current={step}>
          {steps.map((s) => (
            <Steps.Item key={s.title} title={s.title} />
          ))}
        </Steps>
      </Card>
      {step === 0 ? (
        <Formik
          innerRef={formikRef}
          initialValues={{
            ContentName: '',
            LanguageCode: '',
            FPCReleaseDate: '',
            SlotDuration: '',
            SubGenreCode: '',
            Content_Image: '',
            IsSubProgram: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              {renderStepContent(step, values, errors, touched, setFieldValue)}
              <StickyFooter
                className="-mx-8 px-8 flex items-center justify-end py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <Button
                  size="sm"
                  type="button"
                  className="mr-3"
                  icon={<IoMdArrowRoundBack />}
                  disabled={step === 0}
                  onClick={() => onChangeStep(step - 1)}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="solid"
                  size="sm"
                  icon={
                    step === steps.length - 1 ? <IoMdArrowRoundForward /> : null
                  }
                  onClick={() => {
                    if (step === 0) formikRef.current?.submitForm();
                    else onChangeStep(step + 1);
                  }}
                >
                  {step === steps.length - 1 ? 'Submit' : 'Save and Next'}
                </Button>
              </StickyFooter>
            </Form>
          )}
        </Formik>
      ) : step === 1 ? (
        <div className="grow grid grid-cols-4 gap-4">
          <div className="col-span-4 pr-4 min-h-full flex flex-col">
            <div className="pb-6">
              <p className="text-slate-300 text-lg font-semibold mb-3">
                Map Events
              </p>

              <AddHeader
                curView={viewsEnum.ADD}
                eventOptions={eventOptions}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                selectedEventGroup={selectedEventGroup}
                setSelectedEventGroup={setSelectedEventGroup}
                eventGroupOptions={eventGroupOptions}
                setEventGroupOptions={setEventGroupOptions}
                groupWiseSelectedEntities={groupWiseSelectedEntities}
                setShowLoader={setLoading}
                isDisabledEventSelection={true}
              />
            </div>
            <div className="grow flex flex-col">
              <p className="text-slate-300 text-lg font-semibold mb-3">
                Mapped <span className="capitalize">{selectedEntityType}</span>
              </p>
              <div className="grow">
                <Events
                  groupWiseSelectedEntities={groupWiseSelectedEntities}
                  setGroupWiseSelectedEntities={setGroupWiseSelectedEntities}
                  selectedEntityType={selectedEntityType}
                  entityTypeCode={selectedEvent?.ContentTypeCode || 0}
                  setIsSelectEntityDialogOpen={setIsSelectEntityDialogOpen}
                  setSelectedEventGroup={setSelectedEventGroup}
                />
              </div>
            </div>
          </div>
          <SelectEntityDialog
            channel={channel}
            selectedEvent={selectedEvent}
            isSelectEntityDialogOpen={isSelectEntityDialogOpen}
            setIsSelectEntityDialogOpen={setIsSelectEntityDialogOpen}
            selectedEventGroup={selectedEventGroup}
            setSelectedEventGroup={setSelectedEventGroup}
            groupWiseSelectedEntities={groupWiseSelectedEntities}
            setGroupWiseSelectedEntities={setGroupWiseSelectedEntities}
            entityTypeCode={selectedEvent?.ContentTypeCode || 0}
            setShowLoader={setLoading}
          />
          <StickyFooter
            className="-mx-8 px-12 flex items-center justify-end py-4 mt-4 col-span-4"
            stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <div className="flex gap-3">
              <Button
                type="button"
                size="sm"
                disabled={
                  !selectedEvent ||
                  Object.keys(groupWiseSelectedEntities).length === 0
                }
                onClick={() => setIsResetDialogOpen(true)}
              >
                Reset
              </Button>
              <Button
                variant="solid"
                type="button"
                size="sm"
                icon={<IoSaveOutline />}
                onClick={handleSave}
                disabled={
                  !selectedEvent ||
                  Object.keys(groupWiseSelectedEntities).length === 0
                }
              >
                Save
              </Button>
            </div>
          </StickyFooter>
          <WarningDialog
            isDialogOpen={isResetDialogOpen}
            title="Reset"
            description="Are you sure you want to reset?"
            submitButtonTitle="Reset"
            handleDialogSubmit={handleReset}
            handleDialogClose={() => setIsResetDialogOpen(false)}
          />
        </div>
      ) : step === 2 ? (
        <TeamMapping
          channel={channel}
          resetPage={handleReset}
          eventDetails={clickedActionRowData}
          setShowLoader={setLoading}
          isHeaderVisible={false}
        />
      ) : (
        <div>Step {step + 1} content placeholder</div>
      )}
    </div>
  );
});

export default EventAddEdit;
