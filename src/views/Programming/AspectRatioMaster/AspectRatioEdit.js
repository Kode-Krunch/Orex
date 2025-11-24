import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Postaspectratio, Putaspectratio } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  AspectRatio: Yup.string()
    .matches(/^[0-9:]+$/, 'Only numeric characters are allowed')
    .min(3, 'Too Short!')
    .max(5, 'Too Long!')
    .required('AspectRatio Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
// const AspectRatioEdit = ({
//     onDrawerClose,
//      editData,
//      setMessage,
//       setlog }) => {
const AspectRatioEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;

  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddAspectRatio = async (values, token) => {
    try {
      const resp = await Postaspectratio(values, token);
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
  const EditAspectRatio = async (values, token) => {
    try {
      const resp = await Putaspectratio(values, token);
      //console.log(resp)
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'AspectRatio Already Exists') {
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
          AspectRatioCode: editData.AspectRatioCode || '',
          AspectRatio: editData.AspectRatio || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.AspectRatioCode) {
              new Promise((resolve, reject) => {
                AddAspectRatio(values, token)
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
                EditAspectRatio(values, token)
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
                  type="AspectRatioCode"
                  autoComplete="off"
                  name="AspectRatioCode"
                  placeholder="AspectRatioCode"
                  component={Input}
                  hidden
                />
                <FormItem
                  asterisk
                  label="AspectRatio"
                  invalid={errors.AspectRatio && touched.AspectRatio}
                  errorMessage={errors.AspectRatio}
                >
                  <Field
                    type="AspectRatio"
                    autoComplete="off"
                    name="AspectRatio"
                    placeholder="AspectRatio"
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

export default AspectRatioEdit;
