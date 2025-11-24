import { FormItemcompact, Switcher, Input, FormContainer } from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Postpayroute, Putpayroute } from 'services/CreditcontrolService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  PayRouteName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Payroute Name Required'),
  AgencyShare: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Agency Share Required'),
  CompanyShare: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Company Share Required'),
  ShortName: Yup.string()
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .required('ShortName Required'),
  rememberMe: Yup.bool(),
});

const PayrouteEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;

  const token = useSelector((state) => state.auth.session.token);

  const AddPayroute = async (values, token) => {
    try {
      const resp = await Postpayroute(values, token);
      //console.log(resp)
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
      if (resp.status == 200) {
        openNotification('success', 'Data Insert Successfully');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        openNotification('warning', 'Server Error.');
        return;
      }
    }
  };

  const EditPayroute = async (values, token) => {
    try {
      const resp = await Putpayroute(values, token);
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
          PayRouteCode: editData.PayRouteCode || '',
          PayRouteName: editData.PayRouteName || '',
          ShortName: editData.ShortName || '',
          AgencyShare: editData.AgencyShare || '',
          CompanyShare: editData.CompanyShare || '',
          IsActive:
            editData.IsActive === 1 || editData.IsActive === undefined
              ? true
              : false,
          ShareDifference: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.PayRouteCode) {
              new Promise((resolve, reject) => {
                AddPayroute(values, token)
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
                EditPayroute(values, token)
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
              <div>
                <Field
                  size="sm"
                  type="PayRouteCode"
                  autoComplete="off"
                  name="PayRouteCode"
                  placeholder="PayRoute Name"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="Payroute Name"
                  invalid={errors.PayRouteName && touched.PayRouteName}
                  errorMessage={errors.PayRouteName}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="20"
                    autoComplete="off"
                    name="PayRouteName"
                    placeholder="Payroute Name"
                    component={Input}
                  />
                </FormItemcompact>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
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
                    placeholder="ShortName"
                    component={Input}
                  />
                </FormItemcompact>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                <FormItemcompact
                  asterisk
                  label="Agency Share"
                  invalid={errors.AgencyShare && touched.AgencyShare}
                  errorMessage={errors.AgencyShare}
                >
                  <Field name="AgencyShare" type="text">
                    {({ field, form }) => (
                      <Input
                        size="sm"
                        field={field}
                        form={form}
                        maxLength="3"
                        type="text"
                        value={values.AgencyShare}
                        onChange={(option) => {
                          let value = option.target.value;
                          if (/^[0-9\s]*$/.test(value) && value <= 100) {
                            values.CompanyShare = 100 - value;
                            form.setFieldValue(field.name, value);
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>
                <div>
                  <FormItemcompact
                    asterisk
                    label="Company Share"
                    invalid={errors.CompanyShare && touched.CompanyShare}
                    errorMessage={errors.CompanyShare}
                  >
                    <Field
                      size="sm"
                      type="text"
                      maxlength="20"
                      autoComplete="off"
                      name="CompanyShare"
                      placeholder="CompanyShare"
                      component={Input}
                      disabled
                    />
                  </FormItemcompact>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                <FormItemcompact
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <Field name="IsActive" component={Switcher} />
                </FormItemcompact>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});
export default PayrouteEdit;
