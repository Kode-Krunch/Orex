import React, { useEffect } from 'react';
import SignInForm from './SignInForm';

const SignIn = () => {
  /* USE EFFECTS */
  useEffect(() => {
    const clearStorage = () => {
      localStorage.clear();
      sessionStorage.clear();
    };
    window.addEventListener('unload', clearStorage);
    return () => window.removeEventListener('unload', clearStorage);
  }, []);

  return (
    <>
      <SignInForm disableSubmit={false} />
    </>
  );
};

export default SignIn;
