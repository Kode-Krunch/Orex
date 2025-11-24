import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
  Select,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Poststarcasttype, Putstarcasttype } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  StarCastTypeName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('StarCast Type Required'),
  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
// const StarCastTypeEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     currency,
// }) => {
const StarCastTypeEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, currency } = props;
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddStarCastType = async (values, token) => {
    try {
      const resp = await Poststarcasttype(values, token);
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
  const EditStarCastType = async (values, token) => {
    try {
      const resp = await Putstarcasttype(values, token);
      //console.log(resp)
      if (resp.data.msg === 'Updated') {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === 'StarCastType Already Exists') {
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
          StarCastTypeCode: editData.StarCastTypeCode || '',
          StarCastTypeName: editData.StarCastTypeName || '',
          IsActive: editData.IsActive === 1 ? true : false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.StarCastTypeName) {
              new Promise((resolve, reject) => {
                AddStarCastType(values, token)
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
                EditStarCastType(values, token)
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
                  type="StarCastTypeCode"
                  autoComplete="off"
                  name="StarCastTypeCode"
                  placeholder="StarCastTypeCode name"
                  component={Input}
                  hidden
                />
                <FormItem
                  asterisk
                  label="StarCast Type"
                  invalid={errors.StarCastTypeName && touched.StarCastTypeName}
                  errorMessage={errors.StarCastTypeName}
                >
                  <Field
                    type="StarCast Type"
                    autoComplete="off"
                    name="StarCast Type"
                    placeholder="StarCast Type"
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

export default StarCastTypeEdit;
