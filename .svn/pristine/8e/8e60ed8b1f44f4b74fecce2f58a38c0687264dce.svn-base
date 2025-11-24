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
import { Postscene, Putscene } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  SceneTypeName: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('SceneType Name Required'),
  SortName: Yup.string()
    .min(1, 'Too Short!')
    .max(5, 'Too Long!')
    .required('Short Name Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
// const SceneTypeEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     SceneType,
// }) => {
const SceneTypeEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, SceneType } = props;
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddSceneType = async (values, token) => {
    try {
      const resp = await Postscene(values, token);
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
  const EditSceneType = async (values, token) => {
    try {
      const resp = await Putscene(values, token);
      //console.log(resp)
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'SceneType Already Exists') {
        setlog('warning');
        setMessage(resp.data.msg);
        return;
      }
    } catch (errors) {
      return {};
    }
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          SceneTypeCode: editData.SceneTypeCode || '',
          SceneTypeName: editData.SceneTypeName || '',
          SortName: editData.SortName || '',

          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.SceneTypeCode) {
              new Promise((resolve, reject) => {
                AddSceneType(values, token)
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
                EditSceneType(values, token)
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  size="sm"
                  type="SceneTypeCode"
                  autoComplete="off"
                  name="SceneTypeCode"
                  placeholder=""
                  component={Input}
                  hidden
                />
                <FormItemcompact
                  asterisk
                  label="SceneType Name"
                  invalid={errors.SceneTypeName && touched.SceneTypeName}
                  errorMessage={errors.SceneTypeName}
                >
                  <Field name="SceneTypeName">
                    {({ field, form }) => (
                      <Input
                        type="text"
                        placeholder="SceneTypeName"
                        maxlength="20"
                        size="sm"
                        value={values.SceneTypeName}
                        name="SceneTypeName"
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
                  invalid={errors.SortName && touched.SortName}
                  errorMessage={errors.SortName}
                >
                  <Field name="SortName">
                    {({ field, form }) => (
                      <Input
                        type="text"
                        placeholder="ShortName"
                        maxlength="4"
                        size="sm"
                        value={values.SortName}
                        name="SortName"
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

export default SceneTypeEdit;
