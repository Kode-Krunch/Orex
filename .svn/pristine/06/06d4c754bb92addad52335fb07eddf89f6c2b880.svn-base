import {
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
  DatePicker,
  FormItemcompact,
  Card,
  Alert,
  Dialog,
  Upload,
  Tooltip,
  FormItem,
} from 'components/ui';
import { apiGetLanguagemaster } from 'services/MasterService';
import { Field, Form, Formik } from 'formik';
import CreatableSelect from 'react-select/creatable';
import {
  PutContent,
  apiGetContentTypemaster,
  apiGetCensorshipmaster,
  apiGetGenremaster,

  apiGetTXVersionmasterDrop,
  PutTxcode,
  apiGetContentmaster,
  apiGetFPCDTATUSED,
  apiGetviewmasterdrop,
  apiGetSuppliermaster,
  Putcontentsuppliermap,
  apiGetSubGenremasterDrop,
} from 'services/ProgrammingService';

import { useDispatch, useSelector } from 'react-redux';
import { HiCake } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import { headerExtraContent } from 'views/Controls/HeaderBox';
import Index from 'views/MovieShowPage/Index';
import { FcImageFile } from 'react-icons/fc';
import { setDialogbox } from 'store/base/commonSlice';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { convertDateToYMD, validate } from 'components/validators';
import { GrClose } from 'react-icons/gr';
import { CLIENT } from 'views/Controls/clientListEnum';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { apiCallstoreprocedure } from 'services/CommonService';
import axios from 'axios';

const options2 = [
  { value: 1, label: 'EPISODIC' },
  { value: 2, label: 'NONEPISODIC' },
];

const ContentDemo = [{ value: '', label: 'Data Not Found' }];
let DefaultImage = 'https://cloudbats.planetcast.in/download.jpg'
const ContentEditDialogbox = ({ GetContents }) => {
  const dispatch = useDispatch();
  const { Content } = useSelector((state) => state.base.common);

  const { TXCode } = useSelector((state) => state.base.common);
  const path = useSelector((state) => state.base.common.Path);
  const [SupplierList, setSupplierList] = useState([]);
  const [ContentType, setContentType] = useState([]);
  const [options3, setoptions3] = useState([]);
  const currentHref = window.location.href; // Get the full URL
  const hashPart = currentHref.split('#')[1];
  const [Language, setLanguage] = useState([]);
  const [Genre, setGenre] = useState([]);
  const [SubGenre, setSubGenre] = useState([]);
  const [TXVersion, setTXVersion] = useState([]);
  const [Censorship, setCensorship] = useState([]);
  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const [globalFilter, setGlobalFilter] = useState('');
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [dialogIsOpen2, setdialogIsOpen2] = useState(false);
  const [first, setfirst] = useState(['']);
  const [eroroshwo, seteroroshwo] = useState('');
  console.log(dialogIsOpen2);
  const token = useSelector((state) => state.auth.session.token);
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const Username = useSelector((state) => state.auth.session.Username);
  console.log(Channel)
  const IsChannelWise = CLIENT.USA_Forbes == Channel.label
  const [parentingDetails, setParentingDetails] = useState({});

  const EditContent = async (values, token) => {
    if (!values.IsActive) {
      try {
        const resp = await apiGetFPCDTATUSED(values.ContentCode);
        if (resp.status === 200) {
          setdialogIsOpen2(resp.data);
        }
      } catch (error) {
        APISEND(values);
      }
      return;
    } else {
      APISEND(values);
    }

    // APISEND(values)
  };

  const APISEND = async (values) => {

    if (values.Content_Image && Channel.label == CLIENT.MASST_INDIA) {
      const formData = new FormData();
      formData.append("image", values.Content_Image);
      formData.append("folderName", Channel.ChannelName);

      try {
        const response = await axios.post("http://103.14.97.155:3050/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log("Upload successful:", response.data.url);
        DefaultImage = response.data.url;

      } catch (error) {
        openNotification('warning', error.response?.data.message || 'Image upload failed');
        return; // exit early on error
      }

    }

    if (values.InHouse && values.SupplierName.length === 0) {
      openNotification('danger', 'Kindly Enter Supplier Name');
      return;
    }
    if (Channel.label !== CLIENT.MASST_INDIA) {
      DefaultImage = values.Content_Image;
    }

    try {
      // Update content
      const resp = await PutContent(values, token, DefaultImage);

      // Update TXCode if TxTypeName is not 0
      if (values.TxTypeName !== 0) {
        await PutTxcode(values.TxTypeName, values.ContentCode, token);
      }

      // Update Supplier if TxTypeName is not 0
      console.log('values*', values,)
      if (values.SupplierName.length !== 0) {
        await Putcontentsuppliermap(values.SupplierName, values.ContentCode, token);
      }

      // Handle response status
      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Updated Successfully');
      } else if (resp.status === 204) {
        setlog('warning');
        setMessage('Data Already Exist');
      }

      if (path == '/EventTeamPlaner') {
        GetContents(1);
      } else {
        GetContents(0);

      }
      setTimeout(() => dispatch(setDialogbox(false)), 500);

    } catch (error) {
      // Handle server error
      if (error.response?.status === 500) {
        setlog('danger');
        setMessage('Server Error.');
      } else {
        console.error("Unexpected error:", error); // Log unexpected errors
      }
      setTimeout(() => dispatch(setDialogbox(false)), 500);
    }
  };


  const onDialogClose = (e, values) => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async (values) => {
      const view = await apiGetviewmasterdrop(values);
      const formattedOptions = view.data.map((option) => ({
        value: option.ViewCode,
        label: option.ViewName,
      }));
      setoptions3(formattedOptions);
    })();
    (async (values) => {
      const Content = await apiGetContentTypemaster(values);
      const formattedOptions = Content.data.map((option) => ({
        value: option.ContentTypeCode,
        label: option.ContentTypeName,
      }));
      setContentType(formattedOptions);
    })();
    (async (values) => {
      const TXVersion = await apiGetTXVersionmasterDrop(values);
      const formattedOptions = TXVersion.data.map((option) => ({
        value: option.TXVersionCode,
        label: option.TXVersionName,
      }));
      setTXVersion(formattedOptions);
    })();

    (async (values) => {
      const supplierResponse = await apiGetSuppliermaster(values);
      const formattedOptions = supplierResponse.data.map((option) => ({
        value: option.SupplierCode,
        label: option.SupplierName,
      }));
      setSupplierList(formattedOptions);
    })();

    (async (values) => {

      const parentingDetails = await apiCallstoreprocedure('USP_GetPromosListusingPromotype', {
        ChannelCode: '19',
        LocationCode: '1',
        PromoTypeCode: '19',
      });

      if (
        parentingDetails &&
        Array.isArray(parentingDetails.data) &&
        parentingDetails.data.length > 0
      ) {

        const parentingOptions = parentingDetails.data
          .sort((a, b) => a.PromoCaption.localeCompare(b.PromoCaption))
          .map((option) => ({
            value: option.PromoCode,
            label: option.PromoCaption,
          }));

        setParentingDetails(parentingOptions)
      }

    })();

    (async (values) => {
      const Language = await apiGetLanguagemaster(values);
      const formattedOptions = Language.data.map((option) => ({
        value: option.LanguageCode,
        label: option.LanguageName,
      }));
      setLanguage(formattedOptions);
    })();
    (async (values) => {
      const Censorship = await apiGetCensorshipmaster(values);
      const formattedOptions = Censorship.data.map((option) => ({
        value: option.CensorshipCode,
        label: option.CensorshipName,
      }));
      setCensorship(formattedOptions);
    })();
    (async (values) => {
      const Genre = await apiGetGenremaster(values);
      const formattedOptions = Genre.data.map((option) => ({
        value: option.GenreCode,
        label: option.GenreName,
      }));
      setGenre(formattedOptions);
    })();
    (async (values) => {
      const SubGenre = await apiGetSubGenremasterDrop(Channel.LocationCode, Channel.ChannelCode);
      const formattedOptions = SubGenre.data.map((option) => ({
        value: option.SubGenreCode,
        label: option.SubGenreName,
      }));
      setSubGenre(formattedOptions);
    })();
  }, []);

  const beforeUpload = (file, fileList) => {
    let valid = true;

    const allowedFileType = ['image/jpeg', 'image/png'];
    const MAX_FILE_SIZE = 5000000;

    if (file) {
      for (const f of file) {
        if (!allowedFileType.includes(f.type)) {
          valid = 'Please upload a .jpeg or .png file!';
        }

        if (f.size >= MAX_FILE_SIZE) {
          valid = 'Uploaded image cannot more than 500kb!';
        }
      }
    }

    return valid;
  };

  const [previewSource, setPreviewSource] = useState(
    Content.Content_Image ? Content.Content_Image : '',
  );
  // console.log(previewSource);
  return (
    <div>
      <Dialog
        isOpen={dialogIsOpen}
        width={800}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}

      >
        <Index first={first} />
      </Dialog>
      <Dialog
        isOpen={dialogIsOpen2}
        onClose={() => setdialogIsOpen2(false)}
        onRequestClose={() => setdialogIsOpen2(false)}
      >
        <h5 className="mb-4"> Program Already Used On Below Dates</h5>
        {dialogIsOpen2
          ? dialogIsOpen2.map((item) => (
            <p style={{ fontSize: 15, color: 'wheat' }}>
              Date:- {item.TelecastDate.split('T')[0]}
            </p>
          ))
          : null}

        <div className="text-right mt-6">
          <Button variant="solid" onClick={() => setdialogIsOpen2(false)}>
            Okay
          </Button>
        </div>
      </Dialog>
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      {eroroshwo ? (
        <Alert type="info" title="Alert!" showIcon>
          Movie not Found
        </Alert>
      ) : null}
      <Formik
        initialValues={{
          ContentCode: Content.ContentCode || '',
          ContentName: Content.ContentName || '',
          ShortName: Content.ShortName || '',
          ERPCode: Content.ERPCode || '',
          ContentTypeCode: Content.ContentType?.ContentTypeCode || '',
          LanguageCode: Content.Language?.LanguageCode || '',
          ClassificationCode:
            Content.ContentClassification?.ClassificationCode || '',
          FPCReleaseDate: Content.FPCReleaseDate || '',
          SlotDuration: Content.SlotDuration || '',
          GenreCode: Content.GenreMaster?.GenreCode || '',
          SubGenreCode: Content.SubGenreMaster?.SubGenreCode || '',
          CensorshipCode: Content.Censorship?.CensorshipCode || '',
          TxTypeName: TXCode?.TXVersion || [],
          SupplierName: TXCode?.Supplier || [],
          DefaultSeg: Content.DefaultSeg || '',
          Audience: Content.View?.ViewCode || '',
          Content_Image: previewSource,
          IsActive: Content.IsActive === 1 ? true : false,
          InParenting: Content.PromoCode === null ? false : true,
          InHouseOutHouse: Content.InHouseOutHouse == 1 ? true : false,
          Synopsis: Content.Synopsis,
          BlackWhite: Content.BlackWhite,
          GenericSynopsis: Content.GenericSynopsis,
          EPGContentName: Content.EPGContentName,
          MetaData: Content.MetaData,
          VideoTypeCode: Content.VideoType?.VideoTypeCode,
          AspectRatio: Content.AspectRatio,
          DefaultSegDur: Content.DefaultSegDur,
          AppRejRemark: Content.AppRejRemark,
          IsRecorded: Content.IsRecorded,
          GroupName: Content.GroupName,
          IgnoreRODPSpots: Content.IgnoreRODPSpots,
          AllowOverBooking: Content.AllowOverBooking,
          PromoCode: Content.PromoCode || 0,

          //PromoCode: Content.PromoCode ? Content.PromoCode : 0,
        }}
        //validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (Content.ContentCode) {
              new Promise((resolve, reject) => {
                setSubmitting(false);
                EditContent(values, token)
                  .then((response) => {
                    // onDrawerClose(0, 0)
                    resolve(response);
                  })
                  .catch((errors) => {
                    reject(errors);
                  });
              });
            }

            resetForm();
          }, 400);
        }}
      >
        {({ values, touched, errors }) => (
          <Form>

            <Card
              headerExtra={headerExtraContent(globalFilter, setGlobalFilter)}
            >
              <div className="inline-flex flex-wrap xl:flex gap-2">
                <FormContainer>
                  <Field
                    size="sm"
                    type="ContentCode"
                    autoComplete="off"
                    name="ContentCode"
                    placeholder="ContentCode name"
                    component={Input}
                    hidden
                  />
                  <div className="grid grid-cols-8 md:grid-cols-8 gap-2">
                    <div className="col-span-3">
                      <FormItemcompact
                        asterisk
                        label={
                          Channel.label == CLIENT.USA_Forbes
                            ? 'Template'
                            : 'Content'
                        }
                        invalid={errors.ContentName && touched.ContentName}
                        errorMessage={errors.ContentName}
                      >
                        <Field
                          type="text"
                          // disabled={Content.ContentName && true}
                          autoComplete="off"
                          name="ContentName"
                          size="sm"
                          placeholder={
                            Channel.label == CLIENT.USA_Forbes
                              ? 'Template'
                              : 'Content'
                          }
                          component={Input}
                        />
                      </FormItemcompact>
                    </div>

                    <div className="col-span-1">
                      <FormItemcompact
                        asterisk
                        label="Short Name"
                        invalid={errors.ShortName && touched.ShortName}
                        errorMessage={errors.ShortName}
                      >
                        <Field
                          type="ShortName"
                          autoComplete="off"
                          name="ShortName"
                          size="sm"
                          placeholder="Short Name"
                          component={Input}
                          maxLength="8"
                        />
                      </FormItemcompact>
                    </div>
                    <div className="col-span-2">
                      <FormItemcompact
                        asterisk
                        label="Content Type"
                        invalid={
                          errors.ContentTypeCode && touched.ContentTypeCode
                        }
                        errorMessage={errors.ContentTypeCode}
                      >
                        <Field size="sm" name="ContentTypeCode">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              options={ContentType}
                              value={
                                ContentType.length > 0
                                  ? ContentType.filter(
                                    (option) =>
                                      option.value === values.ContentTypeCode,
                                  )
                                  : ContentDemo.filter(
                                    (option) =>
                                      option.value === values.ReportingTo,
                                  )
                              }
                              onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                              }
                            />
                          )}
                        </Field>
                      </FormItemcompact>
                    </div>


                    <div className="col-span-2">
                      <FormItemcompact
                        asterisk
                        label="Classification"
                        invalid={
                          errors.ClassificationCode &&
                          touched.ClassificationCode
                        }
                        errorMessage={errors.ClassificationCode}
                      >
                        <Field name="ClassificationCode">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              isDisabled
                              options={options2}
                              value={options2.filter(
                                (option) =>
                                  option.value === values.ClassificationCode,
                              )}
                              onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                              }
                            />
                          )}
                        </Field>
                      </FormItemcompact>
                    </div>
                    <div className="col-span-1">
                      <FormItemcompact
                        label="ERP Code"
                        invalid={errors.ERPCode && touched.ERPCode}
                        errorMessage={errors.ERPCode}
                      >
                        <Field
                          type="ERPCode"
                          autoComplete="off"
                          name="ERPCode"
                          size="sm"
                          placeholder="ERPCode"
                          component={Input}
                          maxLength="8"
                        />
                      </FormItemcompact>
                    </div>

                    <div className="col-span-2">
                      <FormItemcompact
                        asterisk
                        label="Audience"
                        invalid={errors.Audience && touched.Audience}
                        errorMessage={errors.Audience}
                      >
                        <Field name="Audience">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              options={options3}
                              value={options3.filter(
                                (option) => option.value === values.Audience,
                              )}
                              onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                              }
                            />
                          )}
                        </Field>
                      </FormItemcompact>
                    </div>

                    <div className="col-span-1">
                      <FormItemcompact
                        asterisk
                        label="Dur In Mins."
                        invalid={errors.SlotDuration && touched.SlotDuration}
                        errorMessage={errors.SlotDuration}
                      >
                        <Field name="SlotDuration">
                          {({ field, form }) => (
                            <Input
                              size="sm"
                              placeholder="SlotDuration"
                              field={field}
                              form={form}
                              value={values.SlotDuration}
                              onChange={(event) => {
                                const limit = 3;
                                const regex = /^[0-9]*$/;
                                const input = event.target.value;

                                if (regex.test(input)) {
                                  form.setFieldValue(
                                    field.name,
                                    input.slice(0, limit),
                                  );
                                }
                              }}
                            />
                          )}
                        </Field>
                      </FormItemcompact>
                    </div>
                    <div className="col-span-2">
                      <FormItemcompact
                        asterisk
                        label="Censorship"
                        invalid={
                          errors.CensorshipCode && touched.CensorshipCode
                        }
                        errorMessage={errors.CensorshipCode}
                      >
                        <Field name="CensorshipCode">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              options={Censorship}
                              value={
                                Censorship.length > 0
                                  ? Censorship.filter(
                                    (option) =>
                                      option.value === values.CensorshipCode,
                                  )
                                  : ContentDemo.filter(
                                    (option) =>
                                      option.value === values.ReportingTo,
                                  )
                              }
                              onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                              }
                            />
                          )}
                        </Field>
                      </FormItemcompact>
                    </div>

                    <div className="col-span-2">
                      <FormItemcompact
                        asterisk
                        label="Release Date"
                        invalid={
                          errors.FPCReleaseDate && touched.FPCReleaseDate
                        }
                        errorMessage={errors.FPCReleaseDate}
                      >
                        <Field name="FPCReleaseDate">
                          {({ field, form }) => (
                            <DatePicker
                              field={field}
                              size="sm"
                              form={form}
                              name="FPCReleaseDate"
                              prefix={<HiCake className="text-xl" />}
                              defaultValue={
                                validate(values.FPCReleaseDate)
                                  ? new Date(values.FPCReleaseDate)
                                  : ''
                              }
                              onChange={(date) => {
                                form.setFieldValue(
                                  field.name,
                                  convertDateToYMD(date),
                                );
                              }}
                            />
                          )}
                        </Field>
                      </FormItemcompact>
                    </div>

                    <div className="col-span-2">
                      <FormItemcompact
                        asterisk
                        label="Genre"
                        invalid={errors.GenreCode && touched.GenreCode}
                        errorMessage={errors.GenreCode}
                      >
                        <Field size="sm" name="GenreCode">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              options={Genre}
                              value={
                                Genre.length > 0
                                  ? Genre.filter(
                                    (option) =>
                                      option.value === values.GenreCode,
                                  )
                                  : ContentDemo.filter(
                                    (option) =>
                                      option.value === values.ReportingTo,
                                  )
                              }
                              onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                              }
                            />
                          )}
                        </Field>
                      </FormItemcompact>
                    </div>

                    <div className="col-span-2">
                      <FormItemcompact
                        asterisk
                        label="Language"
                        invalid={errors.LanguageCode && touched.LanguageCode}
                        errorMessage={errors.LanguageCode}
                      >
                        <Field size="sm" name="LanguageCode">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              options={Language}
                              value={
                                Language.length > 0
                                  ? Language.filter(
                                    (option) =>
                                      option.value === values.LanguageCode,
                                  )
                                  : ContentDemo.filter(
                                    (option) =>
                                      option.value === values.ReportingTo,
                                  )
                              }
                              onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                              }
                            />
                          )}
                        </Field>
                      </FormItemcompact>
                    </div>
                    <div className="col-span-2">
                      <FormItemcompact
                        asterisk
                        label="SubGenre"
                        invalid={errors.SubGenreCode && touched.SubGenreCode}
                        errorMessage={errors.SubGenreCode}
                      >
                        <Field size="sm" name="SubGenreCode">
                          {({ field, form }) => (
                            <Select
                              field={field}
                              form={form}
                              options={SubGenre}
                              value={
                                SubGenre.length > 0
                                  ? SubGenre.filter(
                                    (option) =>
                                      option.value === values.SubGenreCode,
                                  )
                                  : ContentDemo.filter(
                                    (option) =>
                                      option.value === values.ReportingTo,
                                  )
                              }
                              onChange={(option) =>
                                form.setFieldValue(field.name, option?.value)
                              }
                            />
                          )}
                        </Field>
                      </FormItemcompact>
                    </div>
                    <div className="col-span-2">
                      <FormItemcompact
                        label="TX Type Name"
                        asterisk
                        invalid={errors.TxTypeName && touched.TxTypeName}
                        errorMessage={errors.TxTypeName}
                      >
                        <Field name="TxTypeName">
                          {({ field, form }) => (
                            <Select
                              isMulti
                              componentAs={CreatableSelect}
                              TXVersionType
                              field={field}
                              form={form}
                              options={TXVersion}
                              value={values.TxTypeName}
                              onChange={(option) => {
                                form.setFieldValue(field.name, option);
                              }}
                            />
                          )}
                        </Field>
                      </FormItemcompact>
                    </div>

                    <div className="col-span-1">
                      <FormItemcompact
                        asterisk
                        label="IsActive"
                        invalid={errors.IsActive && touched.IsActive}
                        errorMessage={errors.IsActive}
                      >
                        <div>
                          <Field name="IsActive" component={Switcher} />
                        </div>
                      </FormItemcompact>
                    </div>

                    {CLIENT.ANI_PLUS === Channel.label && <div className="col-span-3">
                      <div >
                        <FormItem
                          label="Parenting Rating Disclaimers "
                          invalid={errors.PromoCode && touched.PromoCode}
                          errorMessage={errors.PromoCode}
                        >
                          <Field name="PromoCode">
                            {({ field, form }) => (
                              <Select
                                field={field}
                                form={form}
                                value={
                                  parentingDetails.length > 0
                                    ? parentingDetails.filter(
                                      (option) =>
                                        option.value === values.PromoCode,
                                    )
                                    : ContentDemo.filter(
                                      (option) =>
                                        option.value === values.ReportingTo,
                                    )
                                }
                                options={parentingDetails}
                                onChange={(option) => {
                                  form.setFieldValue(field.name, option.value);
                                }}
                              />
                            )}
                          </Field>
                        </FormItem>
                      </div>
                    </div>}

                    <div className="col-span-1">
                      <FormItemcompact
                        label="Is OutHouse"
                        invalid={errors.InHouseOutHouse && touched.InHouseOutHouse}
                        errorMessage={errors.InHouseOutHouse}
                      >
                        <Field name="InHouseOutHouse" component={Switcher} />
                      </FormItemcompact>
                    </div>

                    <div className="col-span-3">
                      {(values.InHouseOutHouse == 1 || values.InHouseOutHouse) &&

                        <div >
                          <FormItemcompact
                            label="Supplier Name"
                            asterisk
                            invalid={errors.SupplierName && touched.SupplierName}
                            errorMessage={errors.SupplierName}
                          >
                            <Field name="SupplierName">
                              {({ field, form }) => (
                                <Select
                                  isMulti
                                  componentAs={CreatableSelect}
                                  field={field}
                                  form={form}
                                  options={SupplierList}
                                  value={values.SupplierName}
                                  onChange={(option) => {
                                    form.setFieldValue(field.name, option);
                                  }}
                                />
                              )}
                            </Field>
                          </FormItemcompact>
                        </div>}</div>


                    {/* <div className="col-span-1">
                      <FormItem
                        label="Is Parenting"
                        invalid={errors.InParenting && touched.InParenting}
                        errorMessage={errors.InParenting}
                      >
                        <Field name="InParenting" component={Switcher} />
                      </FormItem>
                    </div> */}


                    <div className="col-span-4">
                      <FormItemcompact
                        label="Content Image"
                        invalid={errors.Content_Image && touched.Content_Image}
                        errorMessage={errors.Content_Image}
                      >
                        <Field name="Content_Image">
                          {({ field, form }) => (
                            <div style={{ display: 'grid' }}>
                              <Upload
                                // style={{ display: 'block' }}
                                uploadLimit={1}
                                beforeUpload={beforeUpload}
                                accept=".jpg, .jpeg, .png, .bmp, .svg"
                                showList={false}


                                onChange={(files) => {
                                  const file = files[0];

                                  if (file) {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);

                                    reader.onloadend = () => {
                                      form.setFieldValue(field.name, Channel.label == CLIENT.MASST_INDIA ? file : reader.result);
                                      setPreviewSource(reader.result); // base64 string for preview
                                    };
                                  } else {
                                    form.setFieldValue(field.name, '');
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
                                              height: '120px',
                                              width: 'auto',
                                            }}
                                            alt="Preview"
                                            className="hover:opacity-80"
                                          ></img>
                                        </Tooltip>
                                        {/* </Upload> */}
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
                                              form.setFieldValue(
                                                field.name,
                                                '',
                                              );
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
                          )}
                        </Field>
                      </FormItemcompact>
                    </div>
                  </div>

                  <br></br>
                  <FormItemcompact>
                    {/* {hashPart.toLowerCase().startsWith(IsChannelWise ? '/templatemaster' : '/contentmaster' || '/EventTeamPlaner') && ( */}
                    <Button variant="solid" type="submit">
                      Save
                    </Button>
                    {/* )} */}
                  </FormItemcompact>
                </FormContainer>
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContentEditDialogbox;
