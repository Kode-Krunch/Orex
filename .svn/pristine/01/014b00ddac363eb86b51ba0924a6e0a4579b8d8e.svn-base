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
import { Postlanguage, Putlanguage } from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { isChar } from 'components/validators';

const validationSchema = Yup.object().shape({
  LanguageName: Yup.string()

    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  CountryCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required(' Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
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

const LanguageEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, currency } = props;

  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddLanguage = async (values, token) => {
    try {
      const resp = await Postlanguage(values, token);
      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Inserted Successfully.');
        return;
      } else if (resp.status === 204) {
        setlog('warning');
        setMessage('Data is Already Exists');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        setlog('success');
        setMessage('Server Error.');
        return;
      }
    }
  };
  const EditLanguage = async (values, token) => {
    try {
      const resp = await Putlanguage(values, token);
      //console.log(resp)
      if (resp.status === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.status === 204) {
        setlog('warning');
        setMessage('Data is Already Exists');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        setlog('success');
        setMessage('Server Error.');
        return;
      }
    }
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          LanguageCode: editData.LanguageCode || '',
          LanguageName: editData.LanguageName || '',
          CountryCode: editData.Country?.CountryCode,
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.LanguageCode) {
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
        {({ values, touched, errors, setFieldValue }) => (
          <Form>
            <FormContainer>
              <Field
                size="sm"
                type="LanguageCode"
                autoComplete="off"
                name="LanguageCode"
                placeholder="LanguageCode name"
                component={Input}
                hidden
              />
              <div className="grid grid-cols-2 gap-2">
                <FormItemcompact
                  asterisk
                  label="Language"
                  invalid={errors.LanguageName && touched.LanguageName}
                  errorMessage={errors.LanguageName}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="50"
                    autoComplete="off"
                    name="LanguageName"
                    placeholder="Language"
                    component={Input}
                    value={values.LanguageName}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (isChar(newValue)) {
                        setFieldValue('LanguageName', newValue);
                      }
                    }}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="Country"
                  invalid={errors.CountryCode && touched.CountryCode}
                  errorMessage={errors.CountryCode}
                >
                  <Field size="sm" name="CountryCode">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={currency}
                        value={currency.filter(
                          (option) => option.value === values.CountryCode,
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                      />
                    )}
                  </Field>
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
export default LanguageEdit;
