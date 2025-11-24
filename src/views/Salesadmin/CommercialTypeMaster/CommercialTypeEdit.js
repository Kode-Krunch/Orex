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
} from 'services/SalesAdminService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

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

      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Inserted Successfully.');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        setlog('danger');
        setMessage('Server Error.');
        return;
      }
    }
  };
  const EditCommercialType = async (values, token) => {
    try {
      const resp = await Putcommercialtype(values, token);
      //console.log(resp)
      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        setlog('danger');
        setMessage('Server Error.');
        return;
      }
      // return {}
    }
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          CommercialTypeCode: editData.CommercialTypeCode || '',
          CommercialTypeName: editData.CommercialTypeName || '',
          CommercialTypeShortName: editData.CommercialTypeShortName || '',
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
              <Field
                type="CommercialTypeCode"
                autoComplete="off"
                name="CommercialTypeCode"
                placeholder="CommercialTypeCode"
                component={Input}
                hidden
              />
              <div className="grid grid-cols-2 gap-4">
                <FormItem
                  asterisk
                  label="CommercialType"
                  invalid={
                    errors.CommercialTypeName && touched.CommercialTypeName
                  }
                  errorMessage={errors.CommercialTypeName}
                >
                  <Field name="CommercialTypeName">
                    {({ field, form }) => (
                      <Input
                        size="sm"
                        field={field}
                        form={form}
                        value={values.CommercialTypeName}
                        onChange={(option) => {
                          console.log(option);
                          let inputValue = option.target.value;

                          // Remove the first space if it exists
                          if (inputValue.startsWith(' ')) {
                            inputValue = inputValue.slice(1);
                          }

                          if (
                            inputValue.length <= 20 &&
                            /^[0-9a-zA-Z\s]*$/.test(inputValue)
                          ) {
                            form.setFieldValue(field.name, inputValue);
                          }
                        }}
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem
                  label="CommercialType Short Name "
                  invalid={
                    errors.CommercialTypeShortName &&
                    touched.CommercialTypeShortName
                  }
                  errorMessage={errors.CommercialTypeShortName}
                >
                  <Field name="CommercialTypeShortName">
                    {({ field, form }) => (
                      <Input
                        size="sm"
                        field={field}
                        form={form}
                        value={values.CommercialTypeShortName}
                        onChange={(option) => {
                          console.log(option);
                          let inputValue = option.target.value;

                          if (
                            inputValue.length <= 10 &&
                            /^[0-9a-zA-Z\s]*$/.test(inputValue)
                          ) {
                            form.setFieldValue(field.name, inputValue);
                          }
                        }}
                      />
                    )}
                  </Field>
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
