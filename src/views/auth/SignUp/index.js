import React from 'react';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  return (
    <>
      <div className="mb-2">
        <h3 className="mb-1">Sign Up</h3>
      </div>
      <SignUpForm disableSubmit={false} />
    </>
  );
};

export default SignUp;
