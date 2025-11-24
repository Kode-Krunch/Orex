import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Posthouseid, Puthouseid } from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { isChar, isInitial, isName } from 'components/validators';

const validationSchema = Yup.object().shape({
  ChannelCode: Yup.string().required(' Required'),
  FormName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required(' Required'),
  EventTypeCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Initial: Yup.string()
    .min(1, 'Too Short!')
    .max(6, 'Too Long!')
    .required(' Required'),
  NoOfDigit: Yup.string()
    .min(1, 'Too Short!')
    .max(2, 'Too Long!')
    .required('Kindly Enter No. of digits'),
  Seperator: Yup.string().max(2, 'Too Long!'),

  CurrentCount: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric characters are allowed')
    .min(1, 'Too Short!')
    .max(8, 'Too Long!')
    .required('Required'),
  IsActive: Yup.string().required(' Required'),
});

const HouseIdEdit = forwardRef((props, ref) => {
  const {
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    channel,
    Event,

    Formname,
    getEventTypeCode,
    setform,
  } = props;
  const token = useSelector((state) => state.auth.session.token);

  const AddHouseId = async (values, token) => {
    try {
      const resp = await Posthouseid(values, token);

      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Inserted Successfully.');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        setlog('error');
        setMessage('Server Error.');
        return;
      }
    }
  };
  const EditHouseId = async (values, token) => {
    try {
      const resp = await Puthouseid(values, token);

      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        setlog('error');
        setMessage('Server Error.');
        return;
      }
    }
  };
  console.log(editData);
  useEffect(() => {
    console.log(editData.FormName);
    getEventTypeCode(editData.FormName);
  }, [editData.Id]);

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          Id: editData.Id || '',
          LocationCode: editData.locations?.LocationCode || '',
          ChannelCode: editData.Channel?.ChannelCode || '',
          ChannelCodeString:
            editData.locations?.LocationCode +
            '-' +
            editData.Channel?.ChannelCode || '',
          FormName: editData.FormName || '',
          EventTypeCode: editData.EventTypeCode || '',
          Initial: editData.Initial || '',
          Seperator: editData.Seperator || '',
          NoOfDigit: editData.NoOfDigit || '',
          CurrentCount: editData.CurrentCount || '',

          IsActive: editData.IsActive === 1 ? true : false || true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);
          setTimeout(() => {
            if (!editData.Id) {
              new Promise((resolve, reject) => {
                AddHouseId(values, token)
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
                EditHouseId(values, token)
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
                <div className="col-span-1">
                  <FormItem
                    asterisk
                    label="Channel"
                    invalid={errors.ChannelCode && touched.ChannelCode}
                    errorMessage={errors.ChannelCode}
                  >
                    <Field size="sm" name="ChannelCodeString">
                      {({ field, form }) => (
                        <Select
                          field={field}
                          form={form}
                          isDisabled={editData.Id ? true : false}
                          placeholder="Select"
                          options={channel}
                          value={channel.filter(
                            (option) =>
                              option.value == values.ChannelCodeString,
                          )}
                          onChange={(option) => {
                            form.setFieldValue(
                              'ChannelCode',
                              option.ChannelCode,
                            );
                            form.setFieldValue(
                              'LocationCode',
                              option.LocationCode,
                            );
                            form.setFieldValue(field.name, option.value);
                          }}
                        />
                      )}
                    </Field>
                  </FormItem>
                </div>
                <div className="col-span-1">
                  <FormItem
                    asterisk
                    label="Form Name"
                    invalid={errors.FormName && touched.FormName}
                    errorMessage={errors.FormName}
                  >
                    <Field size="sm" name="FormName">
                      {({ field, form }) => (
                        <Select
                          field={field}
                          form={form}
                          isDisabled={editData.Id ? true : false}
                          placeholder="Select"
                          options={Formname}
                          value={Formname.filter(
                            (option) => option.value === values.FormName,
                          )}
                          onChange={(option) => {
                            //

                            getEventTypeCode(option?.value);
                            form.setFieldValue(field.name, option?.value);
                          }}
                        />
                      )}
                    </Field>
                  </FormItem>
                </div>
                <div className="col-span-1">
                  <FormItem
                    asterisk
                    label="Event Type"
                    invalid={errors.EventTypeCode && touched.EventTypeCode}
                    errorMessage={errors.EventTypeCode}
                  >
                    <Field size="sm" name="EventTypeCode">
                      {({ field, form }) => (
                        <Select
                          field={field}
                          isDisabled={editData.Id ? true : false}
                          form={form}
                          placeholder="Select"
                          options={Event}
                          value={Event.filter(
                            (option) => option.value == values.EventTypeCode,
                          )}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option?.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                </div>

                <div className="col-span-1">
                  <FormItem
                    asterisk
                    label="Initial"
                    invalid={errors.Initial && touched.Initial}
                    errorMessage={errors.Initial}
                  >
                    <Field
                      size="sm"
                      type="Initial"
                      maxlength="6"
                      autoComplete="off"
                      name="Initial"
                      placeholder="Initial"
                      component={Input}
                      onChange={(e) => {
                        const newValue = e.target.value;

                        if (isInitial(newValue)) {
                          setFieldValue('Initial', newValue);
                        }
                      }}
                    />
                  </FormItem>
                </div>
                <div className="col-span-1">
                  <FormItem
                    label="Seperator"
                    invalid={errors.Seperator && touched.Seperator}
                    errorMessage={errors.Seperator}
                  >
                    <Field name="Seperator">
                      {({ field, form }) => {
                        return (
                          <Input
                            focused
                            maxlength="4"
                            size="sm"
                            form={form}
                            field={field}
                            name="Seperator"
                            placeholder="Seperator /-"
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              const allowedCharacters = inputValue.replace(
                                /[^a-zA-Z0-9/-]/g,
                                '',
                              ); // Replace characters other than letters, numbers, '-', and '/'

                              form.setFieldValue(field.name, allowedCharacters);
                            }}
                          />
                        );
                      }}
                    </Field>
                  </FormItem>
                </div>
                <div className="col-span-1">
                  <FormItem
                    asterisk
                    label="No. of Digits"
                    invalid={errors.NoOfDigit && touched.NoOfDigit}
                    errorMessage={errors.NoOfDigit}
                  >
                    <Field name="NoOfDigit">
                      {({ field, form }) => {
                        return (
                          <Input
                            focused
                            // maxlength="2"
                            size="sm"
                            form={form}
                            field={field}
                            name="NoOfDigit"
                            placeholder="No. Of Digit"
                            onChange={(e) => {
                              const result = e.target.value.replace(/\D/g, '');

                              if (result === '0') {
                                result = '1';
                              }
                              if (result < 16) {
                                form.setFieldValue(field.name, result);
                                form.setFieldValue('CurrentCount', '');
                              }
                              if (result == '') {
                                form.setFieldValue(field.name, '');
                                form.setFieldValue('CurrentCount', '');
                              }
                            }}
                          />
                        );
                      }}
                    </Field>
                  </FormItem>
                </div>
                <div className="col-span-1">
                  <FormItem
                    asterisk
                    label="Current Count"
                    invalid={errors.CurrentCount && touched.CurrentCount}
                    errorMessage={errors.CurrentCount}
                  >
                    <Field name="CurrentCount">
                      {({ field, form }) => {
                        return (
                          <Input
                            focused
                            maxlength={values.NoOfDigit}
                            size="sm"
                            form={form}
                            field={field}
                            name="CurrentCount"
                            placeholder="Current Count"
                            onChange={(e) => {
                              const result = e.target.value.replace(/\D/g, '');
                              if (result) {
                                form.setFieldValue(field.name, result);
                              }
                              if (result == '') {
                                form.setFieldValue(field.name, '');
                              }
                            }}
                          />
                        );
                      }}
                    </Field>
                  </FormItem>
                </div>
                <div className="col-span-1">
                  <FormItem
                    label="Status"
                    invalid={errors.IsActive && touched.IsActive}
                    errorMessage={errors.IsActive}
                  >
                    <div>
                      <Field size="sm" name="IsActive" component={Switcher} />
                    </div>
                  </FormItem>
                </div>
              </div>
              <br></br>
              <br />
              <div className="col-span-1">
                <h1>
                  {values.Initial +
                    values.Seperator +
                    values.CurrentCount.toString().padStart(
                      values.NoOfDigit,
                      '0',
                    )}
                </h1>
              </div>
              {/* <FormItem>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItem> */}
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default HouseIdEdit;
