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
import {
  Posteventcolorbylogin,
  Puteventcolorbylogin,
} from 'services/MasterService';
import { useSelector } from 'react-redux';
import React, { forwardRef } from 'react';

const validationSchema = Yup.object().shape({
  EventType: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Event Type Required'),
  EventName: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Only alphabetic characters are allowed')
    .min(1, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Event Name Required'),
  EventDefaultFrontColor: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Event Front Color Required'),
  EventDefaultBackColor: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Event Back Color Required'),

  IsActive: Yup.string().required('IsActives Required'),
  rememberMe: Yup.bool(),
});
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
];
// const eventcolorEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     currency,
// }) => {

const EventColorByLoginEdit = forwardRef((props, ref) => {
  const { onDrawerClose, editData, setMessage, setlog, currency } = props;

  const token = useSelector((state) => state.auth.session.token);
  ////console.log(currency)

  const Addeventcolor = async (values, token) => {
    try {
      const resp = await Posteventcolorbylogin(values, token);
      if (resp.status === 200) {
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
  const Editeventcolor = async (values, token) => {
    try {
      const resp = await Puteventcolorbylogin(values, token);
      //console.log(resp)
      if (resp.status === 200) {
        setlog('success');
        setMessage('Data Updated Successfully');
        return;
      } else if (resp.data.msg === ' Already Exists') {
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
          EventCode: editData.EventCode || '',
          EventType: editData.EventType || '',
          EventName: editData.EventName || '',
          EventDefaultFrontColor: editData.EventDefaultFrontColor || '',

          EventDefaultBackColor: editData.EventDefaultBackColor || '',

          IsActive: 1,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //console.log(editData)
          setTimeout(() => {
            if (!editData.EventCode) {
              new Promise((resolve, reject) => {
                Addeventcolor(values, token)
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
                Editeventcolor(values, token)
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
              <div className="grid grid-cols-2 gap-2">
                <Field
                  size="sm"
                  type="EventCode"
                  autoComplete="off"
                  name="EventCode"
                  placeholder="EventCode name"
                  component={Input}
                  hidden
                />
                <FormItem
                  asterisk
                  label="Event Name"
                  invalid={errors.EventName && touched.EventName}
                  errorMessage={errors.EventName}
                >
                  <Field name="EventName">
                    {({ field, form }) => (
                      <Input
                        type="text"
                        placeholder="EventName"
                        maxlength="20"
                        size="sm"
                        value={values.EventName}
                        disabled
                        name="EventName"
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
                </FormItem>
                <FormItem
                  asterisk
                  label="Event Type"
                  invalid={errors.EventType && touched.EventType}
                  errorMessage={errors.EventType}
                >
                  <Field name="EventType">
                    {({ field, form }) => (
                      <Input
                        type="text"
                        placeholder="EventType"
                        maxlength="10"
                        size="sm"
                        value={values.EventType}
                        disabled
                        name="EventType"
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
                </FormItem>

                <FormItem
                  asterisk
                  label="Event Front Color"
                  invalid={
                    errors.EventDefaultFrontColor &&
                    touched.EventDefaultFrontColor
                  }
                  errorMessage={errors.EventDefaultFrontColor}
                >
                  <Field
                    size="sm"
                    type="color"
                    maxlength="20"
                    autoComplete="off"
                    name="EventDefaultFrontColor"
                    placeholder="EventDefaultFrontColor"
                    component={Input}
                  />
                </FormItem>

                <FormItem
                  asterisk
                  label="Event Back Color"
                  invalid={
                    errors.EventDefaultBackColor &&
                    touched.EventDefaultBackColor
                  }
                  errorMessage={errors.EventDefaultBackColor}
                >
                  <Field
                    size="sm"
                    type="color"
                    maxlength="20"
                    autoComplete="off"
                    name="EventDefaultBackColor"
                    placeholder="EventDefaultBackColor"
                    component={Input}
                  />
                </FormItem>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
});
export default EventColorByLoginEdit;
