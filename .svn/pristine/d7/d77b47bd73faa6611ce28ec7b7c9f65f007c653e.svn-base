import {
  FormItemcompact,
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
  DatePicker,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Poststarcast, Putstarcast } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { countryList } from 'constants/countries.constant';
import { convertDateToYMD, isChar, validate } from 'components/validators';
import { HiCake } from 'react-icons/hi';
import dayjs from 'dayjs';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  StarCastName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('StarCastName Required'),
  StarCastTypeCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('StarCastType Required'),
  MaleFemale: Yup.string().required('Gender Required'),
  CountryCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Country Name Required'),
  IsActive: Yup.string().required('IsActives Required'),
  DateOfBirth: Yup.date()

    //.required('Date of Birth is required')
    .nullable()
    .test('is-minimum-age', 'Minimum age must be 2 or older', function (value) {
      console.log('value', value);
      if (value === null || value === undefined) {
        return true;
      }
      const currentDate = new Date();
      const userBirthDate = new Date(value);
      const minAgeDate = new Date();
      minAgeDate.setFullYear(minAgeDate.getFullYear() - 2);

      return userBirthDate <= minAgeDate;
    }),
});

const options2 = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'O', label: 'Other' },
];
// const StarCastEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     Country,
//     StarCastType,
// }) => {
const StarCastEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, StarCastType, Country } =
    props;
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddStarCast = async (values, token) => {
    try {
      if (!values.DateOfDeath) {
        // If Rating is blank, remove it from the SongMaster object

        delete values.DateOfDeath;
      }
      if (!values.DateOfBirth) {
        // If Rating is blank, remove it from the SongMaster object

        delete values.DateOfBirth;
      }
      const resp = await Poststarcast(values, token);
      if (resp.status === 200) {
        onDrawerClose(0, 0);
        openNotification('success', 'Data Inserted Successfully.');
        return;
      } else if (resp.status === 204) {
        openNotification('warning', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        openNotification('error', 'Server Error.');
        return;
      }
    }
  };
  const EditStarCast = async (values, token) => {
    try {
      if (!values.DateOfBirth) {
        delete values.DateOfBirth;
      }

      const resp = await Putstarcast(values, token);
      //console.log(resp)

      if (resp.status === 200) {
        onDrawerClose(0, 0);
        openNotification('success', 'Data Updated Successfully');
        return;
      } else if (resp.status === 204) {
        openNotification('warning', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        openNotification('error', 'Server Error.');
        return;
      }
    }
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          StarCastCode: editData.StarCastCode || '',
          StarCastName: editData.StarCastName || '',
          StarCastTypeCode: editData.StarCastTypeMaster?.StarCastTypeCode || '',
          CountryCode: editData.Country?.CountryCode || '',
          MaleFemale: editData.MaleFemale || '',
          DateOfBirth: editData.DateOfBirth || '',
          DateOfDeath: editData.DateOfDeath || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.StarCastCode) {
              new Promise((resolve, reject) => {
                AddStarCast(values, token)
                  .then((response) => {
                    resolve(response);
                  })
                  .catch((errors) => {
                    reject(errors);
                  });
              });
            } else {
              new Promise((resolve, reject) => {
                setSubmitting(false);
                EditStarCast(values, token)
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
                  type="StarCastCode"
                  autoComplete="off"
                  name="StarCastCode"
                  placeholder="StarCastCode"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="StarCast Name"
                  invalid={errors.StarCastName && touched.StarCastName}
                  errorMessage={errors.StarCastName}
                >
                  <Field
                    type="StarCastName"
                    autoComplete="off"
                    name="StarCastName"
                    maxLength="20"
                    placeholder="StarCast Name"
                    component={Input}
                    size="sm"
                    value={values.StarCastName}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isChar(newValue)) {
                        setFieldValue('StarCastName', newValue);
                      }
                    }}
                  />
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="StartCast Type"
                  invalid={errors.StarCastTypeCode && touched.StarCastTypeCode}
                  errorMessage={errors.StarCastTypeCode}
                >
                  <Field name="StarCastTypeCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={StarCastType}
                        size="sm"
                        value={StarCastType.filter(
                          (option) => option.value === values.StarCastTypeCode,
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
                  label="Gender"
                  invalid={errors.MaleFemale && touched.MaleFemale}
                  errorMessage={errors.MaleFemale}
                >
                  <Field name="MaleFemale">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={options2}
                        size="sm"
                        value={options2.filter(
                          (option) => option.value === values.MaleFemale,
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
                  label="Country"
                  invalid={errors.CountryCode && touched.CountryCode}
                  errorMessage={errors.CountryCode}
                >
                  <Field name="CountryCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={Country}
                        size="sm"
                        value={Country.filter(
                          (option) => option.value === values.CountryCode,
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                      />
                    )}
                  </Field>
                </FormItemcompact>

                <FormItemcompact
                  label="Date Of Birth"
                  invalid={errors.DateOfBirth && touched.DateOfBirth}
                  errorMessage={errors.DateOfBirth}
                >
                  <Field name="DateOfBirth" placeholder="Date" size="sm">
                    {({ field, form }) => (
                      <DatePicker
                        field={field}
                        name="DateOfBirth"
                        defaultMonth={dayjs(new Date())
                          .subtract(17, 'year')
                          .startOf('day')
                          .toDate()}
                        form={form}
                        prefix={<HiCake className="text-xl" />}
                        defaultValue={
                          validate(values.DateOfBirth)
                            ? new Date(values.DateOfBirth)
                            : ''
                        }
                        onChange={(date) => {
                          form.setFieldValue(
                            field.name,
                            convertDateToYMD(date),
                          );
                        }}
                        size="sm"
                        value={values.DateOfBirth ? new Date(field.value) : ''}
                      />
                    )}
                  </Field>
                </FormItemcompact>
                <FormItemcompact
                  label="Date Of Death"
                  invalid={errors.DateOfDeath && touched.DateOfDeath}
                  errorMessage={errors.DateOfDeath}
                >
                  <Field name="DateOfDeath" placeholder="Date" size="sm">
                    {({ field, form }) => (
                      <DatePicker
                        field={field}
                        name="DateOfDeath"
                        size="sm"
                        minDate={dayjs(new Date(values.DateOfBirth))
                          .subtract(0, 'day')
                          .startOf('day')
                          .toDate()}
                        maxDate={dayjs(new Date())
                          .subtract(0, 'day')

                          .startOf('day')

                          .toDate()}
                        form={form}
                        prefix={<HiCake className="text-xl" />}
                        defaultValue={
                          validate(values.DateOfDeath)
                            ? new Date(values.DateOfDeath)
                            : ''
                        }
                        onChange={(date) => {
                          form.setFieldValue(
                            field.name,
                            convertDateToYMD(date),
                          );
                        }}
                        value={values.DateOfDeath ? new Date(field.value) : ''}
                      />
                    )}
                  </Field>
                </FormItemcompact>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <FormItemcompact
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field name="IsActive" component={Switcher} />
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

export default StarCastEdit;
