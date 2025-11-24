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
import { Postcreditrate, Putcreditrate } from 'services/CreditcontrolService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { useFormik } from 'formik';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  CreditRateName: Yup.string()
    .min(1, 'Too Short!')
    .max(21, 'Too Long!')
    .required('CreditRate Name Required'),
  ShortName: Yup.string()
    .min(1, 'Too Short!')
    .max(5, 'Too Long!')
    .required('Short Name Required'),
  CreditLowerLimit: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric characters are allowed')
    .min(1, 'Too Short!')
    .max(8, 'Too Long!')
    .required('Credit Lower Limit Required'),
  CreditUpperLimit: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric characters are allowed')
    .min(1, 'Too Short!')
    .max(8, 'Too Long!')
    .required('Credit Upper Limit Required'),
  CreditPeriod: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric characters are allowed')
    .min(1, 'Too Short!')
    .max(4, 'Too Long!')
    .required('Credit Period Required'),

  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];

const CreditrateEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, currency } = props;

  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddCreditrate = async (values, token) => {
    try {
      const resp = await Postcreditrate(values, token);
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
  const EditCreditrate = async (values, token) => {
    try {
      const resp = await Putcreditrate(values, token);
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
          CreditRateCode: editData.CreditRateCode || '',
          CreditRateName: editData.CreditRateName || '',
          ShortName: editData.ShortName || '',
          CreditLowerLimit: editData.CreditLowerLimit || '',
          CreditUpperLimit: editData.CreditUpperLimit || '',
          CreditPeriod: editData.CreditPeriod || '',
          IsActive: editData.IsActive === 1 ? true : false || '',
          ShareDifference: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.CreditRateCode) {
              new Promise((resolve, reject) => {
                AddCreditrate(values, token)
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
                EditCreditrate(values, token)
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
                type="CreditRateCode"
                autoComplete="off"
                name="CreditRateCode"
                component={Input}
                hidden
              />
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                <FormItemcompact
                  asterisk
                  label="CreditRate Name"
                  invalid={errors.CreditRateName && touched.CreditRateName}
                  errorMessage={errors.CreditRateName}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="21"
                    autoComplete="off"
                    name="CreditRateName"
                    component={Input}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="Short Name"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="20"
                    autoComplete="off"
                    name="ShortName"
                    component={Input}
                  />
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Credit Upper Limit"
                  invalid={errors.CreditUpperLimit && touched.CreditUpperLimit}
                  errorMessage={errors.CreditUpperLimit}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="CreditUpperLimit"
                    placeholder="CreditUpperLimit"
                  >
                    {({ field, form }) => (
                      <Input
                        type="text"
                        size="sm"
                        field={field}
                        form={form}
                        onChange={(option) => {
                          // values.EpisodeDuration = '';
                          form.setFieldValue('CreditLowerLimit', '');
                          if (/^[0-9\s-/]*$/.test(option.target.value)) {
                            form.setFieldValue(
                              field.name,
                              Number(option.target.value),
                            );
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="Credit Lower Limit"
                  invalid={errors.CreditLowerLimit && touched.CreditLowerLimit}
                  errorMessage={errors.CreditLowerLimit}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="CreditLowerLimit"
                    placeholder="CreditLowerLimit"
                  >
                    {({ field, form }) => (
                      <Input
                        type="text"
                        size="sm"
                        field={field}
                        form={form}
                        onChange={(option) => {
                          console.log(
                            values.CreditUpperLimit > option.target.value,
                          );
                          if (
                            values.CreditUpperLimit >
                              Number(option.target.value) &&
                            /^[0-9\s-/]*$/.test(option.target.value)
                          ) {
                            form.setFieldValue(
                              field.name,
                              Number(option.target.value),
                            );
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="Credit Period"
                  invalid={errors.CreditPeriod && touched.CreditPeriod}
                  errorMessage={errors.CreditPeriod}
                >
                  <Field
                    size="sm"
                    autoComplete="off"
                    name="CreditPeriod"
                    component={Input}
                  />
                </FormItemcompact>

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
    </div>
  );
});
export default CreditrateEdit;
