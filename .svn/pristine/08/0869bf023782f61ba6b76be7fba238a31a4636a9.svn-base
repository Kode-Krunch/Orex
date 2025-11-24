import React from 'react';
import { Input, Button, FormItem, FormContainer } from 'components/ui';
import { ActionLink } from 'components/shared';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from 'utils/hooks/useAuth';

const validationSchema = Yup.object().shape({
  Emp_FirstName: Yup.string()
    .required('Please enter your First name')
    .matches(
      /^[a-zA-Z]*$/,
      'First Name can only contain alphanumeric characters',
    )
    .max(15, 'First Name must be at most 15 characters')
    .min(1, 'First Name must be at least 1 characters'),

  Email: Yup.string()
    .email('Please enter a valid Email')
    .required('Please enter your Email'),
  Emp_LastName: Yup.string()
    .required('Please enter your Last name')
    .matches(
      /^[a-zA-Z]*$/,
      'Last Name can only contain alphanumeric characters',
    )
    .max(15, 'Last Name must be at most 15 characters')
    .min(1, 'Last Name must be at least 1 characters'),
  Mobile: Yup.string()
    .required('Please enter your Mobile')
    .matches(/^[0-9]*$/, 'Mobile can only contain numeric characters')
    .max(10),
  LoginName: Yup.string()
    .min(4, 'User Name must be at least 4 characters')
    .max(10, 'User Name must be at most 10 characters')
    .matches(/^\S*$/, 'User Name cannot contain spaces')
    .matches(
      /^[a-zA-Z0-9]*$/,
      'User Name can only contain alphanumeric characters',
    )
    .required('Please enter your User Name')
    .trim('No leading or trailing spaces'),
});

const SignUpForm = (props) => {
  const { disableSubmit = false, className, signInUrl = '/sign-in' } = props;

  const { signUp } = useAuth();

  const [message, setMessage] = useTimeOutMessage();

  const onSignUp = async (values, setSubmitting) => {
    const { Emp_FirstName, Emp_LastName, Email, Mobile, LoginName } = values;
    setSubmitting(true);
    const result = await signUp({
      Emp_FirstName,
      Emp_LastName,
      Email,
      Mobile,
      LoginName,
    });

    if (result.status == 'failed') {
      console.log(result);
      setMessage(result.message);
    }

    setSubmitting(false);
  };

  return (
    <div className={className}>
      {/* {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )} */}
      <Formik
        initialValues={{
          Emp_FirstName: '',
          Mobile: '',
          Emp_LastName: '',
          Email: '',
          LoginName: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignUp(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 gap-4">
                <FormItem
                  label="User Name"
                  invalid={errors.LoginName && touched.LoginName}
                  errorMessage={errors.LoginName}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="LoginName"
                    placeholder="User Name"
                    component={Input}
                    style={{
                      background: 'white',
                      color: 'black',
                    }}
                  />
                </FormItem>
                <FormItem
                  label="First Name"
                  invalid={errors.Emp_FirstName && touched.Emp_FirstName}
                  errorMessage={errors.Emp_FirstName}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="Emp_FirstName"
                    placeholder="First Name"
                    component={Input}
                    style={{
                      background: 'white',
                      color: 'black',
                    }}
                  />
                </FormItem>

                <FormItem
                  label="Last Name"
                  invalid={errors.Emp_LastName && touched.Emp_LastName}
                  errorMessage={errors.Emp_LastName}
                >
                  <Field
                    size="sm"
                    autoComplete="off"
                    name="Emp_LastName"
                    placeholder="Last Name"
                    component={Input}
                    style={{
                      background: 'white',
                      color: 'black',
                    }}
                  />
                </FormItem>

                <FormItem
                  label="Mobile"
                  invalid={errors.Mobile && touched.Mobile}
                  errorMessage={errors.Mobile}
                >
                  <Field
                    size="sm"
                    type="text"
                    autoComplete="off"
                    name="Mobile"
                    placeholder="Mobile No"
                    component={Input}
                    style={{
                      background: 'white',
                      color: 'black',
                    }}
                  />
                </FormItem>

                <FormItem
                  label="Email"
                  invalid={errors.Email && touched.Email}
                  errorMessage={errors.Email}
                >
                  <Field
                    size="sm"
                    type="email"
                    maxLength="150"
                    autoComplete="off"
                    name="Email"
                    placeholder="Email"
                    component={Input}
                    style={{
                      background: 'white',
                      color: 'black',
                    }}
                  />
                </FormItem>

                <br />
                <Button
                  block
                  loading={isSubmitting}
                  variant="solid"
                  type="submit"
                >
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
                <div className="mt-4 text-center">
                  <span>Already have an account? </span>
                  <ActionLink to={signInUrl}>Sign in</ActionLink>
                </div>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
