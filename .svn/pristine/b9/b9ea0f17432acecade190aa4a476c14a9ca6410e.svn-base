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
import { PostTimeBand, PutTimeBand } from 'services/CreditcontrolService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useState } from 'react';
import {
  handleBlur,
  handleChangeWithFrameSingleWithoutffFormik,
  isValidTimeRange,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';

// Custom validation function to compare start and end times

const validationSchema = Yup.object().shape({
  TimeBandName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('TimeBand Name Required'),
  StartTime: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Start Time Required'),
  EndTime: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('End Time Required'),
  IsActive: Yup.string().required('IsActives Required'),
  ShortName: Yup.string()
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Short Name Required'),
  rememberMe: Yup.bool(),
});

const TimebandEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;
  const [errorshwo, seterrorshwo] = useState(true);

  const token = useSelector((state) => state.auth.session.token);

  const AddTimeband = async (values, token) => {
    try {
      const resp = await PostTimeBand(values, token);
      if (resp.status == 200) {
        openNotification('success', 'Data Inserted Successfully.');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        openNotification('warning', 'Server Error.');
        return;
      }
    }
  };

  const EditTimeband = async (values, token) => {
    try {
      const resp = await PutTimeBand(values, token);
      if (resp.status == 200) {
        openNotification('success', 'Data Update Successfully');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        openNotification('warning', 'Server Error.');
        return;
      }
    }
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          TimeBandCode: editData.TimeBandCode || '',
          TimeBandName: editData.TimeBandName || '',
          ShortName: editData.ShortName || '',
          StartTime: editData.StartTime || '',
          EndTime: editData.EndTime || '',
          IsActive: editData.IsActive === 1 ? true : false || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.TimeBandCode) {
              new Promise((resolve, reject) => {
                if (errorshwo) {
                  AddTimeband(values, token)
                    .then((response) => {
                      onDrawerClose(0, 0);
                      resolve(response);
                    })
                    .catch((errors) => {
                      reject(errors);
                    });
                }
              });
            } else {
              new Promise((resolve, reject) => {
                setSubmitting(false);
                if (errorshwo) {
                  EditTimeband(values, token)
                    .then((response) => {
                      onDrawerClose(0, 0);
                      resolve(response);
                    })
                    .catch((errors) => {
                      reject(errors);
                    });
                }
              });
            }
            resetForm();
          }, 400);
        }}
      >
        {({ values, touched, errors }) => {
          const { StartTime, EndTime } = values;
          return (
            <Form>
              <FormContainer>
                <div>
                  <Field
                    size="sm"
                    type="TimeBandCode"
                    autoComplete="off"
                    name="TimeBandCode"
                    placeholder="TimeBand Name"
                    component={Input}
                    hidden
                  />
                  <FormItemcompact
                    asterisk
                    label="TimeBand Name"
                    invalid={errors.TimeBandName && touched.TimeBandName}
                    errorMessage={errors.TimeBandName}
                  >
                    <Field
                      size="sm"
                      type="text"
                      maxlength="25"
                      autoComplete="off"
                      name="TimeBandName"
                      placeholder="TimeBand Name"
                      component={Input}
                    />
                  </FormItemcompact>
                </div>
                <div>
                  <FormItemcompact
                    asterisk
                    label="Short Name"
                    invalid={errors.ShortName && touched.ShortName}
                    errorMessage={errors.ShortName}
                  >
                    <Field
                      size="sm"
                      type="text"
                      maxlength="10"
                      autoComplete="off"
                      name="ShortName"
                      placeholder="ShortName"
                      component={Input}
                    />
                  </FormItemcompact>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                  <FormItemcompact
                    asterisk
                    label="Start Time"
                    invalid={
                      (errors.StartTime && touched.StartTime) || !errorshwo
                    }
                    errorMessage={
                      errors.StartTime ||
                      (!errorshwo && 'Greater Then End Time')
                    }
                  >
                    <Field size="sm" name="StartTime">
                      {({ field, form }) => (
                        <Input
                          field={field}
                          maxLength="12"
                          form={form}
                          size="sm"
                          value={values.StartTime}
                          onChange={(e) => {
                            handleChangeWithFrameSingleWithoutffFormik(
                              e,
                              form,
                              field,
                            );
                          }}
                          onBlur={(e) => {
                            handleBlur(e, form, field);

                            if (StartTime && EndTime) {
                              seterrorshwo(
                                isValidTimeRange(StartTime, EndTime),
                              );
                            }
                          }}
                        />
                      )}
                    </Field>
                  </FormItemcompact>
                  <div>
                    <p>{errorshwo}</p>
                    <FormItemcompact
                      asterisk
                      label="End Time"
                      invalid={
                        (errors.EndTime && touched.EndTime) || !errorshwo
                      }
                      errorMessage={
                        errors.EndTime || (!errorshwo && 'Less Then Start Time')
                      }
                    >
                      <Field size="sm" name="EndTime">
                        {({ field, form }) => (
                          <Input
                            field={field}
                            maxLength="12"
                            form={form}
                            size="sm"
                            value={values.EndTime}
                            onChange={(e) => {
                              handleChangeWithFrameSingleWithoutffFormik(
                                e,
                                form,
                                field,
                              );
                            }}
                            onBlur={(e) => {
                              handleBlur(e, form, field);
                              if (StartTime && EndTime) {
                                console.log(
                                  isValidTimeRange(StartTime, EndTime),
                                );
                                seterrorshwo(
                                  isValidTimeRange(StartTime, EndTime),
                                );
                              }
                            }}
                          />
                        )}
                      </Field>
                    </FormItemcompact>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                  <FormItemcompact
                    label="IsActive"
                    invalid={errors.IsActive && touched.IsActive}
                    errorMessage={errors.IsActive}
                  >
                    <div>
                      <Field name="IsActive" component={Switcher} />
                    </div>
                  </FormItemcompact>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});

export default TimebandEdit;
