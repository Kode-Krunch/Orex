import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  Postcommercialtype,
  Putcommercialtype,
} from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  CommercialTypeName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('CommercialType Name Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
// const CommercialTypeEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
// }) => {
const CommercialTypeEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;

  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddCommercialTypeName = async (values, token) => {
    try {
      const resp = await Postcommercialtype(values, token);
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
  const EditCommercialType = async (values, token) => {
    try {
      const resp = await Putcommercialtype(values, token);
      //console.log(resp)
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'Commercial Type Already Exists') {
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
          CommercialTypeCode: editData.CommercialTypeCode || '',
          CommercialTypeName: editData.CommercialTypeName || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.CommercialTypeCode) {
              new Promise((resolve, reject) => {
                AddCommercialTypeName(values, token)
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
                EditCommercialType(values, token)
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
                  type="CommercialTypeCode"
                  autoComplete="off"
                  name="CommercialTypeCode"
                  placeholder="CommercialTypeCode"
                  component={Input}
                  hidden
                />
                <FormItem
                  asterisk
                  label="CommercialType Name"
                  invalid={
                    errors.CommercialTypeName && touched.CommercialTypeName
                  }
                  errorMessage={errors.CommercialTypeName}
                >
                  <Field
                    type="CommercialTypeName"
                    autoComplete="off"
                    name="CommercialTypeName"
                    placeholder="CommercialType Name"
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

export default CommercialTypeEdit;
