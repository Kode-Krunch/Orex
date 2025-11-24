import {
  FormItemcompact,
  Switcher,
  Input,
  FormContainer,
  Select,
  DatePicker,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  Postratecard,
  Putratecard,
  apiGetTimeBandmaster,
} from 'services/CreditcontrolService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react';
import { convertDateToYMD, validate } from 'components/validators';
import {
  apiGetChannelmasterdrop,
  apiGetCurrencymasterdrop,
} from 'services/MasterService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  RateCardName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('RateCard Name Required'),

  ChannelCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Channel Required'),
  Rateper10sec: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Agency Share Required'),
  TimeBandCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Time Band Required'),
  CurrencyCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Currency Required'),
  // IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];

const RateCardEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, currency } = props;

  const token = useSelector((state) => state.auth.session.token);
  console.log('editData2024', editData);

  const AddRateCard = async (values, token) => {
    try {
      const resp = await Postratecard(values, token);
      if (resp.status == 200) {
        onDrawerClose(0, 0);
        openNotification('success', 'Data Inserted Successfully.');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        onDrawerClose(0, 0);
        openNotification('warning', 'Server Error.');
        return;
      }
    }
  };
  const EditRateCard = async (values, token) => {
    try {
      const resp = await Putratecard(values, token);
      //console.log(resp)

      if (resp.status == 200) {
        onDrawerClose(0, 0);
        openNotification('success', 'Data Updated Successfully');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        onDrawerClose(0, 0);
        openNotification('warning', 'Server Error.');
        return;
      }
    }
  };
  const [TimeBand, setTimeBand] = useState([]);
  const [channel, setchannel] = useState([]);
  const [Currency, setCurrency] = useState([]);
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  // useEffect(() => console.log(CurrencyCode), [CurrencyCode])
  useEffect(() => {
    (async (values) => {
      const Currency = await apiGetCurrencymasterdrop(values);
      const formattedOptions = Currency.data.map((option) => ({
        value: option.CurrencyCode,
        label: option.CurrencyName,
      }));
      setCurrency(formattedOptions);
    })();
    (async (values) => {
      const TimeBand = await apiGetTimeBandmaster(values);
      const formattedOptions = TimeBand.data.map((option) => ({
        value: option.TimeBandCode,
        label: option.TimeBandName,
      }));
      setTimeBand(formattedOptions);
    })();
    (async (values) => {
      const resp = await apiGetChannelmasterdrop(LoginId);
      console.log(resp.data);
      const data = resp.data.map((item) => ({
        value: item.ChannelCode,
        label: item.LocationName + ' ' + item.ChannelName,
        ChannelCode: item.ChannelCode,
        LocationCode: item.LocationCode,
        ChannelName: item.ChannelName,
        ColorClass: 'bg-rose-500',
        LocationName: item.LocationName,
        imgPath: item.Channel_Image,
      }));
      setchannel(data);
    })();
  }, []);
  console.log(editData);
  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          RateCardCode: editData.RateCardCode || '',
          Locationcode: editData.locations?.LocationCode || '',
          ChannelCode: editData.Channel?.ChannelCode || '',
          RateCardName: editData.RateCardName || '',
          TimeBandCode: editData.TimeBandCode || '',
          Rateper10sec: editData.Rateper10sec || '',
          Rateperspot: editData.Rateperspot || '',
          CurrencyCode: editData.CurrencyCode || '',
          EffectiveFrom: editData.EffectiveFrom || '',
          IsActive:
            editData.IsActive === 1 || editData.IsActive === undefined
              ? true
              : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.RateCardCode) {
              new Promise((resolve, reject) => {
                AddRateCard(values, token)
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
                EditRateCard(values, token)
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
              <div className="grid grid-cols-2 gap-3">
                <FormItemcompact
                  asterisk
                  label="Channel"
                  invalid={errors.ChannelCode && touched.ChannelCode}
                  errorMessage={errors.ChannelCode}
                  className="col-span-1"
                >
                  <Field size="sm" name="ChannelCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={channel}
                        value={channel.filter(
                          (option) => option.value === values.ChannelCode,
                        )}
                        onChange={(option) => {
                          form.setFieldValue(
                            'Locationcode',
                            option?.LocationCode,
                          );
                          form.setFieldValue(field.name, option?.value);
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="RateCard Name"
                  invalid={errors.RateCardName && touched.RateCardName}
                  errorMessage={errors.RateCardName}
                  className="col-span-1"
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="20"
                    autoComplete="off"
                    name="RateCardName"
                    placeholder="RateCardName"
                    component={Input}
                  />
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Currency"
                  invalid={errors.CurrencyCode && touched.CurrencyCode}
                  errorMessage={errors.CurrencyCode}
                  className="col-span-1"
                >
                  <Field size="sm" name="CurrencyCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={Currency}
                        value={Currency.filter(
                          (option) => option.value === values.CurrencyCode,
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
                  label="TimeBand"
                  invalid={errors.TimeBandCode && touched.TimeBandCode}
                  errorMessage={errors.TimeBandCode}
                >
                  <Field size="sm" name="TimeBandCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={TimeBand}
                        value={TimeBand.filter(
                          (option) => option.value === values.TimeBandCode,
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
                  label="Rate Per 10 Sec"
                  invalid={errors.Rateper10sec && touched.Rateper10sec}
                  errorMessage={errors.Rateper10sec}
                  className="col-span-1"
                >
                  <Field name="Rateper10sec" type="number">
                    {({ field, form }) => (
                      <Input
                        size="sm"
                        field={field}
                        form={form}
                        type="number"
                        value={values.Rateper10sec}
                        onChange={(option) => {
                          console.log(option);
                          let inputValue = option.target.value;
                          console.log(inputValue.length);
                          values.CompanyShare = 100 - inputValue;
                          if (
                            inputValue.length <= 8 &&
                            /^[0-9\s]*$/.test(inputValue)
                          ) {
                            form.setFieldValue(field.name, inputValue);
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Rate Per Spot"
                  invalid={errors.Rateperspot && touched.Rateperspot}
                  errorMessage={errors.Rateperspot}
                  className="col-span-1"
                >
                  <Field name="Rateperspot" type="number">
                    {({ field, form }) => (
                      <Input
                        size="sm"
                        field={field}
                        form={form}
                        type="number"
                        value={values.Rateperspot}
                        onChange={(option) => {
                          console.log(option);
                          let inputValue = option.target.value;
                          console.log(inputValue.length);
                          values.CompanyShare = 100 - inputValue;
                          if (
                            inputValue.length <= 8 &&
                            /^[0-9\s]*$/.test(inputValue)
                          ) {
                            form.setFieldValue(field.name, inputValue);
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label=" Effective From"
                  invalid={errors.Rateperspot && touched.Rateperspot}
                  errorMessage={errors.Rateperspot}
                  className="col-span-1"
                >
                  <Field name="EffectiveFrom">
                    {({ field, form }) => (
                      <DatePicker
                        size="sm"
                        field={field}
                        form={form}
                        value={
                          validate(values.EffectiveFrom)
                            ? new Date(values.EffectiveFrom)
                            : values.EffectiveFrom == null
                            ? null
                            : null
                        }
                        onChange={(option) => {
                          console.log(option);

                          form.setFieldValue(
                            field.name,
                            convertDateToYMD(option),
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
                  className="col-span-1"
                >
                  <div>
                    <Field name="IsActive" component={Switcher} />
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
export default RateCardEdit;
