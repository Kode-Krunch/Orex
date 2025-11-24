import {
  FormItemcompact,
  Switcher,
  Input,
  FormContainer,
  Upload,
  Tooltip,
  Button,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react';
import { Postplayout, Putplayout } from 'services/MasterService';
import { FcImageFile } from 'react-icons/fc';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import appConfig from 'configs/app.config';
import { GrClose } from 'react-icons/gr';

/* CONSTANTS */
const PLAYLOUT_NAME_MAX_LENGTH = 20;
const PLAYLOUT_FILE_FORMAT_MAX_LENGTH = 5;
const ASRUN_FILE_FORMAT_MAX_LENGTH = 5;
const ALPHANUMERIC_REGEX_WITH_SPACE_REGEX =
  appConfig.validation.alphaNumericRegexWithSpace;
const ALPHANUMERIC_REGEX_WITHOUT_SPACE_REGEX =
  appConfig.validation.alphaNumericRegexWithoutSpaces;

const validationSchema = Yup.object().shape({
  PlayoutName: Yup.string()
    .matches(
      ALPHANUMERIC_REGEX_WITH_SPACE_REGEX,
      'Only alphanumeric names are allowed',
    )
    .max(PLAYLOUT_NAME_MAX_LENGTH, 'Playout name too long')
    .required('Required'),
  PlaylistFileFormat: Yup.string()
    .matches(
      ALPHANUMERIC_REGEX_WITHOUT_SPACE_REGEX,
      'Only alphanumeric names are allowed',
    )
    .max(PLAYLOUT_FILE_FORMAT_MAX_LENGTH, 'File format too long')
    .required('Required'),
  AsrunFileFormat: Yup.string()
    .matches(
      ALPHANUMERIC_REGEX_WITHOUT_SPACE_REGEX,
      'Only alphanumeric names are allowed',
    )
    .max(ASRUN_FILE_FORMAT_MAX_LENGTH, 'File format too long')
    .required('Required'),
  IsActive: Yup.string().required('Required'),
});

/* HELPER FUNCTIONS */
const handleFieldInput = (event, setFieldValue, fieldName) => {
  try {
    let value = event.target.value;
    if (value.length === 0) {
      setFieldValue(fieldName, value);
    } else {
      if (fieldName === 'PlayoutName') {
        if (ALPHANUMERIC_REGEX_WITH_SPACE_REGEX.test(value)) {
          setFieldValue(fieldName, value);
        }
      } else if (fieldName === 'PlaylistFileFormat') {
        value = value.trim();
        if (ALPHANUMERIC_REGEX_WITHOUT_SPACE_REGEX.test(value)) {
          setFieldValue(fieldName, value);
        }
      } else if (fieldName === 'AsrunFileFormat') {
        value = value.trim();
        if (ALPHANUMERIC_REGEX_WITHOUT_SPACE_REGEX.test(value)) {
          setFieldValue(fieldName, value);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const PlayoutEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, setLoader } = props;

  const token = useSelector((state) => state.auth.session.token);

  const [previewSource, setPreviewSource] = useState(
    editData.PlayoutLogo ? editData.PlayoutLogo : '',
  );
  const MAX_UPLOAD = 1;

  const beforeUpload = (file, fileList) => {
    let valid = true;

    const allowedFileType = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/bmp',
      'image/svg+xml',
    ];
    const MAX_FILE_SIZE = 1000000;
    if (file) {
      for (const f of file) {
        if (!allowedFileType.includes(f.type)) {
          valid = 'Please upload image of supported format';
        }

        if (f.size >= MAX_FILE_SIZE) {
          valid = 'Image cannot be greater then 1MB';
        }
      }
    }

    return valid;
  };

  const AddPlayout = async (values, token) => {
    try {
      const resp = await Postplayout(values, token);
      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Inserted Successfully.');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        setlog('error');
        setMessage('Server Error.');
        return;
      }
    }
  };

  const EditPlayout = async (values, token) => {
    try {
      const resp = await Putplayout(values, token);

      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        setlog('error');
        setMessage('Server Error.');
        return;
      }
    }
  };
  // useEffect(() => {
  //     ; (async (values) => {
  //         const Place = await apiGetPlaceMaster(values)
  //         const formattedOptions = Place.data.map((option) => ({
  //             value: option.PlaceCode,
  //             label: option.PlaceName,
  //             Country: option.Country.CountryCode,
  //             State: option.State.StateCode,
  //         }))
  //         setPlace(formattedOptions)
  //     })()
  //}, [])
  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          PlayoutCode: editData.PlayoutCode || '',
          PlayoutName: editData.PlayoutName || '',
          PlaylistFileFormat: editData.PlaylistFileFormat || '',
          AsrunFileFormat: editData.AsrunFileFormat || '',
          PlayoutLogo: previewSource,
          IsActive:
            editData.IsActive === undefined || editData.IsActive === 1
              ? true
              : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            if (!editData.PlayoutCode) {
              new Promise((resolve, reject) => {
                setLoader(true);
                AddPlayout(values, token)
                  .then((response) => {
                    onDrawerClose(0, 0);
                    resolve(response);
                    setLoader(false);
                  })
                  .catch((errors) => {
                    reject(errors);
                    setLoader(false);
                  });
              });
            } else {
              setLoader(true);
              new Promise((resolve, reject) => {
                setLoader(true);
                setSubmitting(false);
                EditPlayout(values, token)
                  .then((response) => {
                    onDrawerClose(0, 0);
                    resolve(response);
                    setLoader(false);
                  })
                  .catch((errors) => {
                    reject(errors);
                    setLoader(false);
                  });
              });
            }
          }, 400);
        }}
      >
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-x-3 gap-y-3">
                <FormItemcompact
                  asterisk
                  label="Playout Name"
                  invalid={errors.PlayoutName && touched.PlayoutName}
                  errorMessage={errors.PlayoutName}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="PlayoutName"
                    placeholder="Playout Name"
                    className="mt-1"
                    maxLength={PLAYLOUT_NAME_MAX_LENGTH}
                    component={Input}
                    onChange={(event) => {
                      handleFieldInput(event, setFieldValue, 'PlayoutName');
                    }}
                  />
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Playlist File Format "
                  invalid={
                    errors.PlaylistFileFormat && touched.PlaylistFileFormat
                  }
                  errorMessage={errors.PlaylistFileFormat}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="PlaylistFileFormat"
                    placeholder="File Format"
                    className="mt-1"
                    component={Input}
                    maxLength={PLAYLOUT_FILE_FORMAT_MAX_LENGTH}
                    onChange={(event) => {
                      handleFieldInput(
                        event,
                        setFieldValue,
                        'PlaylistFileFormat',
                      );
                    }}
                  />
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="AsRun File Format "
                  invalid={errors.AsrunFileFormat && touched.AsrunFileFormat}
                  errorMessage={errors.AsrunFileFormat}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="AsrunFileFormat"
                    placeholder="File Format"
                    className="mt-1"
                    component={Input}
                    maxLength={ASRUN_FILE_FORMAT_MAX_LENGTH}
                    onChange={(event) => {
                      handleFieldInput(event, setFieldValue, 'AsrunFileFormat');
                    }}
                  />
                </FormItemcompact>
                <FormItemcompact
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <Field name="IsActive" component={Switcher} />
                </FormItemcompact>
                <div className="col-span-2">
                  <FormItemcompact
                    label="Playout Logo"
                    invalid={errors.PlayoutLogo && touched.PlayoutLogo}
                    errorMessage={errors.PlayoutLogo}
                  >
                    <Field name="PlayoutLogo">
                      {({ field, form }) => (
                        <div style={{ display: 'grid' }}>
                          <Upload
                            // style={{ display: 'block' }}
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
                                  form.setFieldValue(field.name, reader.result);
                                  setPreviewSource(reader.result);
                                };
                              } else {
                                form.setFieldValue(field.name, '');
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
                                          form.setFieldValue(field.name, '');
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
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default PlayoutEdit;
