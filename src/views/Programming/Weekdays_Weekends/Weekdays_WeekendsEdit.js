import React, { useState, forwardRef } from 'react';
import {
  Checkbox,
  FormContainer,
  FormItem,
  FormItemcompact,
  Input,
  Switcher,
} from 'components/ui';
import {
  Postweekdaysweekendsmaster,
  Putweekdaysweekendsmaster,
} from 'services/ProgrammingService';
import { Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
const validationSchema = Yup.object().shape({
  Weekend_WeekDays: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Weekend_WeekDays Required'),
  multipleCheckbox: Yup.array().min(1, 'Select at least one option!'),
});
const Weekdays_WeekendsEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;
  const token = useSelector((state) => state.auth.session.token);
  console.log(editData);
  const Addweekendsmaster = async (values, token) => {
    // console.log(values)
    const weekdaysName = values['Weekend_WeekDays'];
    const isActive = 1;

    const outputObject = {
      Weekdays: {
        WeekdaysName: weekdaysName,
        IsActive: isActive,
      },
      Details: values['multipleCheckbox'].map((day) => ({
        Day: day,
      })),
    };

    try {
      const resp = await Postweekdaysweekendsmaster(outputObject, token);
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
  const Editweekendsmaster = async (values, token) => {
    try {
      const weekdaysName = values['Weekend_WeekDays'];
      const isActive = values.IsActive;

      const outputObject = {
        Weekdays: {
          WeekdaysName: weekdaysName,
          IsActive: isActive,
        },
        Details: values['multipleCheckbox'].map((day) => ({
          Day: day,
        })),
      };
      console.log(outputObject);
      const resp = await Putweekdaysweekendsmaster(
        outputObject,
        token,
        values.WeekdaysCode,
      );
      //console.log(resp)
      if (resp.status == 200) {
        openNotification('success', 'Data Updated Successfully');
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
          WeekdaysCode: editData.WeekdaysCode || '',
          multipleCheckbox: editData.daysCode || [],
          Weekend_WeekDays: editData.name || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.WeekdaysCode) {
              new Promise((resolve, reject) => {
                Addweekendsmaster(values, token)
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
                Editweekendsmaster(values, token)
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
              <div className="col-span-4">
                <Field
                  type="text"
                  name="WeekdaysCode"
                  hidden
                  component={Input}
                />
                <FormItem
                  asterisk
                  label="Weekend/WeekDays Name"
                  invalid={errors.Weekend_WeekDays && touched.Weekend_WeekDays}
                  errorMessage={errors.Weekend_WeekDays}
                >
                  <Field
                    type="text"
                    name="Weekend_WeekDays"
                    maxLength="20"
                    // placeholder="Weekend/WeekDays Name"
                    component={Input}
                  />
                </FormItem>
              </div>

              <FormItem
                asterisk
                label="Days"
                invalid={Boolean(
                  errors.multipleCheckbox && touched.multipleCheckbox,
                )}
                errorMessage={errors.multipleCheckbox}
              >
                <Field name="multipleCheckbox">
                  {({ field, form }) => (
                    <>
                      <Checkbox.Group
                        value={values.multipleCheckbox}
                        vertical
                        onChange={(options) =>
                          form.setFieldValue(field.name, options)
                        }
                      >
                        <Checkbox name={field.name} value={0}>
                          Sunday
                        </Checkbox>

                        <Checkbox name={field.name} value={1}>
                          Monday
                        </Checkbox>

                        <Checkbox name={field.name} value={2}>
                          Tuesday{' '}
                        </Checkbox>

                        <Checkbox name={field.name} value={3}>
                          Wednesday
                        </Checkbox>

                        <Checkbox name={field.name} value={4}>
                          Thursday
                        </Checkbox>

                        <Checkbox name={field.name} value={5}>
                          Friday
                        </Checkbox>

                        <Checkbox name={field.name} value={6}>
                          Saturday
                        </Checkbox>
                      </Checkbox.Group>
                    </>
                  )}
                </Field>
              </FormItem>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
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
        )}
      </Formik>

      {/* {({ values, touched, errors }) => (
                    <Form>
                        <FormContainer>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4">
                   <FormItem
                                asterisk
                                label="Input"
                                invalid={errors.input && touched.input}
                                errorMessage={errors.input}
                            >
                                <Field
                                    type="text"
                                    name="input"
                                    placeholder="Input"
                                    component={Input}
                                />
                            </FormItem>
                </div>
                <div className="col-span-4">
                    <Checkbox.Group
                        value={checkboxList}
                        onChange={onCheckboxChange}
                    >
                        <div className="grid grid-cols-3 gap-4">
                            <Checkbox value={1}>Sunday</Checkbox>
                            <Checkbox value={2}>Monday</Checkbox>
                            <Checkbox value={3}>Tuesday </Checkbox>
                            <Checkbox value={4}>Wednesday</Checkbox>
                            <Checkbox value={5}>Thursday</Checkbox>
                            <Checkbox value={6}>Friday</Checkbox>
                            <Checkbox value={7}>Saturday</Checkbox>
                        </div>
                    </Checkbox.Group>
                </div>
            </div>
            </FormContainer>
            </Form> */}
    </div>
  );
});

export default Weekdays_WeekendsEdit;
