import React, { cloneElement, useEffect, useState } from 'react';
import { APP_NAME, REDIRECT_URL_KEY } from 'constants/app.constant';
import { useDispatch } from 'react-redux';
import {
  onSignInSuccess,
  setChannelSetting,
  setChannelSettingMain,
  setLastLoginOn,
  setLoginId,
  setMessageAttempt,
  setUserImage,
  setUsername,
} from 'store/auth/sessionSlice';
import { ChannelSetting } from 'services/MasterService';
import appConfig from 'configs/app.config';
import { apiSignUpforlogin } from 'services/AuthService';
import { setUser } from 'store/auth/userSlice';
import useQuery from 'utils/hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import Lottie from 'lottie-react';
import LoginAnimation from './LoginAnimation.json';
import './test.css';

const Side = ({ children, content, ...rest }) => {
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    handleAuthFromURL();
  }, []);

  const handleAuthFromURL = () => {
    const url = new URL(window.location.href);
    const queryString = url.hash.split('?')[1];
    if (!queryString) return;

    const searchParams = new URLSearchParams(queryString);
    const acValue = searchParams.get('ac');
    const tokenValue = searchParams.get('token');
    // dispatch(onSignInSuccess(acValue));
    if (tokenValue) localStorage.setItem('tokenValue', tokenValue);
    else {
      localStorage.removeItem('tokenValue');
      localStorage.removeItem('OneSolutionURL');
      localStorage.removeItem('admin');
    }
    if (acValue) {
      setShowLoader(true);
      signInDirect(acValue, tokenValue);
    }
  };

  const signInDirect = async (acValue, tokenValue) => {
    try {
      const { data } = await apiSignUpforlogin(acValue);
      if (!data) return;

      const {
        access_token,
        LoginName,
        LoginCode,
        PasswordExpiry,
        AgencyCode,
        ChannelCode,
        LocationCode,
        Emp_Image,
        LastLoginOn,
        OneSolutionURL,
      } = data;
      localStorage.setItem('OneSolutionURL', OneSolutionURL);
      dispatch(onSignInSuccess(access_token));
      dispatch(
        setUser({
          avatar: 'Anonymous',
          userName: LoginName,
          authority: 'user',
          email: 'Anonymous',
          AgencyCode,
          PasswordExpiry,
          ChannelCode,
          LocationCode,
        }),
      );
      dispatch(setLoginId(LoginCode));
      dispatch(setUsername(LoginName));
      dispatch(setUserImage(Emp_Image));
      dispatch(setLastLoginOn(LastLoginOn));

      const { data: channelSettings } = await ChannelSetting(
        LoginCode,
        access_token,
      );
      if (channelSettings) {
        dispatch(setChannelSetting(channelSettings));
        dispatch(setChannelSettingMain(channelSettings));
      }

      const redirectUrl =
        query.get(REDIRECT_URL_KEY) || appConfig.authenticatedEntryPath;
      dispatch(setMessageAttempt(''));
      navigate(redirectUrl);
    } catch (error) {
      console.log(error);
      // https://forbestvpam.planetcast.in
      window.location.href = 'https://telstra-pam.planetcast.in/pam/';
      //window.location.href = OneSolutionURL;
      handleSignInError(error, tokenValue);
    } finally {
      setTimeout(() => setShowLoader(false), 5000);
    }
  };

  const handleSignInError = (error, tokenValue) => {
    setTimeout(
      () =>
        window.location.replace(
          error.response.data.detail.OneSolutionURL + '/?token=' + tokenValue,
        ),
      4000,
    );
    openNotification('danger', 'Token Expired or Invalid User');
  };

  return (
    <div className="h-full">
      {showLoader ? (
        <div className="flex justify-center items-center h-full">
          <Lottie
            animationData={LoginAnimation}
            loop
            autoplay
            style={{ height: '500px', width: '500px' }}
            speed={0.25}
          />
        </div>
      ) : (
        <div
          className="h-full"
          style={{ backgroundImage: `url('/img/others/Frame 3.png')` }}
        >
          <div
            className="grid lg:grid-cols-2 h-full"
            style={{ backdropFilter: 'blur(14px)' }}
          >
            <div className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex bg-transparent">
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <div className="text-white">
                    <p
                      className="welcome-to-cloud"
                      style={{ fontFamily: 'Kodchasan' }}
                    >
                      <span className="text-wrapper-9">Welcome to</span>
                      <span className="text-wrapper-11"> Cloud BATS</span>
                      <span>
                        {' '}
                        your trusted partner in revolutionizing Ad Scheduling
                        and Billing for broadcasters and radio operators!
                      </span>
                    </p>
                  </div>
                </div>
                <p
                  className="text-lg text-white opacity-80"
                  style={{ fontFamily: 'Kodchasan' }}
                >
                  Our cutting-edge software is meticulously crafted to meet the
                  unique needs of broadcasters and radio operators. With
                  tailored modules designed for every department involved in
                  Ad-Scheduling, Log Making, and Billing, we empower you to
                  streamline operations and maximize revenue.
                </p>
              </div>
              <span className="text-white">
                Copyright &copy; {new Date().getFullYear()}{' '}
                <span className="font-semibold">{APP_NAME}</span>
              </span>
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center">
              {/* <div className="card2"> */}
              {/* <div className="card2"> */}
              {/* <div className="xl:min-w-[450px] px-8"> */}
              {/* <div className="mb-8">{content}</div> */}
              {children ? cloneElement(children, { ...rest }) : null}
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Side;
