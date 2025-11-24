import {
  FormItemcompact,
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
  Upload,
  Tooltip,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react';
import { Postprovider, Putprovider } from 'services/MasterService';
import { FcImageFile } from 'react-icons/fc';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { GrClose } from 'react-icons/gr';

const validationSchema = Yup.object().shape({
  ProviderName: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Provider Name Required'),

  ShortName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(4, 'Too Long!'),
  EPGFileFormat: Yup.string()
    .matches(/^[A-Za-z0-9]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(5, 'Too Long!')
    .required('EPG File Format Required'),
});

const ProviderEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;

  const token = useSelector((state) => state.auth.session.token);
  const [previewSource, setPreviewSource] = useState(
    editData.ProviderImage ? editData.ProviderImage : '',
  );

  const beforeUpload = (file, fileList) => {
    let valid = true;

    const allowedFileType = ['image/jpeg', 'image/png'];
    const MAX_FILE_SIZE = 500000;

    if (file) {
      for (const f of file) {
        if (!allowedFileType.includes(f.type)) {
          valid = 'Please upload a .jpeg or .png file!';
        }

        if (f.size >= MAX_FILE_SIZE) {
          valid = 'Upload image cannot more then 500kb!';
        }
      }
    }

    return valid;
  };
  const AddProvider = async (values, token) => {
    try {
      const resp = await Postprovider(values, token);
      console.log(resp.status);
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
  const EditProvider = async (values, token) => {
    try {
      const resp = await Putprovider(values, token);
      console.log(resp);
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

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          ProviderCode: editData.ProviderCode || '',
          ProviderName: editData.ProviderName || '',
          ShortName: editData.ShortName || '',
          EPGFileFormat: editData.EPGFileFormat || '',
          ProviderImage: previewSource || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);
          setTimeout(() => {
            if (!editData.ProviderCode) {
              new Promise((resolve, reject) => {
                AddProvider(values, token)
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
                EditProvider(values, token)
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
              <Field
                size="sm"
                type="ProviderCode"
                autoComplete="off"
                name="ProviderCode"
                placeholder=""
                component={Input}
                hidden
              />
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                <FormItemcompact
                  asterisk
                  label="Provider Name"
                  invalid={errors.ProviderName && touched.ProviderName}
                  errorMessage={errors.ProviderName}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="ProviderName"
                    placeholder=" "
                    component={Input}
                  />
                </FormItemcompact>

                <FormItemcompact
                  label="Short Name"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="ShortName"
                    placeholder=" "
                    component={Input}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="EPG File Format "
                  invalid={errors.EPGFileFormat && touched.EPGFileFormat}
                  errorMessage={errors.EPGFileFormat}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="EPGFileFormat"
                    placeholder=" "
                    component={Input}
                  />
                </FormItemcompact>

                <div className="col-span-2">
                  <FormItemcompact
                    label="Provider Image"
                    invalid={errors.ProviderImage && touched.ProviderImage}
                    errorMessage={errors.ProviderImage}
                  >
                    <Field name="ProviderImage">
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

              {/* <FormItemcompact>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItemcompact> */}
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});
export default ProviderEdit;
