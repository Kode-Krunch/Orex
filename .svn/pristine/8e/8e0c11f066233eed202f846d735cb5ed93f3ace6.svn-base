import React, { useCallback, useEffect, useRef, useState } from 'react';
import QRCodeContainer from './QRCodeContainer';
import { Button } from 'components/ui';
import { IoMdRefresh } from 'react-icons/io';
import appConfig from 'configs/app.config';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import {
  apiGenerateQrCodeForLoginWithQr,
  apiSignInWithQrString,
} from 'services/AuthService';
import useAuth from 'utils/hooks/useAuth';
import useQuery from 'utils/hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import { REDIRECT_URL_KEY } from 'constants/app.constant';

/* CONSTANTS */
const { maxQrGeneration, qrCodeMaxCounterInSec, loginCheckMaxCounterInSec } =
  appConfig;

function SignInWithQR() {
  /* STATES */
  const [counterInSec, setCounterInSec] = useState(qrCodeMaxCounterInSec);
  const [loginCheckCounterInSec, setLoginCheckCounterInSec] = useState(
    loginCheckMaxCounterInSec,
  );
  const [qrGenerationCount, setQrGenerationCount] = useState(0);
  const [qrCode, setQrCode] = useState(null);
  const [qrCodeString, setQrCodeString] = useState(null);

  /* VARIABLES */
  let time = `${
    parseInt(counterInSec / 60) < 10
      ? `0${parseInt(counterInSec / 60)}`
      : parseInt(counterInSec / 60)
  }:${counterInSec % 60 < 10 ? `0${counterInSec % 60}` : counterInSec % 60}`;

  /* HOOKS */
  const counterIntervalRef = useRef(null);
  const loginCheckIntervalRef = useRef(null);
  const { setLoginInformationInRedux } = useAuth();
  const query = useQuery();
  const navigate = useNavigate();

  // CALLBACK FUNCTIONS
  const isQrGenerating = useCallback(
    () => qrGenerationCount < maxQrGeneration,
    [qrGenerationCount],
  );

  useEffect(() => {
    (async () => {
      if (isQrGenerating()) {
        if (!loginCheckIntervalRef.current) {
          // Start login check interval
          loginCheckIntervalRef.current = setInterval(async () => {
            setLoginCheckCounterInSec((prev) => {
              if (prev === loginCheckMaxCounterInSec) {
                (async () => {
                  await signInWithQrFn();
                })();
                return prev - 1;
              } else if (prev < 0) {
                return loginCheckMaxCounterInSec;
              } else {
                return prev - 1;
              }
            });
          }, 1000);
        }
      } else {
        // Final Check if user scanned QR code
        await signInWithQrFn();
        // Clear interval and reset counter
        clearInterval(loginCheckIntervalRef.current);
        loginCheckIntervalRef.current = null;
        setLoginCheckCounterInSec(loginCheckMaxCounterInSec);
      }
    })();

    return () => {
      // Clear interval
      clearInterval(loginCheckIntervalRef.current);
      loginCheckIntervalRef.current = null;
    };
  }, [qrGenerationCount, loginCheckCounterInSec, isQrGenerating]);

  useEffect(() => {
    if (isQrGenerating()) {
      // Start counter interval once
      if (!counterIntervalRef.current) {
        counterIntervalRef.current = setInterval(() => {
          setCounterInSec((prev) => prev - 1);
        }, 1000);
      }
    } else {
      // Stop counter interval when generation is off
      clearInterval(counterIntervalRef.current);
      counterIntervalRef.current = null;
    }
    return () => {
      // Clear interval
      clearInterval(counterIntervalRef.current);
      counterIntervalRef.current = null;
    };
  }, [qrGenerationCount, isQrGenerating]);

  // Separate effect to handle QR logic
  useEffect(() => {
    if (qrGenerationCount > maxQrGeneration) return;
    if (counterInSec === qrCodeMaxCounterInSec && isQrGenerating()) {
      (async () => {
        const { qrCode, session } = await getQrCodeInfo();
        setQrCode(qrCode);
        setQrCodeString(session);
      })();
    }
    if (counterInSec < 0) {
      clearInterval(counterIntervalRef.current);
      counterIntervalRef.current = null;
      setQrGenerationCount((prev) => prev + 1);
      setCounterInSec(qrCodeMaxCounterInSec);
    }
  }, [counterInSec, qrGenerationCount, isQrGenerating]);

  /* EVENT HANDLERS */
  const handleRegenerateQr = () => {
    setQrGenerationCount(maxQrGeneration - 1);
  };

  /* HELPER FUNCTION */
  const getQrCodeInfo = async () => {
    try {
      const response = await apiGenerateQrCodeForLoginWithQr();
      if (response.status === 200) {
        const { data } = response;
        if (data.status === 'success') {
          return { qrCode: data.qr_code, session: data.session };
        } else {
          openNotification('danger', data.message);
          throw new Error(response);
        }
      } else throw new Error('Qr generation failed');
    } catch (error) {
      console.error(error);
      openNotification(
        'danger',
        'Something went wrong while generating QR code',
      );
      return { qrCode: null, session: null };
    }
  };

  const signInWithQrFn = async () => {
    try {
      if (!qrCodeString) return;
      const response = await apiSignInWithQrString(qrCodeString);
      if (response.status === 200 && response.data) {
        setLoginInformationInRedux(response.data, {
          userName: response.data.LoginName,
        });
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
    }
  };

  return (
    <>
      <div className="w-full text-center flex flex-col gap-2 items-center justify-center">
        <QRCodeContainer>
          <div className="relative top-0 left-0">
            <img
              alt="QR code"
              width={'100%'}
              className={
                qrGenerationCount === maxQrGeneration ? 'opacity-30' : ''
              }
              src={qrCode}
            />
            {qrGenerationCount === maxQrGeneration && (
              <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
                <h4 className="bg-gray-200 !text-gray-600 rounded-lg p-3">
                  Code
                  <br />
                  Expired
                </h4>
              </div>
            )}
          </div>
        </QRCodeContainer>
        <p className="text-gray-300">
          Scan the above QR code from Cloudbats Mobile Application
          <br />
          {isQrGenerating() && (
            <>
              in <span className="text-orange-500">{time}</span>
            </>
          )}
        </p>
        <div className="flex gap-4 items-center">
          <Button
            icon={<IoMdRefresh />}
            variant="solid"
            disabled={isQrGenerating()}
            onClick={handleRegenerateQr}
          >
            Regenerate QR
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignInWithQR;
