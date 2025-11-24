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
import {
  Postlanguage,
  Putlanguage,
  apiGetPlaceDrop,
  apiGetPlaceMaster,
} from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react';
import { Postmusicagencymst, Putmusicagencymst } from 'services/LibraryService';

const validationSchema = Yup.object().shape({
  MusicAgencyName: Yup.string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('MusicAgency Name Required'),

  MusicAgency_Addr1: Yup.string()
    .min(20, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Address Required'),
  PlaceCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('City Required'),
  MusicAgency_Contact1: Yup.string().required('Contact Required'),
  MusicAgency_Email: Yup.string()
    .email('Invalid email format') // Checks for valid email format
    .min(5, 'Email must be at least 5 characters long') // Minimum length
    .max(254, 'Email must be less than 255 characters long')
    .required('Email Required'), // Maximum length
});

const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
// const LanguageEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     currency,
// }) => {

const MusicAgencyEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;

  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)
  const [Place, setPlace] = useState([]);
  const AddLanguage = async (values, token) => {
    try {
      const resp = await Postmusicagencymst(values, token);
      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Inserted Successfully.');
        return;
      }
    } catch (errors) {
      if (errors.response.status == 204) {
        setlog('success');
        setMessage('Data is Already Exists');
        return;
      }
      if (errors.response.status === 500) {
        setlog('error');
        setMessage('Server Error.');
        return;
      }
    }
  };
  const EditLanguage = async (values, token) => {
    try {
      const resp = await Putmusicagencymst(values, token);

      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      }
    } catch (errors) {
      if (errors.response.status == 204) {
        setlog('success');
        setMessage('Data is Already Exists');
        return;
      }
      if (errors.response.status === 500) {
        setlog('error');
        setMessage('Server Error.');
        return;
      }
    }
  };
  useEffect(() => {
    (async (values) => {
      const Place = await apiGetPlaceMaster(values);
      const formattedOptions = Place.data.map((option) => ({
        value: option.PlaceCode,
        label: option.PlaceName,
        Country: option.Country.CountryCode,
        State: option.State.StateCode,
      }));
      console.log(Place.data);
      setPlace(formattedOptions);
    })();
  }, []);
  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          MusicAgencyCode: editData.MusicAgencyCode || '',
          MusicAgencyName: editData.MusicAgencyName || '',
          MusicAgency_Addr1: editData.MusicAgency_Addr1 || '',
          PlaceCode: editData.Place?.PlaceCode || '',
          CountryCode: editData.Country?.CountryCode || '',
          StateCode: editData.State?.StateCode || '',
          MusicAgency_Contact1: editData.MusicAgency_Contact1 || '',
          MusicAgency_Faxno: editData.MusicAgency_Faxno || null,
          MusicAgency_Email: editData.MusicAgency_Email || '',
          ContactPerson: editData.ContactPerson || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);
          setTimeout(() => {
            if (!editData.MusicAgencyCode) {
              new Promise((resolve, reject) => {
                AddLanguage(values, token)
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
                EditLanguage(values, token)
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
              <div className="grid grid-cols-1 gap-1">
                <Field
                  size="sm"
                  type="MusicAgencyCode"
                  autoComplete="off"
                  name="MusicAgencyCode"
                  placeholder="MusicAgencyCode name"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="Agency/Music Company"
                  invalid={errors.MusicAgencyName && touched.MusicAgencyName}
                  errorMessage={errors.MusicAgencyName}
                >
                  <Field size="sm" name="MusicAgencyName">
                    {({ field, form }) => (
                      <Input
                        field={field}
                        size="sm"
                        maxLength="20"
                        form={form}
                        value={values.MusicAgencyName}
                        onChange={(e) => {
                          const input = e.target.value;
                          if (/^[0-9a-zA-Z\s]+$/.test(input) || input === '') {
                            form.setFieldValue(field.name, input);
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItemcompact>
              </div>

              <FormItemcompact
                asterisk
                label="Address "
                invalid={errors.MusicAgency_Addr1 && touched.MusicAgency_Addr1}
                errorMessage={errors.MusicAgency_Addr1}
              >
                <Field size="sm" name="MusicAgency_Addr1">
                  {({ field, form }) => (
                    <Input
                      textArea
                      field={field}
                      size="sm"
                      maxLength="250"
                      form={form}
                      value={values.MusicAgency_Addr1}
                      onChange={(e) => {
                        const input = e.target.value;
                        if (/^[a-zA-Z-\s]+$/.test(input) || input === '') {
                          form.setFieldValue(field.name, input);
                        }
                      }}
                    />
                  )}
                </Field>
              </FormItemcompact>

              <FormItemcompact
                asterisk
                label="City"
                invalid={errors.PlaceCode && touched.PlaceCode}
                errorMessage={errors.PlaceCode}
              >
                <Field size="sm" name="PlaceCode">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      options={Place}
                      value={Place.filter(
                        (option) => option.value === values.PlaceCode,
                      )}
                      onChange={(option) => {
                        form.setFieldValue('CountryCode', option?.Country);
                        form.setFieldValue('StateCode', option?.State);
                        form.setFieldValue(field.name, option?.value);
                      }}
                    />
                  )}
                </Field>
              </FormItemcompact>
              <FormItemcompact
                label="Contact"
                asterisk
                invalid={
                  errors.MusicAgency_Contact1 && touched.MusicAgency_Contact1
                }
                errorMessage={errors.MusicAgency_Contact1}
              >
                <Field size="sm" name="MusicAgency_Contact1">
                  {({ field, form }) => (
                    <Input
                      field={field}
                      form={form}
                      size="sm"
                      value={values.MusicAgency_Contact1}
                      onChange={(e) => {
                        const input = e.target.value;
                        if (/^\d*$/.test(input) && input.length <= 10) {
                          form.setFieldValue(field.name, input);
                        }
                      }}
                    />
                  )}
                </Field>
              </FormItemcompact>
              <FormItemcompact
                label="Fax no"
                invalid={errors.MusicAgency_Faxno && touched.MusicAgency_Faxno}
                errorMessage={errors.MusicAgency_Faxno}
              >
                <Field size="sm" name="MusicAgency_Faxno">
                  {({ field, form }) => (
                    <Input
                      field={field}
                      form={form}
                      size="sm"
                      value={values.MusicAgency_Faxno}
                      onChange={(e) => {
                        const input = e.target.value;
                        if (/^\d*$/.test(input) && input.length <= 10) {
                          form.setFieldValue(field.name, input);
                        }
                      }}
                    />
                  )}
                </Field>
              </FormItemcompact>

              <FormItemcompact
                asterisk
                label="Email"
                invalid={errors.MusicAgency_Email && touched.MusicAgency_Email}
                errorMessage={errors.MusicAgency_Email}
              >
                <Field
                  size="sm"
                  type="email"
                  maxLength="45"
                  autoComplete="off"
                  name="MusicAgency_Email"
                  placeholder=" "
                  component={Input}
                />
              </FormItemcompact>
              <FormItemcompact
                label="Contact Person"
                invalid={errors.ContactPerson && touched.ContactPerson}
                errorMessage={errors.ContactPerson}
              >
                <Field size="sm" name="ContactPerson">
                  {({ field, form }) => (
                    <Input
                      field={field}
                      size="sm"
                      maxLength="20"
                      form={form}
                      value={values.ContactPerson}
                      onChange={(e) => {
                        const input = e.target.value;
                        if (/^[a-zA-Z\s]+$/.test(input) || input === '') {
                          form.setFieldValue(field.name, input);
                        }
                      }}
                    />
                  )}
                </Field>
              </FormItemcompact>

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
export default MusicAgencyEdit;
