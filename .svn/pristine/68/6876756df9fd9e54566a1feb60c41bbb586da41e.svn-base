import {
  FormItemcompact,
  Switcher,
  Input,
  FormContainer,
  Select,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Poststate, Putstate } from 'services/MasterService';
import React, { forwardRef } from 'react';
import appConfig from 'configs/app.config';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

/* CONSTANTS */
// Regex
const ALPHABET_REGEX_WITH_SPACE = appConfig.validation.alphabetRegexWithSpace;
const ALPHABET_REGEX_WITHOUT_SPACE =
  appConfig.validation.alphabetRegexWithOutSpace;
const NUMERIC_REGEX = appConfig.validation.numericRegex;
// Field properties
const STATE_MIN_LENGTH = 3;
const STATE_MAX_LENGTH = 50;
const COUNTRY_CODE_MIN = 1;
const COUNTRY_CODE_MAX = 200;
const SHORT_NAME_MIN_LENGTH = 2;
const SHORT_NAME_MAX_LENGTH = 5;
const TIN_NO_MAX_LENGTH = 3;
// Formik Validations
const validationSchema = Yup.object().shape({
  StateName: Yup.string()
    .matches(ALPHABET_REGEX_WITH_SPACE, 'Invalid State!')
    .min(STATE_MIN_LENGTH, 'Too short!')
    .max(STATE_MAX_LENGTH, 'Too long!')
    .required('Required'),
  StateShortName: Yup.string()
    .matches(ALPHABET_REGEX_WITHOUT_SPACE, 'Invalid Short Name!')
    .min(SHORT_NAME_MIN_LENGTH, 'Too short!')
    .max(SHORT_NAME_MAX_LENGTH, 'Too long!')
    .required('Required'),
  CountryCode: Yup.number()
    .positive()
    .min(COUNTRY_CODE_MIN, 'Invalid country!')
    .max(COUNTRY_CODE_MAX, 'Invalid country!')
    .required('Required'),
  StateTinNo: Yup.number()
    .positive()
    .max(parseInt('9'.repeat(TIN_NO_MAX_LENGTH), 10), 'TIN No note supported!'),
});

const StateEdit = forwardRef((props, ref) => {
  const {
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    Country,
    setLoader,
    token,
  } = props;
  const initialFormikState = {
    StateCode: editData.StateCode || '',
    StateName: editData.StateName || '',
    StateShortName: editData.StateShortName || '',
    CountryCode: editData.Country?.CountryCode,
    StateTinNo: editData.StateTinNo || '',
    IsActive:
      editData.IsActive === undefined || editData.IsActive === 1 ? true : false,
  };

  /* EVENT HANDLERS */
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      if (!editData.StateCode) {
        new Promise((resolve, reject) => {
          setLoader(true);
          AddState(values, token)
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
        new Promise((resolve, reject) => {
          setLoader(true);
          setSubmitting(false);
          EditState(values, token)
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (value, field, setFieldValue) => {
    try {
      if (field === 'StateName') {
        if (ALPHABET_REGEX_WITH_SPACE.test(value)) {
          setFieldValue(field, value);
        }
      } else if (field === 'StateShortName') {
        if (ALPHABET_REGEX_WITHOUT_SPACE.test(value)) {
          setFieldValue(field, value);
        }
      } else if (field === 'StateTinNo') {
        if (NUMERIC_REGEX.test(value) && value.length <= TIN_NO_MAX_LENGTH) {
          setFieldValue(field, value);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const AddState = async (values, token) => {
    try {
      const resp = await Poststate(values, token);

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

  const EditState = async (values, token) => {
    try {
      const resp = await Putstate(values, token);
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
        initialValues={initialFormikState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <FormContainer className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormItemcompact
                asterisk
                label="State Name"
                invalid={errors.StateName && touched.StateName}
                errorMessage={errors.StateName}
              >
                <Field name="StateName">
                  {({ field }) => (
                    <Input
                      type="text"
                      className="mt-1"
                      placeholder="State Name"
                      minLength={STATE_MIN_LENGTH}
                      maxLength={STATE_MAX_LENGTH}
                      size="sm"
                      value={values.StateName}
                      onChange={(e) => {
                        handleInput(e.target.value, field.name, setFieldValue);
                      }}
                    />
                  )}
                </Field>
              </FormItemcompact>
              <FormItemcompact
                asterisk
                label="Short Name"
                invalid={errors.StateShortName && touched.StateShortName}
                errorMessage={errors.StateShortName}
              >
                <Field name="StateShortName">
                  {({ field }) => (
                    <Input
                      type="text"
                      placeholder="Short Name"
                      className="mt-1"
                      minLength={SHORT_NAME_MIN_LENGTH}
                      maxLength={SHORT_NAME_MAX_LENGTH}
                      size="sm"
                      value={values.StateShortName}
                      onChange={(e) => {
                        handleInput(e.target.value, field.name, setFieldValue);
                      }}
                    />
                  )}
                </Field>
              </FormItemcompact>
              <FormItemcompact
                asterisk
                label="Country"
                invalid={errors.CountryCode && touched.CountryCode}
                errorMessage={errors.CountryCode}
                style={{ width: '250px' }}
              >
                <Field name="CountryCode">
                  {({ field }) => (
                    <Select
                      field={field}
                      className="mt-1"
                      options={Country}
                      value={Country.filter(
                        (option) => option.value === values.CountryCode,
                      )}
                      onChange={(option) =>
                        setFieldValue(field.name, option?.value)
                      }
                      placeholder="Select"
                    />
                  )}
                </Field>
              </FormItemcompact>
              <FormItemcompact
                label="State TIN No"
                invalid={errors.StateTinNo && touched.StateTinNo}
                errorMessage={errors.StateTinNo}
              >
                <Field name="StateTinNo">
                  {({ field }) => (
                    <Input
                      className="mt-1"
                      type="text"
                      placeholder="TIN No"
                      maxLength={TIN_NO_MAX_LENGTH}
                      size="sm"
                      value={values.StateTinNo}
                      onChange={(e) => {
                        handleInput(e.target.value, field.name, setFieldValue);
                      }}
                    />
                  )}
                </Field>
              </FormItemcompact>
              <FormItemcompact
                label="Status"
                invalid={errors.IsActive && touched.IsActive}
                errorMessage={errors.IsActive}
              >
                <Field name="IsActive" component={Switcher} />
              </FormItemcompact>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default StateEdit;
