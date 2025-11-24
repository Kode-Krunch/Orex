import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Alert,
} from 'components/ui';
import { PasswordInput, ActionLink } from 'components/shared';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from 'utils/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import {
  setModule,
} from 'store/auth/sessionSlice';
import { apiGetOTP } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';
import { apiPost2FASetup, apiPost2FAVerify } from 'services/AuthService';
import CustomField from 'views/Controls/CustomField';
import { ONLY_NUMBERS_REGEX } from 'views/Master/ClientMaster/regex';
import useQuery from 'utils/hooks/useQuery';
import { REDIRECT_URL_KEY } from 'constants/app.constant';
import appConfig from 'configs/app.config';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  googleAuthQrErrorEnums,
  loginTypeEnums,
  parentLoginTypesEnum,
} from './enum';
import { MdLockPerson, MdOutlineQrCode2, } from 'react-icons/md';
import QRCodeContainer from './QRCodeContainer';
import SignInWithQR from './SignInWithQR';
import { BiMessageDots } from 'react-icons/bi';
const SignInForm = (props) => {
  const { disableSubmit = false, className } = props;
  const MessageAttempt = useSelector(
    (state) => state.auth.session.MessageAttempt,
  );
  const dispatch = useDispatch();
  const [message, setMessage] = useTimeOutMessage();
  const { signIn, setLoginInformationInRedux } = useAuth()
  useEffect(() => {
    dispatch(setModule([]));
  }, [dispatch]);

  const [OptForm, setOptForm] = useState(false);
  const [counter, setCounter] = useState(60);
  const [settimer, setSetTimer] = useState(false);
  const [lUsername, setLUsername] = useState('');
  const [googleAuthQr, setGoogleAuthQr] = useState('');
  const [googleAuthOtp, setGoogleAuthOtp] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [parentLoginType, setParentLoginType] = useState(
    parentLoginTypesEnum.LOGIN_WITH_CREDENTIALS,
  );

  const query = useQuery();
  const navigate = useNavigate();

  const GetoptFun = async (userName) => {
    try {
      const res = await apiGetOTP(userName);
      if (res.status === 204) {
        openNotification('warning', 'Kindly Enter Valid Username');
        return;
      }
      if (res.data) {
        setSetTimer(true);
        startTimer();
      }
    } catch (error) {
      if (error.response?.status === 500) {
        openNotification('danger', 'Server Error.');
      }
    }
  };

  const startTimer = () => {
    setCounter(60); // Set the initial timer value to 60 seconds
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setCounter((prev) => {
        if (prev > 1) {
          return prev - 1; // Decrement the counter value
        } else {
          clearInterval(countdown); // Stop the timer
          setSetTimer(false); // Reset the timer state
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup function
  }, [counter]);

  const handleFormikSubmit = async (values, { setSubmitting }) => {
    try {
      setLUsername(values.userName);
      if (!disableSubmit) {
        const { userName, password, OTP, OrganizationShortcode } = values;
        setSubmitting(true);
        try {
          const result = await signIn({
            userName,
            password,
            OTP,
            OrganizationShortcode,
          });
          if (result?.status === loginTypeEnums.GOOGLE_TWO_WAY_QR_AUTH) {
            setGoogleAuthQr(await getGoogleAuthQr(values.userName));
          } else if (result?.status === 'failed') {
            setMessage(result?.data?.detail);
          }
        } catch (error) {
          console.error('Error during sign in:', error);
        }
      }
    } catch (error) {
      console.error(error);
      openNotification(
        'danger',
        'Something went wrong while fetching Google Authenticator QR code',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getGoogleAuthQr = async (username) => {
    try {
      const response = await apiPost2FASetup(username);
      if (response.status === 200) {
        const { data } = response;
        if (data.status === 'success') return data.qr_code;
        else if (data.status === 'failed') {
          if (
            data.status_code === googleAuthQrErrorEnums['2FA_ALREADY_EXIST']
          ) {
            openNotification('info', data.message);
            return googleAuthQrErrorEnums['2FA_ALREADY_EXIST'];
          }
        } else openNotification('danger', data.message);
      } else if (response.status === 204)
        openNotification('info', 'No QR code found for current user');
      else throw new Error(response);
    } catch (error) {
      console.error(error);
      openNotification(
        'danger',
        'Something went wrong while fetching Google Authenticator QR code',
      );
    }
  };

  const handleGoogleAuthOtpChange = (event) => {
    const value = event.target.value;
    if (ONLY_NUMBERS_REGEX.test(value) && value.length <= 6)
      setGoogleAuthOtp(value);
  };

  const handleGoogleAuthOtpSubmit = async () => {
    try {
      setShowLoader(true);
      const response = await apiPost2FAVerify(lUsername, googleAuthOtp);
      if (response.status === 200 && response.data) {
        setLoginInformationInRedux(response.data, { userName: lUsername });
        const redirectUrl = query.get(REDIRECT_URL_KEY);
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
        return {
          status: 'success',
          message: '',
        };
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        const { response } = error;
        if (response.status === 401 && response.data)
          openNotification('danger', response.data.detail);
        else
          openNotification('danger', 'Something went wrong while signing in');
      } else
        openNotification('danger', 'Something went wrong while signing in');
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="p-7 min-w-[63%] min-h-[67%] bg-zinc-800 bg-opacity-80 rounded-3xl">
      <div className="flex justify-center">
        <div>
          <h3 className="mb-1 text-center">Welcome back!</h3>
          {parentLoginType ===
            parentLoginTypesEnum.LOGIN_WITH_QR_FROM_CLOUDBATS_APP ? (
            <p>Please scan below QR code to sign in!</p>
          ) : (
            <p>Please enter your credentials to sign in!</p>
          )}
        </div>
      </div>
      <div className="-mx-2 my-4 grid grid-cols-3 gap-4 bg-gray-900 bg-opacity-30 py-3 px-4 rounded-full">
        <Button
          icon={<MdLockPerson />}
          title="Sign in with Credentials"
          variant={
            parentLoginType === parentLoginTypesEnum.LOGIN_WITH_CREDENTIALS
              ? 'solid'
              : 'default'
          }
          className="!rounded-full"
          size="sm"
          onClick={() => {
            setOptForm(false);
            setParentLoginType(parentLoginTypesEnum.LOGIN_WITH_CREDENTIALS);
          }}
        >
          Credentials
        </Button>
        <Button
          icon={<BiMessageDots />}
          title="Sign in with OTP"
          variant={
            parentLoginType === parentLoginTypesEnum.LOGIN_WITH_OTP
              ? 'solid'
              : 'default'
          }
          className="!rounded-full"
          size="sm"
          onClick={() => {
            setOptForm(true);
            setParentLoginType(parentLoginTypesEnum.LOGIN_WITH_OTP);
          }}
        >
          OTP
        </Button>
        <Button
          icon={<MdOutlineQrCode2 />}
          title="Sign in with QR Code"
          variant={
            parentLoginType ===
              parentLoginTypesEnum.LOGIN_WITH_QR_FROM_CLOUDBATS_APP
              ? 'solid'
              : 'default'
          }
          className="!rounded-full"
          size="sm"
          onClick={() =>
            setParentLoginType(
              parentLoginTypesEnum.LOGIN_WITH_QR_FROM_CLOUDBATS_APP,
            )
          }
        >
          QR Code
        </Button>
      </div>
      {parentLoginType ===
        parentLoginTypesEnum.LOGIN_WITH_QR_FROM_CLOUDBATS_APP ? (
        <SignInWithQR />
      ) : (
        <>
          {parentLoginType === parentLoginTypesEnum.LOGIN_WITH_CREDENTIALS &&
            googleAuthQr ? (
            <div className="flex flex-col gap-3">
              <div className="w-full text-center flex flex-col gap-2 items-center justify-center">
                {googleAuthQr ===
                  googleAuthQrErrorEnums['2FA_ALREADY_EXIST'] ? (
                  <>
                    <QRCodeContainer>
                      {/* <h3>QR code already scanned</h3> */}
                      <img
                        alt="QR code"
                        width={'100%'}
                        className="opacity-30"
                        src={'assets/dummy-qr.png'}
                      />
                      <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
                        <div className="bg-gray-200 flex flex-col items-center rounded-lg p-3">
                          <img
                            src="/assets/google-auth-logo.png"
                            alt="google auth logo"
                            height={40}
                            width={40}
                          />
                          <h5 className="!text-gray-700">
                            Code
                            <br />
                            Scanned
                          </h5>
                        </div>
                      </div>
                    </QRCodeContainer>
                    <p className="text-gray-300">
                      Enter OTP from Google Authenticator app
                    </p>
                  </>
                ) : (
                  <>
                    <QRCodeContainer>
                      <img
                        alt="Google Auth QR code"
                        width={'100%'}
                        src={googleAuthQr}
                      />
                    </QRCodeContainer>
                    <p className="text-gray-400">
                      Scan the above QR code in Google Authenticator app
                    </p>
                  </>
                )}
              </div>
              <CustomField
                label="OTP"
                containerClassNames="text-start"
                field={
                  <Input
                    size="sm"
                    placeholder="OTP"
                    value={googleAuthOtp}
                    onChange={handleGoogleAuthOtpChange}
                    onKeyDown={(event) =>
                      event.key === 'Enter' ? handleGoogleAuthOtpSubmit() : null
                    }
                  />
                }
                errorMsg=""
              />
              <Button
                block
                disabled={googleAuthOtp.length < 6}
                variant="solid"
                onClick={handleGoogleAuthOtpSubmit}
              >
                Sign In
              </Button>
            </div>
          ) : (
            <div className={className}>
              {message && (
                <Alert className="mb-4" type="danger" showIcon>
                  {message}
                </Alert>
              )}
              {MessageAttempt && (
                <Alert type="danger" showIcon>
                  {MessageAttempt}
                </Alert>
              )}
              {/* {acValue} */}
              <Formik
                initialValues={{
                  userName: '',
                  password: '',
                  OTP: '',
                  rememberMe: true,
                }}
                validationSchema={Yup.object().shape({
                  userName: Yup.string().required(
                    'Please enter your user name',
                  ),

                  password: Yup.string().when('OptForm', {
                    is: false,
                    then: Yup.string().required('Please enter your password'),
                  }),
                  OTP: Yup.string().when('OptForm', {
                    is: true,
                    then: Yup.string().required('Please enter your OTP'),
                  }),
                  rememberMe: Yup.bool(),
                })}
                onSubmit={handleFormikSubmit}
              >
                {({ values, touched, errors, isSubmitting }) => (
                  <Form>
                    <FormContainer>
                      <div className="grid grid-cols-1 gap-4">
                        <FormItem
                          label="Username :"
                          invalid={errors.userName && touched.userName}
                          errorMessage={errors.userName}
                        >
                          <Field
                            size="sm"
                            type="text"
                            autoComplete="off"
                            name="userName"
                            placeholder="User Name"
                            component={Input}
                            style={{ background: 'white', color: 'black' }}
                          />
                        </FormItem>

                        {OptForm ? (
                          <FormItem
                            label="OTP :"
                            invalid={errors.OTP && touched.OTP}
                            errorMessage={errors.OTP}
                            className="mt-2"
                          >
                            <Field
                              size="sm"
                              autoComplete="off"
                              name="OTP"
                              placeholder="Enter OTP"
                              component={Input}
                              style={{ background: 'white', color: 'black' }}
                            />
                          </FormItem>
                        ) : (
                          <FormItem
                            label="Password :"
                            invalid={errors.password && touched.password}
                            errorMessage={errors.password}
                            className="mt-2"
                          >
                            <Field
                              size="sm"
                              autoComplete="off"
                              name="password"
                              placeholder="Password"
                              component={PasswordInput}
                              style={{ background: 'white', color: 'black' }}
                            />
                          </FormItem>
                        )}
                        {OptForm && !settimer ? (
                          <p
                            style={{ color: '#00E4CB', cursor: 'pointer' }}
                            className="text-start"
                            onClick={() => GetoptFun(values.userName)}
                          >
                            Get OTP
                          </p>
                        ) : null}
                        {settimer && OptForm && (
                          <p>
                            OTP sent to the registered email address.
                            &nbsp;&nbsp; {counter} sec
                          </p>
                        )}
                        {/* <div className="flex justify-between">
                  <Field
                    size="sm"
                    className="mb-0"
                    name="rememberMe"
                    component={Checkbox}
                    style={{ color: '#00E4CB' }}
                  >
                    <span style={{ color: '#00E4CB' }}>Remember Me</span>
                  </Field>

                  <ActionLink to="/sign-up" style={{ color: '#00E4CB' }}>
                    Sign up
                  </ActionLink>
                </div> */}
                        {!OptForm && (
                          <div className="flex justify-between">
                            <ActionLink
                              to="/forgot-password"
                              style={{ color: '#00E4CB' }}
                            >
                              Forgot Password
                            </ActionLink>
                          </div>
                        )}
                        <Button
                          block
                          loading={isSubmitting}
                          style={{ backgroundColor: '#00E4CB' }}
                          type="submit"
                        >
                          {isSubmitting ? 'Signing in...' : 'Sign In'}
                        </Button>
                      </div>
                    </FormContainer>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </>
      )}
      <Loader showLoader={showLoader} />
    </div>
  );
};

export default SignInForm;
