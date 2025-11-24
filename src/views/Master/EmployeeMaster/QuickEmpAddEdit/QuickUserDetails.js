import React from 'react';
import { Input, FormItem } from 'components/ui';
import { Field, useFormikContext } from 'formik';
import { showError2, isNumbers, isName, isEmail } from 'components/validators';

const QuickUserDetails = ({ touched, errors }) => {
  /* HOOKS */
  const { setFieldValue } = useFormikContext();

  /* CONSTANTS */
  let fields = Object.keys(errors);
  if (fields.length) {
    for (let field of fields) {
      showError2(field);
    }
  }

  return (
    <>
      <h5>Basic Information</h5>
      <div className="grid grid-cols-4 gap-2 mt-4">
        <FormItem
          asterisk
          label="First Name"
          invalid={errors.Emp_FirstName && touched.Emp_FirstName}
          errorMessage={errors.Emp_FirstName}
        >
          <Field
            type="text"
            autoComplete="off"
            maxLength="15"
            name="Emp_FirstName"
            placeholder="First Name"
            component={Input}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isName(newValue)) {
                setFieldValue('Emp_FirstName', newValue);
              }
            }}
            size="sm"
          />
        </FormItem>
        <FormItem
          label="Last Name"
          asterisk
          invalid={errors.Emp_LastName && touched.Emp_LastName}
          errorMessage={errors.Emp_LastName}
        >
          <Field
            type="text"
            autoComplete="off"
            maxLength="15"
            name="Emp_LastName"
            placeholder="Last Name"
            component={Input}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isName(newValue)) {
                setFieldValue('Emp_LastName', newValue);
              }
            }}
            size="sm"
          />
        </FormItem>
        <FormItem
          label="Email"
          asterisk
          invalid={errors.Emp_Email && touched.Emp_Email}
          errorMessage={errors.Emp_Email}
        >
          <Field
            type="text"
            autoComplete="off"
            maxLength="45"
            name="Emp_Email"
            placeholder="Email"
            component={Input}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isEmail(newValue)) {
                setFieldValue('Emp_Email', newValue);
              }
            }}
            size="sm"
          />
        </FormItem>
        <FormItem
          asterisk
          label="Contact"
          invalid={errors.Emp_Contact1 && touched.Emp_Contact1}
          errorMessage={errors.Emp_Contact1}
        >
          <Field
            type="text"
            autoComplete="off"
            maxLength="10"
            name="Emp_Contact1"
            placeholder="Contact"
            component={Input}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isNumbers(newValue)) {
                setFieldValue('Emp_Contact1', newValue);
              }
            }}
            size="sm"
          />
        </FormItem>
      </div>
    </>
  );
};

export default QuickUserDetails;
