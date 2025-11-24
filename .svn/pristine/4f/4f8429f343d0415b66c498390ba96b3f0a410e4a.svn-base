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
import { CreateLogin } from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  DesignationName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Designation Name Required'),
  ShortName: Yup.string()
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Short Name Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
// const DesignationEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     designation,
// }) => {
const ChangePasswordEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, designation } = props;
  const token = useSelector((state) => state.auth.session.token);
  const channel = useSelector((state) => state.locale.selectedChannel);
  ////console.log(currency)

  const AddPassword = async (values, token) => {
    try {
      const resp = await CreateLogin(values, token, channel);
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
  // const EditPassword = async (values, token) => {
  //     try {
  //         const resp = await C(values, token)
  //         //console.log(resp)
  //         if (resp.data.msg === 'Updated') {
  //             setlog('success')
  //             setMessage('Data Updated Successfully')
  //             return
  //         } else if (resp.data.msg === 'Designation is Already Exists') {
  //             setlog('warning')
  //             setMessage(resp.data.msg)
  //             return
  //         }
  //     } catch (errors) {
  //         return {}
  //     }
  // }

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          LoginCode: editData.LoginCode || '',
          Password: editData.Password || '',
        }}
        //validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            if (!editData.DesignationCode) {
              new Promise((resolve, reject) => {
                AddPassword(values, token)
                  .then((response) => {
                    onDrawerClose(0, 0);
                    resolve(response);
                  })
                  .catch((errors) => {
                    reject(errors);
                  });
              });
            } else {
              // new Promise((resolve, reject) => {
              //     setSubmitting(false)
              //     EditPassword(values, token)
              //         .then((response) => {
              //             onDrawerClose(0, 0)
              //             resolve(response)
              //         })
              //         .catch((errors) => {
              //             reject(errors)
              //         })
              // })
            }

            resetForm();
          }, 400);
        }}
      >
        {({ values, touched, errors }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItemcompact
                  asterisk
                  label="Old password"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="4"
                    autoComplete="off"
                    name="Old password"
                    placeholder="Old password"
                    component={Input}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="New password"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="4"
                    autoComplete="off"
                    name="New password"
                    placeholder="New password"
                    component={Input}
                  />
                </FormItemcompact>

                <FormItemcompact
                  asterisk
                  label="Confirm New password"
                  invalid={errors.ShortName && touched.ShortName}
                  errorMessage={errors.ShortName}
                >
                  <Field
                    size="sm"
                    type="text"
                    maxlength="4"
                    autoComplete="off"
                    name="Confirm New password"
                    placeholder="Confirm New password"
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

export default ChangePasswordEdit;
