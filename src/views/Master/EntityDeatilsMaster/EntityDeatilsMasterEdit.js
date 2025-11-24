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

const validationSchema = Yup.object().shape({
  AddressLine: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Language Name Required'),
  EntityCode: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Entity Name Required'),
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
const ContentDemo = [{ value: '', label: 'Data Not Found' }];
const EntityDeatilsMasterEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, Entity, Place } = props;

  const token = useSelector((state) => state.auth.session.token);
  ////console.log(Entity)

  const AddLanguage = async (values, token) => {
    try {
      const resp = await Postlanguage(values, token);
      if (resp.data.msg === 'success') {
        setlog('success');
        setMessage('Data Inserted Successfully.');
        return;
      } else if (resp.data.msg === 'Server Error.') {
        setlog('error');
        setMessage('Server Error.');
        return;
      }
    } catch (errors) {
      return {};
    }
  };

  const EditLanguage = async (values, token) => {
    try {
      const resp = await Putlanguage(values, token);
      //console.log(resp)
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'Location is Already Exists') {
        setlog('warning');
        setMessage(resp.data.msg);
        return;
      }
    } catch (errors) {
      return {};
    }
  };
  console.log(Place);

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          EntityDeatilsCode: editData.EntityDeatilsCode || '',
          AddressLine: editData.AddressLine || '',
          EntityCode: editData.Entity?.EntityCode,
          PlaceCode: editData.Place?.PlaceCode,
          GSTN: editData.GSTN || '',
          SACC: editData.SACC || '',
          HSNCode: editData.HSNCode || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.EntityDeatilsCode) {
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
              <div className="grid grid-cols-2 gap-2">
                <Field
                  size="sm"
                  type="EntityDeatilsCode"
                  autoComplete="off"
                  name="EntityDeatilsCode"
                  placeholder="EntityDeatilsCode name"
                  component={Input}
                  hidden
                />

                <div className="col-span-1">
                  <FormItemcompact
                    asterisk
                    label="Entity"
                    invalid={errors.EntityCode && touched.EntityCode}
                    errorMessage={errors.EntityCode}
                    style={{ width: '250px' }}
                  >
                    <Field
                      size="sm"
                      name="EntityCode"
                      style={{ width: '250px' }}
                    >
                      {({ field, form }) => (
                        <Select
                          style={{ width: '250px' }}
                          field={field}
                          form={form}
                          className="mb-4 w-50"
                          options={Entity}
                          value={
                            Entity !== null
                              ? Entity.filter(
                                  (option) =>
                                    option.value === values.EntityCode,
                                )
                              : ContentDemo.filter((option) => option.value)
                          }
                          onChange={(option) =>
                            form.setFieldValue(field.name, option?.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItemcompact>
                </div>
                <FormItemcompact
                  asterisk
                  label="Address"
                  invalid={errors.AddressLine && touched.AddressLine}
                  errorMessage={errors.AddressLine}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="20"
                    autoComplete="off"
                    name="AddressLine"
                    placeholder="Address Line"
                    component={Input}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="Place"
                  invalid={errors.PlaceCode && touched.PlaceCode}
                  errorMessage={errors.PlaceCode}
                  style={{ width: '250px' }}
                >
                  <Field size="sm" name="PlaceCode" style={{ width: '250px' }}>
                    {({ field, form }) => (
                      <Select
                        style={{ width: '250px' }}
                        field={field}
                        form={form}
                        className="mb-4 w-50"
                        options={Place}
                        value={
                          Place !== null
                            ? Place.filter(
                                (option) => option.value === values.PlaceCode,
                              )
                            : ContentDemo.filter((option) => option.value)
                        }
                        onChange={(option) =>
                          form.setFieldValue(field.name, option?.value)
                        }
                      />
                    )}
                  </Field>
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="GSTN ID"
                  invalid={errors.GSTN && touched.GSTN}
                  errorMessage={errors.GSTN}
                  style={{ width: '250px' }}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="20"
                    autoComplete="off"
                    name="GSTN"
                    placeholder="GSTN Id"
                    component={Input}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="SACC"
                  invalid={errors.SACC && touched.SACC}
                  errorMessage={errors.SACC}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="20"
                    autoComplete="off"
                    name="SACC"
                    placeholder="SACC"
                    component={Input}
                  />
                </FormItemcompact>
                <FormItemcompact
                  asterisk
                  label="HSN"
                  invalid={errors.HSNCode && touched.HSNCode}
                  errorMessage={errors.HSNCode}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="20"
                    autoComplete="off"
                    name="HSNCode"
                    placeholder="HSNCode"
                    component={Input}
                  />
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
export default EntityDeatilsMasterEdit;
