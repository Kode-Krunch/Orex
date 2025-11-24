import { useState, forwardRef, useEffect, } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Input,
  FormContainer,
  FormItem,
  Upload,
  Tooltip,
  Select,
  DatePicker,
} from 'components/ui';
import { PutContentsports, } from 'services/ProgrammingService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';
import { FcImageFile } from 'react-icons/fc';
import { GrClose } from 'react-icons/gr';
import { convertDateToYMD } from 'components/validators';
import { apiGetLocalEventMasterDropBySubGenre } from 'services/EventServices';

const DefaultImage = 'https://cloudbats.planetcast.in/download.jpg';

const validationSchema = Yup.object().shape({
  ContentName: Yup.string().min(1, 'Too Short!').max(50, 'Too Long!').required('Event Name Required'),
  LanguageCode: Yup.string().required('Language Required'),
  FPCReleaseDate: Yup.string().required('Event Start Date Required'),
  IsSubProgram: Yup.string().required('Sports Sub Type Required'),
  ContentKilldate: Yup.string().required('Event End Date Required'),
  SlotDuration: Yup.string().required('Duration Required'),
  SubGenreCode: Yup.string().required('Sport Type Required'),
  IsActive: Yup.boolean().required('Status Required'),
});



const EventEdit = forwardRef(({ onDrawerClose, editData, languages, subGenres }, ref) => {

  const { selectedChannel: channel, auth: { session: { token, Username } } } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [localevent, setLocalEvent] = useState([]);
  const [previewSource, setPreviewSource] = useState(editData?.Content_Image || '');
  const [showLanguagePanel, setShowLanguagePanel] = useState(false); // Default set false - vsiable false 

  useEffect(() => {
    if (editData?.ContentCode) {
      GetLocalEvent(editData?.SubGenreMaster?.SubGenreCode)
    }
  }, [editData])

  const handleAddSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ContentCode: editData?.ContentCode,
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
        FPCReleaseDate: convertDateToYMD(new Date(values.FPCReleaseDate)),
        ContentKilldate: convertDateToYMD(new Date(values.ContentKilldate)),
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
      };
      const response = await PutContentsports(payload, token, previewSource);
      if (response.status === 204) {
        openNotification('danger', 'Event Already Exists');
      } else if (response.status === 200) {
        openNotification('success', 'Event Updated Successfully');
        onDrawerClose(0, 0);
      }
    } catch (error) {
      openNotification('danger', error.response?.status === 500 ? 'Server Error' : 'Failed to add event');
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    const allowedFileType = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxFileSize = 5000000;
    if (!allowedFileType.includes(file[0].type)) return 'Please upload a .jpeg , .jpg or .png file!';
    if (file[0].size > maxFileSize) return 'Image cannot exceed 5MB!';
    return true;
  };

  const GetLocalEvent = async (SubGenreCode) => {
    const LocalEvent = await apiGetLocalEventMasterDropBySubGenre(SubGenreCode);
    const formattedOptions = LocalEvent.data.map((option) => ({
      value: option.LocalEventCode,
      label: option.LocalEventName,
    }));
    setLocalEvent(formattedOptions);
  }

  return (
    <div>

      <Loader showLoader={loading} />
      <Formik
        innerRef={ref}
        initialValues={{
          ContentCode: editData?.ContentCode || '',
          ContentName: editData?.ContentName || '',
          LanguageCode: editData?.Language?.LanguageCode || '',
          FPCReleaseDate: editData?.FPCReleaseDate || '',
          ContentKilldate: editData?.ContentKilldate || '',
          SlotDuration: editData?.SlotDuration || '',
          IsSubProgram: editData?.IsSubProgram || '',
          SubGenreCode: editData?.SubGenreMaster?.SubGenreCode || '',
          Content_Image: previewSource || '',
          IsActive: editData?.IsActive || false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          handleAddSubmit(values)
            .then(() => {
              resetForm();
              setSubmitting(false);
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem label="Event Name" asterisk invalid={errors.ContentName && touched.ContentName} errorMessage={errors.ContentName}>
                  <Field type="text" name="ContentName" placeholder="Event Name" component={Input} size="sm" maxLength={50} />
                </FormItem>
                <FormItem label="Duration (Mins)" asterisk invalid={errors.SlotDuration && touched.SlotDuration} errorMessage={errors.SlotDuration}>
                  <Field name="SlotDuration">
                    {({ field }) => (
                      <Input
                        size="sm"
                        placeholder="Duration"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^[0-9]*$/.test(value)) setFieldValue('SlotDuration', value.slice(0, 3));
                        }}
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem label="Event Start Date" asterisk invalid={errors.FPCReleaseDate && touched.FPCReleaseDate} errorMessage={errors.FPCReleaseDate}>
                  <Field name="FPCReleaseDate">
                    {({ field, form }) => (
                      <DatePicker
                        size="sm"
                        {...field}
                        value={values.FPCReleaseDate ? new Date(values.FPCReleaseDate) : null}
                        placeholder="Select Date"
                        onChange={(date) => form.setFieldValue('FPCReleaseDate', date)}
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem label="Event End Date" asterisk invalid={errors.ContentKilldate && touched.ContentKilldate} errorMessage={errors.ContentKilldate}>
                  <Field name="ContentKilldate">
                    {({ field, form }) => (
                      <DatePicker
                        size="sm"
                        {...field}
                        minDate={values.FPCReleaseDate ? new Date(values.FPCReleaseDate) : null}
                        value={values.ContentKilldate ? new Date(values.ContentKilldate) : null}
                        placeholder="Select Date"
                        onChange={(date) => form.setFieldValue('ContentKilldate', date)}
                      />
                    )}
                  </Field>
                </FormItem>
                {showLanguagePanel && (
                  <FormItem label="Language" asterisk invalid={errors.LanguageCode && touched.LanguageCode} errorMessage={errors.LanguageCode}>
                    <Field name="LanguageCode">
                      {({ field, form }) => (
                        <Select
                          {...field}
                          options={languages}
                          value={languages.find((opt) => opt.value === values.LanguageCode)}
                          onChange={(opt) => form.setFieldValue('LanguageCode', opt?.value)}
                          size="sm"
                        />
                      )}
                    </Field>
                  </FormItem>
                )}
                <FormItem label="Sport Type" asterisk invalid={errors.SubGenreCode && touched.SubGenreCode} errorMessage={errors.SubGenreCode}>
                  <Field name="SubGenreCode">
                    {({ field, form }) => (
                      <Select
                        {...field}
                        options={subGenres}
                        value={subGenres.find((opt) => opt.value === values.SubGenreCode)}
                        onChange={
                          (opt) => {
                            form.setFieldValue('SubGenreCode', opt?.value || '')
                            GetLocalEvent(opt?.value)
                          }
                        }
                        size="sm"
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem label="Sports Sub Type" asterisk invalid={errors.IsSubProgram && touched.IsSubProgram} errorMessage={errors.IsSubProgram}>
                  <Field name="IsSubProgram">
                    {({ field, form }) => (
                      <Select
                        {...field}
                        options={localevent}
                        value={localevent.find((opt) => opt.value === values.IsSubProgram)}
                        onChange={(opt) => form.setFieldValue('IsSubProgram', opt?.value)}
                        size="sm"
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem label="Event Image" invalid={errors.Content_Image && touched.Content_Image} errorMessage={errors.Content_Image}>
                  <Field name="Content_Image">
                    {({ field, form }) => (
                      <Upload
                        uploadLimit={1}
                        beforeUpload={beforeUpload}
                        showList={false}
                        onChange={(files) => {
                          const file = files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewSource(reader.result);
                              form.setFieldValue('Content_Image', file);
                            };
                            reader.readAsDataURL(file);
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
                                <img src={previewSource} alt="Preview" className="hover:opacity-80" style={{ height: '150px', width: 'auto' }} />
                              </Tooltip>
                              <Tooltip title="Remove Image" wrapperClass="absolute -top-3 -right-3">
                                <Button
                                  shape="circle"
                                  size="xs"
                                  type="button"
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
                                <p className="text-xs mt-1 opacity-60">Support: jpeg, jpg, png (Max 5MB)</p>
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
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default EventEdit;