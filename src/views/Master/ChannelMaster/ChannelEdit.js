import {
  FormItemcompact,
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
  Upload,
  Avatar,
  Tooltip,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Postchannel, Putchannel } from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useState, useEffect } from 'react';
import { FcImageFile } from 'react-icons/fc';
import { apiGetvideotypdrop } from 'services/ProgrammingService';
import { GrClose } from 'react-icons/gr';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { isCharAndNum, isCharAndNumforOTTNAME } from 'components/validators';

const gstRegex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;

const validationSchema = Yup.object().shape({
  ChannelName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  ShortName: Yup.string()
    .min(1, 'Too Short!')
    .max(4, 'Too Long!')
    .required(' Required'),

  VideoTypes: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  rememberMe: Yup.bool(),
});

const ChannelEdit = forwardRef((props, ref) => {
  const {
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    State,
    Genre,
    VideoTypesMaster,
  } = props;
  const token = useSelector((state) => state.auth.session.token);

  const [previewSource, setPreviewSource] = useState(
    editData.Channel_Image ? editData.Channel_Image : '',
  );

  const beforeUpload = (file, fileList) => {
    let valid = true;

    const allowedFileType = ['image/jpeg', 'image/png'];
    const MAX_FILE_SIZE = 500000;

    if (file) {
      for (const f of file) {
        if (!allowedFileType.includes(f.type)) {
          valid = 'Please upload a .jpeg  file!';
        }

        if (f.size >= MAX_FILE_SIZE) {
          valid = 'Upload image cannot more then 500kb!';
        }
      }
    }

    return valid;
  };
  const AddChannel = async (values, token) => {
    try {
      const resp = await Postchannel(values, token, previewSource);

      if (resp.status == 200) {
        openNotification('success', 'Data Inserted Successfully.');
        return;
      }
      if (resp.status == 204) {
        openNotification('info', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification('danger', 'Server Error.');
        return;
      }
    }
  };
  const EditChannel = async (values, token, previewSource) => {
    try {
      const resp = await Putchannel(values, token, previewSource);
      if (resp.status == 200) {
        openNotification('success', 'Data Updated Successfully');
        return;
      }
      if (resp.status == 204) {
        openNotification('info', 'Data already Exists');
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification('danger', 'Server Error.');
        return;
      }
    }
  };
  console.log(previewSource);
  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          ChannelCode: editData.ChannelCode,
          ChannelName: editData.ChannelName,
          ShortName: editData.ShortName,
          ChannelGenre: editData.GenreMaster?.GenreCode,
          VideoTypes: editData.VideoType?.VideoTypeCode,
          Channel_Image: previewSource,
          IsActive: editData.IsActive == 1 ? true : false || true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.ChannelCode) {
              new Promise((resolve, reject) => {
                AddChannel(values, token)
                  .then((response) => {
                    onDrawerClose(0, 0);
                    resolve(response);
                  })
                  .catch((errors) => {
                    reject(errors);
                  });
              });
            } else {
              new Promise((resolve, reject) => {
                setSubmitting(false);
                EditChannel(values, token, previewSource)
                  .then((response) => {
                    onDrawerClose(0, 0);
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
            <FormContainer>
              <div className="grid grid-cols-2 gap-2">
                <Field
                  size="sm"
                  type="ChannelCode"
                  autoComplete="off"
                  name="ChannelCode"
                  placeholder="ChannelCode name"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="Channel Name"
                  invalid={errors.ChannelName && touched.ChannelName}
                  errorMessage={errors.ChannelName}
                >
                  <Field name="ChannelName">
                    {({ field, form }) => (
                      <Input
                        type="text"
                        placeholder="ChannelName"
                        maxlength="20"
                        size="sm"
                        value={values.ChannelName}
                        name="ChannelName"
                        onChange={(e) => {
                          const newValue = e.target.value;

                          if (isCharAndNumforOTTNAME(newValue)) {
                            form.setFieldValue(field.name, newValue);
                          }
                          if (newValue == '') {
                            form.setFieldValue(field.name, '');
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Short Name"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field name="ShortName">
                    {({ field, form }) => (
                      <Input
                        type="text"
                        placeholder="ShortName"
                        maxlength="4"
                        size="sm"
                        value={values.ShortName}
                        name="ShortName"
                        onChange={(e) => {
                          const newValue = e.target.value;

                          if (/^[a-zA-Z ]+$/.test(newValue)) {
                            form.setFieldValue(field.name, newValue);
                          }
                          if (newValue == '') {
                            form.setFieldValue(field.name, '');
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>

                <FormItemcompact
                  label="Genre"
                  invalid={errors.GenreCode && touched.GenreCode}
                  errorMessage={errors.GenreCode}
                >
                  <Field size="sm" name="ChannelGenre">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={Genre}
                        value={Genre.filter(
                          (option) => option.value === values.ChannelGenre,
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                      />
                    )}
                  </Field>
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Content Type"
                  invalid={errors.VideoTypes && touched.VideoTypes}
                  errorMessage={errors.VideoTypes}
                >
                  <Field size="sm" name="VideoTypes">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={VideoTypesMaster}
                        value={VideoTypesMaster.filter(
                          (option) => option.value === values.VideoTypes,
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                      />
                    )}
                  </Field>
                </FormItemcompact>

                <FormItemcompact
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <Field size="sm" name="IsActive" component={Switcher} />
                </FormItemcompact>
              </div>
              <div className="col-span-4 mt-2">
                <FormItemcompact
                  label="Channel Image"
                  invalid={errors.Channel_Image && touched.Channel_Image}
                  errorMessage={errors.Channel_Image}
                >
                  <Field name="Channel_Image">
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
                              </div>
                            )}
                          </div>
                        </Upload>
                      </div>
                    )}
                  </Field>
                </FormItemcompact>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default ChannelEdit;
