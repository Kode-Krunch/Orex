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
import { Postlocation, Putlocation } from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { isChar, isCharAndNum } from 'components/validators';

const validationSchema = Yup.object().shape({
  LocationName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Location Name Required'),
  ShortName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(4, 'Too Long!')
    .required('ShortName Required'),
  TimeZoneCode: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('TimeZone Required'),
  CurrencyCode: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Currency Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
// const LocationEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     currency,
// }) => {
const LocationEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, currency, TimeZone } =
    props;

  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddLocation = async (values, token) => {
    try {
      const resp = await Postlocation(values, token);
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
  const EditLocation = async (values, token) => {
    try {
      const resp = await Putlocation(values, token);
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

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          LocationCode: editData.LocationCode || '',
          LocationName: editData.LocationName || '',
          TimeZoneCode: editData.TimeZoneCode || ' ',
          ShortName: editData.ShortName || '',
          CurrencyCode: editData.CurrencyCode || '',

          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.LocationCode) {
              new Promise((resolve, reject) => {
                AddLocation(values, token)
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
                EditLocation(values, token)
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
                  type="LocationCode"
                  autoComplete="off"
                  name="LocationCode"
                  placeholder="Location Name"
                  component={Input}
                  hidden
                />

                <FormItemcompact
                  asterisk
                  label="Location Name"
                  invalid={errors.LocationName && touched.LocationName}
                  errorMessage={errors.LocationName}
                >
                  <Field
                    type="text"
                    placeholder="LocationName"
                    maxlength="20"
                    size="sm"
                    value={values.LocationName}
                    name="LocationName"
                    component={Input}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isCharAndNum(newValue)) {
                        setFieldValue('LocationName', newValue);
                      }
                    }}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="Short Name"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field
                    type="text"
                    placeholder="Short Name"
                    maxlength="4"
                    size="sm"
                    value={values.ShortName}
                    name="ShortName"
                    component={Input}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isChar(newValue)) {
                        setFieldValue('ShortName', newValue);
                      }
                    }}
                  />
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Currency"
                  invalid={errors.CurrencyCode && touched.CurrencyCode}
                  errorMessage={errors.CurrencyCode}
                  style={{ width: '250px' }}
                >
                  <Field
                    name="CurrencyCode"
                    placeholder="Select"
                    component={Select}
                    options={currency}
                    value={currency.filter(
                      (option) => option.value === values.CurrencyCode,
                    )}
                    onChange={(e) => {
                      const newValue = e.value;
                      setFieldValue('CurrencyCode', newValue);
                    }}
                    size="sm"
                  />
                </FormItemcompact>
                <FormItemcompact
                  label="TimeZone"
                  invalid={errors.TimeZoneCode && touched.TimeZoneCode}
                  errorMessage={errors.TimeZoneCode}
                  style={{ width: '250px' }}
                >
                  <Field
                    name="TimeZoneCode"
                    placeholder="Select"
                    component={Select}
                    options={TimeZone}
                    value={TimeZone.filter(
                      (option) => option.value == values.TimeZoneCode,
                    )}
                    onChange={(e) => {
                      const newValue = e.value;
                      setFieldValue('TimeZoneCode', newValue);
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

export default LocationEdit;
