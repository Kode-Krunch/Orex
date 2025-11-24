import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import {
  FormItemcompact,
  Switcher,
  Input,
  FormContainer,
  Select,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  formatOnHHMMSSFFBlur,
  handleChangeWithFrameNewFormik,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { isChar, isCharAndNum } from 'components/validators';
import { AddNTCType, UpdateNTCType } from 'services/NTCService';

const validationSchema = Yup.object().shape({
  NTCTypeName: Yup.string()
    .matches(/^[A-Za-z0-9_ ]+$/, 'Only alphanumeric characters are allowed')
    .min(1, 'Too Short!')
    .max(100, 'Too Long!')
    .required('NTCType Name Required'),
  NtcTypeShortName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(4, 'Too Long!')
    .required('NtcTypeShortName Required'),
  DefaultGAP: Yup.string()
    .matches(/^[0-9: ]+$/, 'Only Numbers are allowed')
    .min(1, 'Too Short!')
    .max(12, 'Too Long!')
    .required('DefaultGAP Required'),
  NTCGroupCode: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('NTCGroup Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});

const NTCTypeEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, NTCGroup } = props;
  const ChannelSetting = useSelector(
    (state) => state.auth.session.ChannelSetting,
  );
  const token = useSelector((state) => state.auth.session.token);
  const AddNTCTypesumbit = async (values, token) => {
    try {
      const resp = await AddNTCType(values, token);
      if (resp.status === 200) {
        setlog('error');
        setMessage('Data Inserted Successfully.');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        openNotification('danger', 'Server Error.');
        return;
      }
    }
  };
  const EditNTCType = async (values, token) => {
    try {
      const resp = await UpdateNTCType(values, token);
      //console.log(resp)

      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'Data Already Exists.') {
        setlog('warning');
        setMessage(resp.data.msg);
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification('danger', 'Server Error.');
        return;
      } else {
        console.log('errors');
        return;
      }
    }
  };
  const handleBlur = (event, setFieldValue) => {
    const { name, value } = event.target;
    const formattedValue = formatOnHHMMSSFFBlur(value, Number(ChannelSetting[0]?.FramePerSec || 24));
    setFieldValue(name, formattedValue);
  };
  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          NTCTypeCode: editData.NTCTypeCode || '',
          NTCTypeName: editData.NTCTypeName || '',
          NtcTypeShortName: editData.NtcTypeShortName || '',
          DefaultGAP: editData.DefaultGAP || '',
          NTCGroupCode: editData.NTCGroupCode || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.NTCTypeCode) {
              new Promise((resolve, reject) => {
                AddNTCTypesumbit(values, token)
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
                EditNTCType(values, token)
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
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-2 gap-2">
                <Field
                  size="sm"
                  type="NTCTypeCode"
                  autoComplete="off"
                  name="NTCTypeCode"
                  placeholder="NTCType Name"
                  component={Input}
                  hidden
                />

                <FormItemcompact
                  asterisk
                  label="NTCType Name"
                  invalid={errors.NTCTypeName && touched.NTCTypeName}
                  errorMessage={errors.NTCTypeName}
                >
                  <Field
                    type="text"
                    placeholder="NTCTypeName"
                    maxlength="100"
                    size="sm"
                    value={values.NTCTypeName}
                    name="NTCTypeName"
                    component={Input}
                    onChange={(e) => {
                      setFieldValue('NTCTypeName', e.target.value);
                    }}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="Short Name"
                  invalid={errors.NtcTypeShortName && touched.NtcTypeShortName}
                  errorMessage={errors.NtcTypeShortName}
                >
                  <Field
                    type="text"
                    placeholder="Short Name"
                    maxlength="4"
                    size="sm"
                    value={values.NtcTypeShortName}
                    name="NtcTypeShortName"
                    component={Input}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isChar(newValue)) {
                        setFieldValue('NtcTypeShortName', newValue);
                      }
                    }}
                  />
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Default GAP"
                  invalid={errors.DefaultGAP && touched.DefaultGAP}
                  errorMessage={errors.DefaultGAP}
                >
                  <Field size="sm" name="DefaultGAP">
                    {({ field, form }) => (
                      <Input
                        field={field}
                        maxLength="12"
                        form={form}
                        name="DefaultGAP"
                        size="sm"
                        value={values.DefaultGAP}
                        onChange={(e) => {
                          handleChangeWithFrameNewFormik(e, form, field);
                        }}
                        onBlur={(e) => handleBlur(e, setFieldValue)}
                      />
                    )}
                  </Field>
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="NTCGroup"
                  invalid={errors.NTCGroupCode && touched.NTCGroupCode}
                  errorMessage={errors.NTCGroupCode}
                  style={{ width: '250px' }}
                >
                  <Field
                    name="NTCGroupCode"
                    placeholder="Select"
                    component={Select}
                    options={NTCGroup}
                    value={NTCGroup.filter(
                      (option) => option.value === values.NTCGroupCode,
                    )}
                    onChange={(e) => {
                      const newValue = e.value;
                      setFieldValue('NTCGroupCode', newValue);
                    }}
                    size="sm"
                  />
                </FormItemcompact>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormItemcompact
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field size="sm" name="IsActive" component={Switcher} />
                  </div>
                </FormItemcompact>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default NTCTypeEdit;
