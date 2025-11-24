import React, { useState } from 'react';
import Side from './Side';
import View from 'views';
import { useSelector } from 'react-redux';
import { LAYOUT_TYPE_BLANK } from 'constants/theme.constant';
import LandingPage from './LandingPage';

const AuthLayout = (props) => {
  const layoutType = useSelector((state) => state.theme.layout.type);
  const [displayLandingPage, setDisplayLandingPage] = useState(true);

  return (
    <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
      {!displayLandingPage ? (
        <LandingPage setDisplayLandingPage={setDisplayLandingPage} />
      ) : (
        <>
          {layoutType === LAYOUT_TYPE_BLANK ? (
            <View {...props} />
          ) : (
            <Side>
              <View {...props} />
            </Side>
          )}
        </>
      )}
    </div>
  );
};

export default AuthLayout;
