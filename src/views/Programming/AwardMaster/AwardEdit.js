import {
  FormItem,
  Button,
  Switcher,
  Input,
  FormContainer,
  DatePicker,
  FormItemcompact,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { PostAwardmaster, PutAwardmaster } from 'services/ProgrammingService';
import { useSelector } from 'react-redux';
import { HiCake } from 'react-icons/hi';
import React, { forwardRef } from 'react';
import {
  convertDateToYMD,
  isChar,
  isInitial,
  validate,
} from 'components/validators';

const validationSchema = Yup.object().shape({
  AwardName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  AwardDate: Yup.string().required('Required').nullable('Required'),
  //IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
//const AwardEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
const AwardEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog } = props;
  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const AddAward = async (values, token) => {
    try {
      const resp = await PostAwardmaster(values, token);
      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Inserted Successfully.');
        return;
      } else if (resp.status === 204) {
        setlog('warning');
        setMessage('Data Already Exist');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        setlog('error');
        setMessage('Server Error.');

        return;
      }
    }
  };
  const EditAward = async (values, token) => {
    try {
      const resp = await PutAwardmaster(values, token);
      //console.log(resp)

      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.status === 204) {
        setlog('warning');
        setMessage('Data Already Exist');
        return;
      }
    } catch (errors) {
      if (errors.response.status === 500) {
        setlog('error');
        setMessage('Server Error.');

        return;
      }
    }
  };

  return (
    <div>
      <Formik
        innerRef={ref}
        initialValues={{
          AwardCode: editData.AwardCode || '',
          AwardName: editData.AwardName || '',
          AwardDate: editData.AwardDate || '',
          IsActive: editData.IsActive === 1 ? true : true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.AwardCode) {
              new Promise((resolve, reject) => {
                AddAward(values, token)
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
                EditAward(values, token)
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
        {({ values, touched, errors, setFieldValue }) => {
          return (
            <Form>
              <FormContainer>
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    type="AwardCode"
                    autoComplete="off"
                    name="AwardCode"
                    placeholder="AwardCode"
                    component={Input}
                    hidden
                  />
                  <FormItem
                    asterisk
                    label="Award Name"
                    invalid={errors.AwardName && touched.AwardName}
                    errorMessage={errors.AwardName}
                  >
                    <Field
                      type="AwardName"
                      autoComplete="off"
                      size="sm"
                      name="AwardName"
                      placeholder="Award Name"
                      component={Input}
                      maxLength="50"
                      value={values.AwardName}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (isInitial(newValue)) {
                          setFieldValue('AwardName', newValue);
                        }
                      }}
                    />
                  </FormItem>

                  <FormItemcompact
                    label="Date Of Award"
                    invalid={errors.AwardDate && touched.AwardDate}
                    errorMessage={errors.AwardDate}
                  >
                    <Field
                      autoComplete="off"
                      size="sm"
                      name="AwardDate"
                      placeholder="Select"
                      component={DatePicker}
                      maxLength="50"
                      prefix={<HiCake className="text-xl" />}
                      value={
                        validate(values.AwardDate)
                          ? new Date(values.AwardDate)
                          : ''
                      }
                      onChange={(e) => {
                        setFieldValue('AwardDate', e);
                      }}
                    />
                  </FormItemcompact>
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
          );
        }}
      </Formik>
    </div>
  );
});

export default AwardEdit;
