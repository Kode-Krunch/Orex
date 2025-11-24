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
import { Postplace, Putplace } from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  PlaceName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Place Name Required'),
  ShortName: Yup.string()
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .required('ShortName Required'),
  ZoneCode: Yup.string().required('ZoneCode Required'),
  StateCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('State Required'),
  CountryCode: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Country Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});

const PlaceEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, State, Zone, Country } =
    props;

  const token = useSelector((state) => state.auth.session.token);

  const AddPlace = async (values, token) => {
    try {
      const resp = await Postplace(values, token);

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
  const EditPlace = async (values, token) => {
    try {
      const resp = await Putplace(values, token);
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
          PlaceCode: editData.PlaceCode,
          PlaceName: editData.PlaceName,
          ShortName: editData.ShortName,
          ZoneCode: editData.Zone?.ZoneCode || '',
          StateCode: editData.State?.StateCode || '',
          CountryCode: editData.Country?.CountryCode || '',
          IsActive:
            editData.IsActive !== undefined ? editData.IsActive === 1 : true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.PlaceCode) {
              new Promise((resolve, reject) => {
                AddPlace(values, token)
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
                EditPlace(values, token)
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
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                <Field
                  type="PlaceCode"
                  autoComplete="off"
                  name="PlaceCode"
                  placeholder="PlaceCode name"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="Place"
                  invalid={errors.PlaceName && touched.PlaceName}
                  errorMessage={errors.PlaceName}
                >
                  <Field name="PlaceName">
                    {({ field, form }) => (
                      <Input
                        type="text"
                        placeholder="PlaceName"
                        maxlength="50"
                        size="sm"
                        value={values.PlaceName}
                        name="PlaceName"
                        onChange={(e) => {
                          const newValue = e.target.value;

                          if (/^[a-zA-Z ]+$/.test(newValue)) {
                            form.setFieldValue(field.name, newValue);
                          }
                          if (newValue == '') {
                            form.setFieldValue(field.name, '');
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Short Name"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field name="ShortName">
                    {({ field, form }) => (
                      <Input
                        type="text"
                        placeholder="ShortName"
                        maxlength="4"
                        size="sm"
                        value={values.ShortName}
                        name="ShortName"
                        onChange={(e) => {
                          const newValue = e.target.value;

                          if (/^[a-zA-Z ]+$/.test(newValue)) {
                            form.setFieldValue(field.name, newValue);
                          }
                          if (newValue == '') {
                            form.setFieldValue(field.name, '');
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="Zone"
                  invalid={errors.ZoneCode && touched.ZoneCode}
                  errorMessage={errors.ZoneCode}
                >
                  <Field name="ZoneCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={Zone}
                        value={Zone.filter(
                          (option) => option.value === values.ZoneCode,
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
                  label="State"
                  invalid={errors.StateCode && touched.StateCode}
                  errorMessage={errors.StateCode}
                >
                  <Field name="StateCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={State}
                        value={State.filter(
                          (option) => option.value === values.StateCode,
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
                  label="Country"
                  invalid={errors.CountryCode && touched.CountryCode}
                  errorMessage={errors.CountryCode}
                >
                  <Field name="CountryCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={Country}
                        value={Country.filter(
                          (option) => option.value === values.CountryCode,
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
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field name="IsActive" component={Switcher} />
                  </div>
                </FormItemcompact>
              </div>
              {/* <FormItemcompact>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItemcompact> */}
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default PlaceEdit;
