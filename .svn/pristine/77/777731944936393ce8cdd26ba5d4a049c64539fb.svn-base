import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Posttxversion, Puttxversion } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  // TXVersionName: Yup.string()
  //     .min(1, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required('TXVersionName Required'),
  TXVersionName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('TXVersionName Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
//const TXVersionEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
const TXVersionEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;
  const token = useSelector((state) => state.auth.session.token);
  //console.log(currency)

  const AddTXVersion = async (values, token) => {
    try {
      const resp = await Posttxversion(values, token);
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
  const EditTXVersion = async (values, token) => {
    try {
      const resp = await Puttxversion(values, token);
      console.log(resp);
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'TXVersion is Already Exists') {
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
        initialValues={{
          TXVersionCode: editData.TXVersionCode || '',
          TXVersionName: editData.TXVersionName || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        innerRef={ref}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(editData);
          setTimeout(() => {
            if (!editData.TXVersionCode) {
              new Promise((resolve, reject) => {
                AddTXVersion(values, token)
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
                EditTXVersion(values, token)
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Field
                  type="TXVersionCode"
                  autoComplete="off"
                  name="TXVersionCode"
                  placeholder="TXVersionCode"
                  component={Input}
                  hidden
                />
                <FormItem
                  asterisk
                  label="Telecast Version Name"
                  invalid={errors.TXVersionName && touched.TXVersionName}
                  errorMessage={errors.TXVersionName}
                >
                  <Field
                    type="TXVersionName"
                    autoComplete="off"
                    name="TXVersionName"
                    placeholder="Telecast Version Name"
                    component={Input}
                  />
                </FormItem>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
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
              {/* 
                            <FormItem>
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

export default TXVersionEdit;
