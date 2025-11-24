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
import { Postpromotype, Putpromotype } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { apiGetEventColorMaster } from 'services/MasterService';

const validationSchema = Yup.object().shape({
  PromoTypeName: Yup.string()
    .min(3, 'Too Short!')
    .max(100, 'Too Long!')
    .required('PromoType Name Required'),
  PromoTypeShortName: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('PromoType Short Name Required'),
  EventDefaultFrontColor: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Event Front Color Required'),
  EventDefaultBackColor: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Event Back Color Required'),
  ChannelSpecific: Yup.string().required('ChannelSpecific Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
//const PromoTypeEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
const PromoTypeEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddPromoTypeName = async (values, token) => {
    try {
      const resp = await Postpromotype(values, token);

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
  const EditPromoType = async (values, token) => {
    try {
      const resp = await Putpromotype(values, token);
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
        initialValues={{
          PromoTypeCode: editData.PromoTypeCode || '',
          PromoTypeName: editData.PromoTypeName || '',
          PromoTypeShortName: editData.PromoTypeShortName || '',
          EventDefaultFrontColor: editData.EventDefaultFrontColor || '',
          EventDefaultBackColor: editData.EventDefaultBackColor || '',
          ChannelSpecific: editData.ChannelSpecific === 1 ? true : false,
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.PromoTypeCode) {
              new Promise((resolve, reject) => {
                AddPromoTypeName(values, token)
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
                EditPromoType(values, token)
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
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <Field
                    type="PromoTypeCode"
                    autoComplete="off"
                    name="PromoTypeCode"
                    placeholder="PromoTypeCode"
                    component={Input}
                    hidden
                  />
                  <FormItem
                    asterisk
                    label="PromoType Name"
                    invalid={errors.PromoTypeName && touched.PromoTypeName}
                    errorMessage={errors.PromoTypeName}
                  >
                    <Field size="sm" name="PromoTypeName">
                      {({ field, form }) => (
                        <Input
                          field={field}
                          maxLength="100"
                          form={form}
                          size="sm"
                          placeholder="PromoType Name"
                          value={values.PromoTypeName}
                          onChange={(e) => {
                            if (/^[a-zA-Z][a-zA-Z\s]*$/.test(e.target.value)) {
                              form.setFieldValue(field.name, e.target.value);
                            }
                          }}
                        />
                      )}
                    </Field>
                  </FormItem>
                </div>
                <FormItem
                  asterisk
                  label="PromoType Short Name"
                  invalid={
                    errors.PromoTypeShortName && touched.PromoTypeShortName
                  }
                  errorMessage={errors.PromoTypeShortName}
                >
                  <Field size="sm" name="PromoTypeShortName">
                    {({ field, form }) => (
                      <Input
                        field={field}
                        maxLength="5"
                        form={form}
                        size="sm"
                        placeholder="PromoType Short Name"
                        value={values.PromoTypeShortName}
                        onChange={(e) => {
                          if (/^[a-zA-Z][a-zA-Z\s]*$/.test(e.target.value)) {
                            form.setFieldValue(field.name, e.target.value);
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem
                  asterisk
                  label="Event Front Color"
                  invalid={
                    errors.EventDefaultFrontColor &&
                    touched.EventDefaultFrontColor
                  }
                  errorMessage={errors.EventDefaultFrontColor}
                >
                  <Field
                    size="sm"
                    type="color"
                    maxlength="20"
                    autoComplete="off"
                    name="EventDefaultFrontColor"
                    placeholder="EventDefaultFrontColor"
                    component={Input}
                  />
                </FormItem>

                <FormItem
                  asterisk
                  label="Event Back Color"
                  invalid={
                    errors.EventDefaultBackColor &&
                    touched.EventDefaultBackColor
                  }
                  errorMessage={errors.EventDefaultBackColor}
                >
                  <Field
                    size="sm"
                    type="color"
                    maxlength="20"
                    autoComplete="off"
                    name="EventDefaultBackColor"
                    placeholder="EventDefaultBackColor"
                    component={Input}
                  />
                </FormItem>
                <div className="col-span-1 flex justify-between">
                  <FormItem
                    label="ChannelSpecific"
                    invalid={errors.ChannelSpecific && touched.ChannelSpecific}
                    errorMessage={errors.ChannelSpecific}
                  >
                    <Field name="ChannelSpecific" component={Switcher} />
                  </FormItem>

                  <FormItem
                    label="Status"
                    invalid={errors.IsActive && touched.IsActive}
                    errorMessage={errors.IsActive}
                  >
                    <div>
                      <Field name="IsActive" component={Switcher} />
                    </div>
                  </FormItem>
                </div>
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

export default PromoTypeEdit;
