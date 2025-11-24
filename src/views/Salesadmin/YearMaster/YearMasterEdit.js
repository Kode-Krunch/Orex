import {
  FormItemcompact,
  Switcher,
  Input,
  FormContainer,
  DatePicker,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AddYear, UpdateYear } from 'services/SalesAdminService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { convertDateToYMD, validate } from 'components/validators';
import { HiCake } from 'react-icons/hi';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  Description: Yup.string()
    .matches(/^[-0-9.]+$/, 'Only numeric characters are allowed')
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  StartDate: Yup.date().required('Required'),
  EndDate: Yup.date().required('Required'),
  IsActive: Yup.string().required('Required'),
});

const YearMasterEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, submitCallback } = props;

  const token = useSelector((state) => state.auth.session.token);

  const AddYears = async (values, token) => {
    try {
      const resp = await AddYear(values, token);
      if (resp.data.msg === 'success') {
        setlog('success');
        setMessage('Data Inserted Successfully.');
        return;
      } else if (resp.data.msg === 'Server Error.') {
        setlog('error');
        setMessage('Server Error.');
        return;
      }
    } catch (errors) {
      return {};
    }
  };

  const UpdateYears = async (values, token) => {
    try {
      const resp = await UpdateYear(values, token);
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'Year Description Already Exists') {
        setlog('warning');
        setMessage(resp.data.msg);
        return;
      }
    } catch (errors) {
      return {};
    }
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          Yearcode: editData.Yearcode || '',
          Description: editData.Description || '',
          StartDate: editData.StartDate || '',
          EndDate: editData.EndDate || '',
          IsActive:
            editData.IsActive === 1 || editData.IsActive === undefined
              ? true
              : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.Yearcode) {
              new Promise((resolve, reject) => {
                AddYears(values, token)
                  .then(async (response) => {
                    if (typeof submitCallback === 'function')
                      await submitCallback();
                    onDrawerClose(0, 0);
                    resetForm();
                    openNotification(
                      'success',
                      'Year description added successfully',
                    );
                    resolve(response);
                  })
                  .catch((errors) => {
                    openNotification('danger', 'Something went wrong');
                    reject(errors);
                  });
              });
            } else {
              new Promise((resolve, reject) => {
                setSubmitting(false);
                UpdateYears(values, token)
                  .then((response) => {
                    onDrawerClose(0, 0);
                    openNotification(
                      'success',
                      'Year description updated successfully',
                    );
                    resolve(response);
                  })
                  .catch((errors) => {
                    openNotification('danger', 'Something went wrong');
                    reject(errors);
                  });
              });
            }
          }, 400);
        }}
      >
        {({ values, touched, errors }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                <div className="col-span-2 ">
                  <Field
                    size="sm"
                    type="Yearcode"
                    autoComplete="off"
                    name="Yearcode"
                    placeholder="Yearcode"
                    component={Input}
                    hidden
                  />
                  <FormItemcompact
                    asterisk
                    label="Year Description"
                    invalid={errors.Description && touched.Description}
                    errorMessage={errors.Description}
                  >
                    <Field
                      size="sm"
                      autoComplete="on"
                      name="Description"
                      placeholder="Description"
                      className="mt-1"
                      component={Input}
                    />
                  </FormItemcompact>
                </div>
                <FormItemcompact
                  label="Start Date"
                  asterisk
                  invalid={errors.StartDate && touched.StartDate}
                  errorMessage={errors.StartDate}
                >
                  <Field name="StartDate" placeholder="Start Date" size="sm">
                    {({ field, form }) => (
                      <DatePicker
                        field={field}
                        name="StartDate"
                        size="sm"
                        className="mt-1"
                        form={form}
                        prefix={<HiCake className="text-xl" />}
                        placeholder="Select"
                        defaultValue={
                          validate(values.StartDate)
                            ? new Date(values.StartDate)
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
                <FormItemcompact
                  label="End Date"
                  asterisk
                  invalid={errors.EndDate && touched.EndDate}
                  errorMessage={errors.EndDate}
                >
                  <Field name="EndDate" placeholder="" size="sm">
                    {({ field, form }) => (
                      <DatePicker
                        disabled={!values.StartDate}
                        field={field}
                        name="EndDate"
                        size="sm"
                        className="mt-1"
                        form={form}
                        prefix={<HiCake className="text-xl" />}
                        placeholder="Select"
                        defaultValue={
                          validate(values.EndDate)
                            ? new Date(values.EndDate)
                            : ''
                        }
                        minDate={
                          new Date(
                            new Date(values.StartDate).setDate(
                              new Date(values.StartDate).getDate() + 1,
                            ),
                          )
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

export default YearMasterEdit;
