import {
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
  FormItem,
  DatePicker,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { PostExchange, PutExchange } from 'services/CreditcontrolService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { useFormik } from 'formik';
import CurrencyDropDown from 'components/common/CurrencyDropDown';
import { HiCake } from 'react-icons/hi';
import { convertDateToYMD, validate } from 'components/validators';

const validationSchema = Yup.object().shape({
  CurrencyCode: Yup.string().required('currency Name Required'),
  ExchangeFromDt: Yup.string().required('From Date Required'),
  //  ExchangeToDt: Yup.string()
  //   .required('To Date  Required'),
  ConversionRate: Yup.string()
    .matches(/^[0-9.]+$/, 'Only numeric characters are allowed')
    .min(1, 'Too Short!')
    .max(8, 'Too Long!')
    .required('Conversion Rate Required'),

  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];

const ExchangeEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, currency } = props;

  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)
  console.log('currency', editData);

  const AddExchange = async (values, token) => {
    console.log('values', values);
    try {
      const resp = await PostExchange(values, token);
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
  const EditExchange = async (values, token) => {
    try {
      const resp = await PutExchange(values, token);
      //console.log(resp)
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'Exchange Already Exists') {
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
          Id: editData.Id || '',
          CurrencyCode: editData.currency?.CurrencyCode || '',
          ExchangeFromDt: editData.ExchangeFromDt || '',
          //ExchangeToDt: editData.ExchangeToDt || '',
          ConversionRate: editData.ConversionRate || '',
          IsActive: editData.IsActive === 1 ? true : false || true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.Id) {
              new Promise((resolve, reject) => {
                AddExchange(values, token)
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
                EditExchange(values, token)
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
                type="Id"
                autoComplete="off"
                name="Id"
                component={Input}
                hidden
              />
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                <FormItem
                  asterisk
                  label="Currency"
                  invalid={errors.CurrencyCode && touched.CurrencyCode}
                  errorMessage={errors.CurrencyCode}
                  style={{ width: '250px' }}
                >
                  <Field
                    size="sm"
                    name="CurrencyCode"
                    style={{ width: '250px' }}
                  >
                    {({ field, form }) => (
                      <Select
                        style={{ width: '250px' }}
                        field={field}
                        form={form}
                        className="mb-4 w-50"
                        options={currency}
                        value={currency.filter(
                          (option) => option.value === values.CurrencyCode,
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                      />
                    )}
                  </Field>
                </FormItem>

                <div></div>
                <FormItem label="Exchange From Date" asterisk>
                  <Field name="ExchangeFromDt" size="sm">
                    {({ field, form }) => (
                      <DatePicker
                        field={field}
                        name="ExchangeFromDt"
                        size="sm"
                        form={form}
                        prefix={<HiCake className="text-xl" />}
                        defaultValue={
                          validate(values.ExchangeFromDt)
                            ? new Date(values.ExchangeFromDt)
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
                </FormItem>
                {/* <FormItem label="Exchange To Date" >
                                    <Field

                                        name="ExchangeToDt" size="sm">
                                        {({ field, form }) => (
                                            <DatePicker

                                                field={field}
                                                name="ExchangeToDt"
                                                size="sm"
                                                form={form}
                                                prefix={<HiCake className="text-xl" />}
                                                defaultValue={
                                                    validate(values.ExchangeToDt)
                                                        ? new Date(values.ExchangeToDt)
                                                        : ''
                                                }

                                                onChange={(date) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        convertDateToYMD(date)
                                                    )
                                                }}

                                            />
                                        )}
                                    </Field>
                                </FormItem> */}

                <FormItem
                  asterisk
                  label="Conversion Rate"
                  invalid={errors.ConversionRate && touched.ConversionRate}
                  errorMessage={errors.ConversionRate}
                >
                  <Field
                    size="sm"
                    maxlength="20"
                    autoComplete="off"
                    name="ConversionRate"
                    component={Input}
                  />
                </FormItem>

                <FormItem
                  label="IsActive"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field name="IsActive" component={Switcher} />
                  </div>
                </FormItem>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});
export default ExchangeEdit;
