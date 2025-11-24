import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Postfillertype, Putfillertype } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  FillerTypeName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('FillerTypeName  Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
//const FillerTypeEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
const FillerTypeEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddFillerType = async (values, token) => {
    try {
      const resp = await Postfillertype(values, token);
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
  const EditFillerType = async (values, token) => {
    try {
      const resp = await Putfillertype(values, token);
      //console.log(resp)
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'Filler Type Already Exists') {
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
          FillerTypeCode: editData.FillerTypeCode || '',
          FillerTypeName: editData.FillerTypeName || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.FillerTypeCode) {
              new Promise((resolve, reject) => {
                AddFillerType(values, token)
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
                EditFillerType(values, token)
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
                  type="FillerTypeCode"
                  autoComplete="off"
                  name="FillerTypeCode"
                  placeholder="FillerTypeCode"
                  component={Input}
                  hidden
                />
                <FormItem
                  asterisk
                  label="FillerType Name"
                  invalid={errors.FillerTypeName && touched.FillerTypeName}
                  errorMessage={errors.FillerTypeName}
                >
                  <Field
                    type="FillerTypeName"
                    autoComplete="off"
                    name="FillerTypeName"
                    placeholder="FillerType Name"
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

export default FillerTypeEdit;
