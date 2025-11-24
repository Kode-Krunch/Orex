import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
  FormItemcompact,
  Select,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { PostSupplier, PutSupplier } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react';
import { isChar, isNumbers, isPin } from 'components/validators';
import {
  apiGetPlaceMasterbyId,
  apiGetStateMasterbyId,
} from 'services/MasterService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  SupplierName: Yup.string()
    .min(3, 'Too Short!')
    .max(100, 'Too Long!')
    .required('SupplierName Required'),
  ShortName: Yup.string()
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .required('ShortName Required'),
  SupplierERPCode: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('SupplierERPCode Required'),
  Address1: Yup.string()
    .min(3, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Address1 Required'),
  Address2: Yup.string().max(200, 'Too Long!'),
  //     .required('Address2 Required'),
  Pin: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, 'Only numeric characters are allowed')
    .min(6, 'Too Short!')
    .max(6, 'Too Long!')
    .required('Pin Required'),
  CountryCode: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Country Required'),
  StateCode: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('State Required'),
  PlaceCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Place Required'),
  Phone: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric characters are allowed')
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .matches(/^[0-9]+$/, 'Must be only digits'),

  Mobile: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric characters are allowed')
    .min(10, 'Too Short!')
    .max(10, 'Too Long!')

    .required('Mobile Required'),

  Email: Yup.string()
    .email('Invalid email format')
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Email Required'),
  ContactPerson: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('ContactPerson Required'),
  Fax: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric characters are allowed')
    .max(12, 'Too Long!'),
  IsActive: Yup.string().required('IsActives Required'),

  rememberMe: Yup.bool(),
});

const SupplierEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, Country } = props;
  const token = useSelector((state) => state.auth.session.token);
  const [place, setplace] = useState([]);
  const [state, setstate] = useState([]);

  useEffect(() => {
    GetState(editData.Country?.CountryCode);
    GetPlace(editData.State?.StateCode);
  }, []);

  const GetPlace = async (Id) => {
    try {
      const Place = await apiGetPlaceMasterbyId(Id);
      const formattedOptions = Place.data.map((option) => ({
        value: option.PlaceCode,
        label: option.PlaceName,
      }));
      if (Place.status == 204) {
        openNotification('Warning', 'Place Not Found');
        setplace([]);
        return;
      }
      if (Place.status == 200) {
        setplace(formattedOptions);
      }
    } catch (error) {
      if (error.response.status == 500) {
        openNotification('danger', 'Server Error.');
        setplace([]);
        return;
      }
    }
  };
  const GetState = async (ID) => {
    try {
      const State = await apiGetStateMasterbyId(ID);
      const formattedOptions = State.data.map((option) => ({
        value: option.StateCode,
        label: option.StateName,
      }));
      if (State.status == 204) {
        openNotification('Warning', 'State Not Found');
        setstate([]);
        return;
      }
      if (State.status == 200) {
        setstate(formattedOptions);
      }
    } catch (error) {
      if (error.response.status == 500) {
        openNotification('danger', 'Server Error.');
        setstate([]);
        return;
      }
    }
  };

  const AddSupplier = async (values, token) => {
    try {
      const resp = await PostSupplier(values, token);

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
  const EditSupplier = async (values, token) => {
    try {
      const resp = await PutSupplier(values, token);
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
          SupplierCode: editData.SupplierCode || '',
          SupplierName: editData.SupplierName || '',
          ShortName: editData.ShortName || '',
          SupplierERPCode: editData.SupplierERPCode || '',
          Address1: editData.Address1 || '',
          Address2: editData.Address2 || '',
          Pin: editData.Pin || '',
          CountryCode: editData.Country?.CountryCode || '',
          StateCode: editData.State?.StateCode || '',
          PlaceCode: editData.Place?.PlaceCode || '',
          Phone: editData.Phone || '',
          Mobile: editData.Mobile || '',
          Fax: editData.Fax || '',
          Email: editData.Email || '',
          ContactPerson: editData.ContactPerson || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.SupplierCode) {
              new Promise((resolve, reject) => {
                AddSupplier(values, token)
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
                EditSupplier(values, token)
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
                type="SupplierCode"
                autoComplete="off"
                name="SupplierCode"
                placeholder="SupplierCode name"
                component={Input}
                hidden
              />
              <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    <FormItemcompact
                      asterisk
                      label="Supplier Name"
                      invalid={errors.SupplierName && touched.SupplierName}
                      errorMessage={errors.SupplierName}
                    >
                      <Field size="sm" name="SupplierName">
                        {({ field, form }) => (
                          <Input
                            field={field}
                            maxLength="20"
                            form={form}
                            size="sm"
                            placeholder="Supplier Name"
                            value={values.SupplierName}
                            onChange={(e) => {
                              if (isChar(e.target.value)) {
                                form.setFieldValue(field.name, e.target.value);
                              }
                            }}
                          />
                        )}
                      </Field>
                    </FormItemcompact>
                  </div>
                  <div className="col-span-1">
                    <FormItemcompact
                      asterisk
                      label="Short Name"
                      invalid={errors.ShortName && touched.ShortName}
                      errorMessage={errors.ShortName}
                    >
                      <Field size="sm" name="ShortName">
                        {({ field, form }) => (
                          <Input
                            field={field}
                            maxLength="5"
                            form={form}
                            size="sm"
                            placeholder="Short Name"
                            value={values.ShortName}
                            onChange={(e) => {
                              if (isChar(e.target.value)) {
                                form.setFieldValue(field.name, e.target.value);
                              }
                            }}
                          />
                        )}
                      </Field>
                    </FormItemcompact>
                  </div>
                  <FormItemcompact
                    asterisk
                    label="ERPCode"
                    invalid={errors.SupplierERPCode && touched.SupplierERPCode}
                    errorMessage={errors.SupplierERPCode}
                  >
                    <Field size="sm" name="SupplierERPCode">
                      {({ field, form }) => (
                        <Input
                          field={field}
                          maxLength="20"
                          form={form}
                          size="sm"
                          placeholder="Supplier ERP"
                          value={values.SupplierERPCode}
                          onChange={(e) => {
                            if (isChar(e.target.value)) {
                              form.setFieldValue(field.name, e.target.value);
                            }
                          }}
                        />
                      )}
                    </Field>
                  </FormItemcompact>
                  <FormItemcompact
                    asterisk
                    label="Pin Code"
                    invalid={errors.Pin && touched.Pin}
                    errorMessage={errors.Pin}
                  >
                    <Field size="sm" name="Pin">
                      {({ field, form }) => (
                        <Input
                          field={field}
                          maxLength="6" // Adjusted to 6 for a 6-digit PIN code
                          form={form}
                          size="sm"
                          placeholder="Pin Code"
                          value={field.value} // Use field.value instead of values.Pin
                          onChange={(e) => {
                            const pinValue = e.target.value;
                            if (isNumbers(pinValue)) {
                              form.setFieldValue(field.name, pinValue); // Update form value
                            }
                          }}
                        />
                      )}
                    </Field>
                  </FormItemcompact>

                  <FormItemcompact
                    asterisk
                    label="Address1"
                    invalid={errors.Address1 && touched.Address1}
                    errorMessage={errors.Address1}
                  >
                    <Field
                      textArea
                      type="Address1"
                      autoComplete="off"
                      name="Address1"
                      maxLength="90"
                      size="sm"
                      placeholder="Address1"
                      component={Input}
                    />
                  </FormItemcompact>
                  <FormItemcompact
                    label="Address2"
                    invalid={errors.Address2 && touched.Address2}
                    errorMessage={errors.Address2}
                  >
                    <Field
                      textArea
                      type="Address2"
                      autoComplete="off"
                      name="Address2"
                      size="sm"
                      maxLength="90"
                      placeholder="Address2"
                      component={Input}
                    />
                  </FormItemcompact>

                  <FormItemcompact
                    asterisk
                    label="Country"
                    invalid={errors.CountryCode && touched.CountryCode}
                    errorMessage={errors.CountryCode}
                    style={{ width: '250px' }}
                  >
                    <Field name="CountryCode" style={{ width: '250px' }}>
                      {({ field, form }) => (
                        <Select
                          style={{ width: '20px' }}
                          field={field}
                          form={form}
                          options={Country}
                          value={Country.filter(
                            (option) => option.value === values.CountryCode,
                          )}
                          onChange={(option) => {
                            form.setFieldValue(field.name, option?.value);
                            GetState(option?.value);
                          }}
                        />
                      )}
                    </Field>
                  </FormItemcompact>

                  <FormItemcompact
                    asterisk
                    label="State"
                    invalid={errors.StateCode && touched.StateCode}
                    errorMessage={errors.StateCode}
                    style={{ width: '250px' }}
                  >
                    <Field name="StateCode" style={{ width: '250px' }}>
                      {({ field, form }) => (
                        <Select
                          style={{ width: '250px' }}
                          field={field}
                          form={form}
                          size="sm"
                          options={state}
                          value={state.filter(
                            (option) => option.value === values.StateCode,
                          )}
                          onChange={(option) => {
                            form.setFieldValue(field.name, option?.value);
                            GetPlace(option?.value);
                          }}
                        />
                      )}
                    </Field>
                  </FormItemcompact>

                  <FormItemcompact
                    asterisk
                    label="Place"
                    invalid={errors.PlaceCode && touched.PlaceCode}
                    errorMessage={errors.PlaceCode}
                    style={{ width: '250px' }}
                  >
                    <Field name="PlaceCode" style={{ width: '250px' }}>
                      {({ field, form }) => (
                        <Select
                          style={{ width: '250px' }}
                          field={field}
                          form={form}
                          size="sm"
                          options={place}
                          value={place.filter(
                            (option) => option.value === values.PlaceCode,
                          )}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option?.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItemcompact>

                  <FormItemcompact
                    label="Phone"
                    invalid={errors.Phone && touched.Phone}
                    errorMessage={errors.Phone}
                  >
                    <Field size="sm" name="Phone">
                      {({ field, form }) => (
                        <Input
                          field={field}
                          maxLength="10" // Adjusted to 6 for a 6-digit Phone code
                          form={form}
                          size="sm"
                          placeholder="Phone"
                          value={field.value} // Use field.value instead of values.Pin
                          onChange={(e) => {
                            const pinValue = e.target.value;
                            if (isNumbers(pinValue)) {
                              form.setFieldValue(field.name, pinValue); // Update form value
                            }
                          }}
                        />
                      )}
                    </Field>
                  </FormItemcompact>
                  <FormItemcompact
                    asterisk
                    label="Mobile"
                    invalid={errors.Mobile && touched.Mobile}
                    errorMessage={errors.Mobile}
                  >
                    <Field size="sm" name="Mobile">
                      {({ field, form }) => (
                        <Input
                          field={field}
                          maxLength="10" // Adjusted to 6 for a 6-digit Mobile code
                          form={form}
                          size="sm"
                          placeholder="Mobile"
                          value={field.value} // Use field.value instead of values.Pin
                          onChange={(e) => {
                            const pinValue = e.target.value;
                            if (isNumbers(pinValue)) {
                              form.setFieldValue(field.name, pinValue); // Update form value
                            }
                          }}
                        />
                      )}
                    </Field>
                  </FormItemcompact>
                  <FormItemcompact
                    label="Fax"
                    invalid={errors.Fax && touched.Fax}
                    errorMessage={errors.Fax}
                  >
                    <Field
                      type="Fax"
                      autoComplete="off"
                      name="Fax"
                      size="sm"
                      placeholder="Fax"
                      component={Input}
                    />
                  </FormItemcompact>

                  <FormItemcompact
                    asterisk
                    label="Email"
                    invalid={errors.Email && touched.Email}
                    errorMessage={errors.Email}
                  >
                    <Field size="sm" name="Email">
                      {({ field, form }) => (
                        <Input
                          field={field}
                          maxLength="45" // Adjusted to 6 for a 6-digit Mobile code
                          form={form}
                          size="sm"
                          type="email"
                          placeholder="Email"
                          value={field.value} // Use field.value instead of values.Pin
                          onChange={(e) => {
                            const pinValue = e.target.value;
                            form.setFieldValue(field.name, pinValue); // Update form value
                          }}
                        />
                      )}
                    </Field>
                  </FormItemcompact>
                  <FormItemcompact
                    asterisk
                    label="Contact Person"
                    invalid={errors.ContactPerson && touched.ContactPerson}
                    errorMessage={errors.ContactPerson}
                  >
                    <Field size="sm" name="ContactPerson">
                      {({ field, form }) => (
                        <Input
                          field={field}
                          maxLength="20" // Adjusted to 6 for a 6-digit Mobile code
                          form={form}
                          size="sm"
                          placeholder="ContactPerson"
                          value={field.value} // Use field.value instead of values.Pin
                          onChange={(e) => {
                            const pinValue = e.target.value;
                            if (isChar(pinValue)) {
                              form.setFieldValue(field.name, pinValue); // Update form value
                            }
                          }}
                        />
                      )}
                    </Field>
                  </FormItemcompact>
                </div>
              </div>
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

export default SupplierEdit;
