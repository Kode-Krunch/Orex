import {
  FormItemcompact,
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Postftpsetting, Putftpsetting } from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { isChar, isInitial, isNumbers } from 'components/validators';
const validationSchema = Yup.object().shape({
  SettingDesc: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Setting Name Required'),
  FTPLocation: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('FTP Location Required'),
  FTP_UserID: Yup.string().min(1, 'Too Short!').max(20, 'Too Long!'),
  FTP_PWD: Yup.string().min(1, 'Too Short!').max(20, 'Too Long!'),
  FTP_Port: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(1, 'Too Short!')
    .max(4, 'Too Long!'),
  IsActive: Yup.string().required('IsActives Required'),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];

const FtpSettingEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;
  // const FtpSettingEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddFtpSetting = async (values, token) => {
    // //console.log(values)
    try {
      const resp = await Postftpsetting(values, token);
      if (resp.status == 200) {
        openNotification('success', 'Data Inserted Successfully.');
        return;
      } else if (resp.status == 204) {
        openNotification('warning', 'Data Already Exist');
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification('error', 'Server Error.');
        return;
      }
    }
  };
  const EditFtpSetting = async (values, token) => {
    try {
      const resp = await Putftpsetting(values, token);
      //console.log(resp)
      if (resp.status == 200) {
        openNotification('success', 'Data Updated Successfully');
        return;
      } else if (resp.status == 204) {
        openNotification('warning', 'FTP setting is Already Exists');
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification('error', 'Server Error.');
        return;
      }
    }
  };
  const [pwInputType, setPwInputType] = useState('password');

  const onPasswordVisibleClick = (e) => {
    e.preventDefault();

    setPwInputType(pwInputType === 'password' ? 'text' : 'password');
  };
  const inputIcon = (
    <span className="cursor-pointer" onClick={(e) => onPasswordVisibleClick(e)}>
      {pwInputType === 'password' ? <HiOutlineEyeOff /> : <HiOutlineEye />}
    </span>
  );

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          FTPSettingCode: editData.FTPSettingCode || '',
          SettingDesc: editData.SettingDesc || '',
          FTPLocation: editData.FTPLocation || '',
          FTP_UserID: editData.FTP_UserID || '',
          FTP_PWD: editData.FTP_PWD || '',
          FTP_Port: editData.FTP_Port || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.FTPSettingCode) {
              new Promise((resolve, reject) => {
                AddFtpSetting(values, token)
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
                EditFtpSetting(values, token)
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Field
                  size="sm"
                  type="FTPSettingCode"
                  autoComplete="off"
                  name="FTPSettingCode"
                  placeholder="FTPSettingCode"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="FTP Setting Name"
                  invalid={errors.SettingDesc && touched.SettingDesc}
                  errorMessage={errors.SettingDesc}
                >
                  <Field
                    size="sm"
                    type="FTP Setting Name "
                    autoComplete="on"
                    name="SettingDesc"
                    placeholder="FTP Setting Name"
                    component={Input}
                    value={values.SettingDesc}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isChar(newValue)) {
                        setFieldValue('SettingDesc', newValue);
                      }
                    }}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="FTP Location"
                  invalid={errors.FTPLocation && touched.FTPLocation}
                  errorMessage={errors.FTPLocation}
                >
                  <Field
                    size="sm"
                    type="FTPLocation"
                    // maxlength=""
                    autoComplete="off"
                    name="FTPLocation"
                    placeholder="FTP Location"
                    component={Input}
                    value={values.FTPLocation}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isChar(newValue)) {
                        setFieldValue('FTPLocation', newValue);
                      }
                    }}
                  />
                </FormItemcompact>
                <FormItemcompact
                  label="FTP UserID"
                  invalid={errors.FTP_UserID && touched.FTP_UserID}
                  errorMessage={errors.FTP_UserID}
                >
                  <Field
                    size="sm"
                    type="FTP_UserID"
                    autoComplete="off"
                    name="FTP_UserID"
                    placeholder="FTP UserID"
                    component={Input}
                    value={values.FTP_UserID}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      // if (isChar(newValue)) {
                      setFieldValue('FTP_UserID', newValue);
                      // }
                    }}
                  />
                </FormItemcompact>
                <FormItemcompact
                  label="FTP PWD"
                  invalid={errors.FTP_PWD && touched.FTP_PWD}
                  errorMessage={errors.FTP_UserID}
                >
                  <Field
                    size="sm"
                    type={pwInputType}
                    suffix={inputIcon}
                    autoComplete="off"
                    name="FTP_PWD"
                    placeholder="FTP PWD"
                    component={Input}
                    value={values.FTP_PWD}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isInitial(newValue)) {
                        setFieldValue('FTP_PWD', newValue);
                      }
                    }}
                  />
                </FormItemcompact>
                <FormItemcompact
                  label="FTP Port"
                  invalid={errors.FTP_Port && touched.FTP_Port}
                  errorMessage={errors.FTP_Port}
                >
                  <Field
                    size="sm"
                    type="FTP_Port"
                    autoComplete="off"
                    name="FTP_Port"
                    placeholder="FTP Port"
                    component={Input}
                    value={values.FTP_Port}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isNumbers(newValue)) {
                        setFieldValue('FTP_Port', newValue);
                      }
                    }}
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

export default FtpSettingEdit;
