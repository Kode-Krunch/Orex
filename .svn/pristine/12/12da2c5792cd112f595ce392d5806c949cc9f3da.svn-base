import React from 'react';
import {
  Input,
  Button,
  Checkbox,
  FormContainer,
  Alert,
  FormItemcompact,
} from 'components/ui';
import { PasswordInput } from 'components/shared';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Please enter your user name'),
  password: Yup.string().required('Please enter your password'),
  rememberMe: Yup.bool(),
});

const SignInForm = (props) => {
  const { disableSubmit = false, className, signIn } = props;

  const [message, setMessage] = useTimeOutMessage();

  const onSignIn = async (values, setSubmitting) => {
    const { userName, password } = values;
    setSubmitting(true);

    const result = await signIn({ userName, password, setSubmitting });

    if (result === undefined) {
      openNotification(
        'warning',
        'Incorrect username or password. Please check and try again.',
      );
    }

    setSubmitting(false);
  };

  return (
    <div className={className}>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <Formik
        initialValues={{
          userName: '',
          password: '',
          rememberMe: true,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignIn(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItemcompact
                label="User Name"
                invalid={errors.userName && touched.userName}
                errorMessage={errors.userName}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="userName"
                  placeholder="User Name"
                  component={Input}
                />
              </FormItemcompact>
              <FormItemcompact
                label="Password"
                invalid={errors.password && touched.password}
                errorMessage={errors.password}
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Password"
                  component={PasswordInput}
                />
              </FormItemcompact>
              <div className="flex justify-between mb-6 mt-6">
                <Field
                  className="mb-0"
                  name="rememberMe"
                  component={Checkbox}
                  children="Remember Me"
                />
              </div>
              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
