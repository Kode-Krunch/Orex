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
import { Postmodule, Putmodule } from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const validationSchema = Yup.object().shape({
  ModuleName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  IndexNum: Yup.number()
    .positive('Must be more than 0')
    .integer('Must be more than 0')
    .required('Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
// const ModuleEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     module,
// }) => {

const ModuleEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, module } = props;

  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddModule = async (values, token) => {
    try {
      const resp = await Postmodule(values, token);

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
  const EditModule = async (values, token) => {
    try {
      const resp = await Putmodule(values, token);
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
          ModuleCode: editData.ModuleCode || '',
          ModuleName: editData.ModuleName || '',
          IndexNum: editData.IndexNum || '',

          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.ModuleCode) {
              new Promise((resolve, reject) => {
                AddModule(values, token)
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
                EditModule(values, token)
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Field
                  size="sm"
                  type="ModuleCode"
                  autoComplete="off"
                  name="ModuleCode"
                  placeholder="ModuleCode Name"
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="Module Name"
                  invalid={errors.ModuleName && touched.ModuleName}
                  errorMessage={errors.ModuleName}
                >
                  <Field name="ModuleName">
                    {({ field, form }) => (
                      <Input
                        type="text"
                        placeholder="ModuleName"
                        maxlength="20"
                        size="sm"
                        value={values.ModuleName}
                        name="ModuleName"
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
                  label="Index Number"
                  invalid={errors.IndexNum && touched.IndexNum}
                  errorMessage={errors.IndexNum}
                >
                  <Field name="IndexNum">
                    {({ field, form }) => (
                      <Input
                        type="text"
                        placeholder="IndexNum"
                        maxlength="4"
                        size="sm"
                        value={values.IndexNum}
                        name="IndexNum"
                        onChange={(e) => {
                          const newValue = e.target.value;

                          if (/^[0-9]*$/.test(newValue)) {
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
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <FormItemcompact
                  asterisk
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field size="sm" name="IsActive" component={Switcher} />
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

export default ModuleEdit;
