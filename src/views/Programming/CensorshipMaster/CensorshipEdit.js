import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Postcensorship, Putcensorship } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  CensorshipName: Yup.string()
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .required('CensorshipName Required'),
  ShortName: Yup.string()
    .min(1, 'Too Short!')
    .max(4, 'Too Long!')
    .required('ShortName Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
//const CensorshipEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
const CensorshipEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddCensorship = async (values, token) => {
    try {
      const resp = await Postcensorship(values, token);
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
  const EditCensorship = async (values, token) => {
    try {
      const resp = await Putcensorship(values, token);
      //console.log(resp)
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'Censorship is Already Exists') {
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
          CensorshipCode: editData.CensorshipCode || '',
          CensorshipName: editData.CensorshipName || '',
          ShortName: editData.ShortName || '',
          IsActive: editData.IsActive === 1 ? true : true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.CensorshipCode) {
              new Promise((resolve, reject) => {
                AddCensorship(values, token)
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
                EditCensorship(values, token)
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
                  type="CensorshipCode"
                  autoComplete="off"
                  name="CensorshipCode"
                  placeholder="CensorshipCode"
                  component={Input}
                  hidden
                />
                <FormItem
                  asterisk
                  label="Censorship Name"
                  invalid={errors.CensorshipName && touched.CensorshipName}
                  errorMessage={errors.CensorshipName}
                >
                  <Field
                    type="CensorshipName"
                    autoComplete="off"
                    name="CensorshipName"
                    placeholder="Censorship Name"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  asterisk
                  label="ShortName"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field
                    type="ShortName"
                    autoComplete="off"
                    name="ShortName"
                    placeholder="Short Name"
                    component={Input}
                  />
                </FormItem>

                <FormItem
                  asterisk
                  label="Status"
                  invalid={errors.IsActive && touched.IsActive}
                  errorMessage={errors.IsActive}
                >
                  <div>
                    <Field name="IsActive" component={Switcher} />
                  </div>
                </FormItem>
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

export default CensorshipEdit;
