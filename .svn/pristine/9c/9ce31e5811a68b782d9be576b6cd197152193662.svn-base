import React, { useState } from 'react';
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui';
import { ActionLink } from 'components/shared';
import { apiForgotPassword } from 'services/AuthService';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email'),
});

const ForgotPasswordForm = (props) => {
  const { disableSubmit = false, className, signInUrl = '/sign-in' } = props;

  const [emailSent, setEmailSent] = useState(false);

  const [message, setMessage] = useTimeOutMessage();

  const onSendMail = async (values, setSubmitting) => {
    setSubmitting(true);
    try {
      const resp = await apiForgotPassword(values);
      if (resp.data) {
        setSubmitting(false);
        window.open(
          'https://mail.google.com/mail/u/0/',
          'https://mail.google.com/mail/u/0/',
        );
        setEmailSent(true);
      }
    } catch (errors) {
      if (errors?.response.status === 404) {
        setMessage('Email not found');
        setSubmitting(false);
        return;
      }
      setMessage(errors?.response?.data?.message || errors.toString());
      setSubmitting(false);
    }
  };

  return (
    <div className={classNames(className, 'card2 !p-7 w-[63%]')}>
      <div className="mb-6">
        {emailSent ? (
          <>
            <h3 className="mb-1">Check your email</h3>
            <p>We have sent a password recovery instruction to your email</p>
          </>
        ) : (
          <>
            <h3 className="mb-1">Forgot Password</h3>
            <p>
              Please enter your email address to receive a verification code
            </p>
          </>
        )}
      </div>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSendMail(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className={emailSent ? 'hidden' : ''}>
                <FormItem
                  invalid={errors.email && touched.email}
                  errorMessage={errors.email}
                >
                  <Field
                    size="sm"
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                  />
                </FormItem>
              </div>
              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
                className="mt-2"
              >
                {emailSent ? 'Resend Email' : 'Send Email'}
              </Button>
              <div className="mt-4 text-center">
                <span>Back to </span>
                <ActionLink to={signInUrl}>Sign in</ActionLink>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
